/**
 * ─── مسار جمع الإحصاءات ─────────────────────────────────────────────────────
 * يستقبل نبضات من المتصفح ويكتب:
 *   visits/{sessionId}            وثيقة لكل جلسة (جهاز، شبكة، مصدر، مدّة)
 *   visits/{sessionId}/events/*   أحداث مسمّاة (نقر تواصل، مشاهدة قسم…)
 *   visitors/{visitorId}          ملفّ تراكمي للزائر عبر جلساته (كوكي دائم)
 *   stats/daily_{YYYY-MM-DD}      عدّادات يوميّة جاهزة للعرض
 *
 * لماذا خادميّاً؟ عنوان IP والموقع الجغرافي والكوكي الآمن لا تتوفّر في المتصفح،
 * وإبقاء الكتابة هنا يسمح بقفل قواعد Firestore تماماً أمام العملاء.
 */
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { promises as dns } from "node:dns";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase-admin";
import { parseUa } from "@/lib/ua";
import { ALERT_THRESHOLD, scoreSession } from "@/lib/score";
import { sendAlert } from "@/lib/alerts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY = 16_384;
const VISITOR_COOKIE = "ardev_vid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 400; // ~13 شهراً (سقف Chrome للكوكيز)

type Action = "start" | "beat" | "end" | "event";

/** يقصّ النصوص الواردة من العميل حتى لا تنتفخ الوثائق. */
const s = (v: unknown, max = 300): string | undefined =>
  typeof v === "string" && v.length ? v.slice(0, max) : undefined;

const n = (v: unknown, max = 2_147_483_647): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(Math.max(Math.round(v), 0), max) : undefined;

const b = (v: unknown): boolean | undefined => (typeof v === "boolean" ? v : undefined);

/** مفاتيح خرائط Firestore لا تقبل النقطة ولا الشرطة المائلة. */
const key = (v: string) => v.replace(/[.$/[\]#]/g, "_").slice(0, 60) || "unknown";

/** أوّل عنوان في x-forwarded-for هو عنوان العميل الحقيقي خلف شبكة Vercel. */
function clientIp(h: Headers): string {
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? h.get("cf-connecting-ip") ?? "unknown";
}

function geoFrom(h: Headers) {
  const dec = (v: string | null) => (v ? decodeURIComponent(v) : undefined);
  return {
    country: dec(h.get("x-vercel-ip-country")),
    countryRegion: dec(h.get("x-vercel-ip-country-region")),
    city: dec(h.get("x-vercel-ip-city")),
    latitude: dec(h.get("x-vercel-ip-latitude")),
    longitude: dec(h.get("x-vercel-ip-longitude")),
    timezone: dec(h.get("x-vercel-ip-timezone")),
    asOrganization: dec(h.get("x-vercel-ip-as-organization")),
  };
}

const today = () => new Date().toISOString().slice(0, 10);

/**
 * عكس DNS لعنوان الزائر — كثير من شبكات الشركات والجامعات تكشف نطاقها،
 * وهذه أقرب إشارة مجّانيّة إلى "من الجهة التي زارتنا".
 * مخزَّن مؤقّتاً في ذاكرة النسخة، وبمهلة قصيرة حتى لا يؤخّر الاستجابة.
 */
const rdnsCache = new Map<string, string | null>();

async function reverseDns(ip: string): Promise<string | null> {
  if (ip === "unknown" || rdnsCache.has(ip)) return rdnsCache.get(ip) ?? null;
  try {
    const names = await Promise.race([
      dns.reverse(ip),
      new Promise<string[]>((_, rej) => setTimeout(() => rej(new Error("timeout")), 400)),
    ]);
    const host = names[0] ?? null;
    if (rdnsCache.size > 500) rdnsCache.clear(); // سقف بسيط يمنع تسريب الذاكرة
    rdnsCache.set(ip, host);
    return host;
  } catch {
    rdnsCache.set(ip, null);
    return null;
  }
}

/** كوكي أوّل-طرف، httpOnly — يربط زيارات نفس الشخص عبر الجلسات والأيام. */
function readVisitorId(req: Request): string | null {
  const raw = req.headers.get("cookie");
  if (!raw) return null;
  const m = raw.match(new RegExp(`(?:^|;\\s*)${VISITOR_COOKIE}=([A-Za-z0-9_-]{16,64})`));
  return m ? m[1]! : null;
}

function reply(visitorId: string, isNew: boolean) {
  const res = new NextResponse(null, { status: 204 });
  if (isNew) {
    res.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
  }
  return res;
}

export async function POST(req: Request) {
  const db = getDb();
  if (!db) return new NextResponse(null, { status: 204 }); // لا اعتماديّات → تجاهل بصمت

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (!text || text.length > MAX_BODY) return new NextResponse(null, { status: 204 });
    body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  // معرّف الجلسة يُولَّد في المتصفح؛ نتحقّق من شكله قبل استخدامه كمعرّف وثيقة.
  const sessionId = s(body.sessionId, 64);
  if (!sessionId || !/^[A-Za-z0-9_-]{16,64}$/.test(sessionId)) {
    return new NextResponse(null, { status: 204 });
  }

  const existingVid = readVisitorId(req);
  const visitorId = existingVid ?? randomUUID().replace(/-/g, "");
  const isNewVisitor = !existingVid;

  const raw = body.action;
  const action: Action =
    raw === "end" || raw === "beat" || raw === "event" ? raw : "start";

  const h = req.headers;
  const ua = h.get("user-agent") ?? "";
  const info = parseUa(ua);
  const ip = clientIp(h);
  const geo = geoFrom(h);
  const now = FieldValue.serverTimestamp();
  const doc = db.collection("visits").doc(sessionId);

  /**
   * الأحداث تصل مُجمّعةً مع النبضة وتُخزَّن داخل وثيقة الجلسة نفسها:
   * عدّادات في eventCounts + سجلّ زمني مقصوص في eventLog. لا وثيقة لكل حدث،
   * فتبقى تكلفة الجلسة كتابات معدودة بدل عشرات.
   */
  function foldEvents(): Record<string, unknown> {
    const list = Array.isArray(body.events) ? (body.events as Record<string, unknown>[]).slice(0, 40) : [];
    if (!list.length) return {};

    // نعدّ أوّلاً في خريطة عاديّة، ثم نحوّل مرّة واحدة إلى increment
    // (قيم FieldValue غير قابلة للقراءة، فلا يمكن التراكم فوقها).
    const tally = new Map<string, number>();
    const log: Record<string, unknown>[] = [];
    for (const e of list) {
      const name = s(e?.name, 60);
      if (!name) continue;
      tally.set(key(name), (tally.get(key(name)) ?? 0) + 1);
      log.push({ name, label: s(e?.label, 120), value: n(e?.value), atMs: n(e?.atMs) });
    }

    // خريطة متداخلة لا مفاتيح منقّطة: set(merge) يتعامل مع النقطة كجزء من اسم
    // الحقل (فقط update() تفسّرها كمسار)، فالتنقيط هنا كان يُنشئ حقولاً مشوّهة.
    const eventCounts: Record<string, unknown> = {};
    for (const [k, c] of tally) eventCounts[k] = FieldValue.increment(c);

    const out: Record<string, unknown> = { eventCounts };
    if (log.length) out.eventLog = FieldValue.arrayUnion(...log);
    return out;
  }

  try {
    // مقاييس تراكميّة يرسلها العميل مع كل نبضة (نأخذها كما هي لتفادي ازدواج الجمع).
    const live = {
      lastSeenAt: now,
      durationMs: n(body.durationMs),
      activeMs: n(body.activeMs),
      idleMs: n(body.idleMs),
      pageViews: n(body.pageViews, 10_000),
      maxScrollPct: n(body.maxScrollPct, 100),
      clicks: n(body.clicks, 100_000),
      outboundClicks: n(body.outboundClicks, 100_000),
      copies: n(body.copies, 10_000),
      langSwitches: n(body.langSwitches, 10_000),
      blurCount: n(body.blurCount, 10_000),
      sectionsSeen: Array.isArray(body.sectionsSeen)
        ? (body.sectionsSeen as unknown[]).slice(0, 20).map((v) => s(v, 40)).filter(Boolean)
        : undefined,
      sectionTimeMs: typeof body.sectionTimeMs === "object" && body.sectionTimeMs ? body.sectionTimeMs : undefined,
      siteLang: s(body.siteLang, 8),
      // Core Web Vitals من زائر حقيقي — أدقّ من أي قياس مخبري.
      lcpMs: n(body.lcpMs, 600_000),
      inpMs: n(body.inpMs, 600_000),
      cls: typeof body.cls === "number" && Number.isFinite(body.cls) ? Math.round(body.cls * 1000) / 1000 : undefined,
      exitSection: s(body.exitSection, 40),
      ended: action === "end",
    };

    if (action === "start") {
      await doc.set(
        {
          ...live,
          ...foldEvents(),
          visitorId,
          returning: !isNewVisitor,
          startedAt: now,
          // ── الشبكة والموقع ──
          ip,
          geo,
          rdns: await reverseDns(ip),
          // ── الجهاز والمتصفح ──
          userAgent: ua.slice(0, 512),
          browser: info.browser,
          browserVersion: info.browserVersion,
          os: info.os,
          osVersion: info.osVersion,
          engine: info.engine,
          deviceType: info.deviceType,
          isBot: info.isBot,
          // ── تلميحات العميل ──
          screen: s(body.screen, 24),
          viewport: s(body.viewport, 24),
          dpr: n(body.dpr, 10),
          colorDepth: n(body.colorDepth, 64),
          cpuCores: n(body.cpuCores, 512),
          deviceMemoryGb: n(body.deviceMemoryGb, 1024),
          connection: s(body.connection, 24),
          downlinkMbps: n(body.downlinkMbps, 10_000),
          rttMs: n(body.rttMs, 100_000),
          saveData: b(body.saveData),
          touch: b(body.touch),
          prefersDark: b(body.prefersDark),
          reducedMotion: b(body.reducedMotion),
          browserLanguages: s(body.browserLanguages, 120),
          browserTimezone: s(body.browserTimezone, 64),
          acceptLanguage: s(h.get("accept-language"), 120),
          // ── الأداء (Navigation Timing) ──
          ttfbMs: n(body.ttfbMs, 600_000),
          domReadyMs: n(body.domReadyMs, 600_000),
          loadMs: n(body.loadMs, 600_000),
          // ── مصدر الزيارة ──
          path: s(body.path, 200),
          referrer: s(body.referrer, 300),
          referrerHost: s(body.referrerHost, 120),
          utm: {
            source: s(body.utmSource, 80),
            medium: s(body.utmMedium, 80),
            campaign: s(body.utmCampaign, 80),
            term: s(body.utmTerm, 80),
            content: s(body.utmContent, 80),
          },
          env: process.env.VERCEL_ENV ?? "development",
        },
        { merge: true }
      );

      // ملفّ الزائر واليوميّات في دفعة واحدة — رحلة شبكة واحدة بدل ثلاث.
      const batch = db.batch();

      // ملفّ الزائر التراكمي — يجيب: كم مرّة عاد؟ من أين؟ منذ متى يتابعنا؟
      batch.set(
        db.collection("visitors").doc(visitorId),
        {
          lastSeenAt: now,
          sessions: FieldValue.increment(1),
          lastIp: ip,
          lastCountry: geo.country ?? null,
          lastCity: geo.city ?? null,
          lastDevice: info.deviceType,
          lastBrowser: info.browser,
          lastOs: info.os,
          lastReferrerHost: s(body.referrerHost, 120) ?? null,
          isBot: info.isBot,
          // آخر لمسة: من أين عاد هذه المرّة.
          lastTouch: {
            referrerHost: s(body.referrerHost, 120) ?? "direct",
            utmSource: s(body.utmSource, 80) ?? null,
            at: now,
          },
          // تُكتب مرّة واحدة فقط — merge لا يدهسها لاحقاً، فتبقى "أول لمسة" أصليّة.
          ...(isNewVisitor
            ? {
                firstSeenAt: now,
                firstTouch: {
                  referrerHost: s(body.referrerHost, 120) ?? "direct",
                  utmSource: s(body.utmSource, 80) ?? null,
                  country: geo.country ?? null,
                  landingPath: s(body.path, 200) ?? "/",
                },
              }
            : {}),
        },
        { merge: true }
      );

      // عدّادات يوميّة جاهزة للقراءة بلا مسح كامل للمجموعة.
      if (!info.isBot) {
        batch.set(
          db.collection("stats").doc(`daily_${today()}`),
          {
            date: today(),
            visits: FieldValue.increment(1),
            newVisitors: FieldValue.increment(isNewVisitor ? 1 : 0),
            returningVisitors: FieldValue.increment(isNewVisitor ? 0 : 1),
            byCountry: { [key(geo.country ?? "unknown")]: FieldValue.increment(1) },
            byCity: { [key(geo.city ?? "unknown")]: FieldValue.increment(1) },
            byDevice: { [key(info.deviceType)]: FieldValue.increment(1) },
            byBrowser: { [key(info.browser)]: FieldValue.increment(1) },
            byOs: { [key(info.os)]: FieldValue.increment(1) },
            byReferrer: { [key(s(body.referrerHost, 60) ?? "direct")]: FieldValue.increment(1) },
            byLang: { [key(s(body.siteLang, 8) ?? "en")]: FieldValue.increment(1) },
            updatedAt: now,
          },
          { merge: true }
        );
      }

      await batch.commit();
    } else {
      // نبضة أو إغلاق: set(merge) يمنع الفشل لو ضاعت رسالة البداية.
      await doc.set({ ...live, ...foldEvents() }, { merge: true });

      if (action === "end" && !info.isBot) {
        const active = n(body.activeMs) ?? 0;

        /**
         * التقييم يُحسب هنا لا في اللوحة فقط، لأنّ التنبيه يعتمد عليه — واللوحة
         * تعيد حسابه للعرض بنفس الدالّة، فلا يتفرّع المنطق.
         */
        const snap = await doc.get();
        const d = snap.data() ?? {};
        const score = scoreSession({
          activeMs: active,
          maxScrollPct: n(body.maxScrollPct, 100),
          sectionsSeen: live.sectionsSeen as string[] | undefined,
          eventCounts: d.eventCounts as Record<string, number> | undefined,
          returning: d.returning as boolean | undefined,
          isBot: false,
        });

        // نعتمد معرّف الزائر المحفوظ في الجلسة لا المقروء من الكوكي: لو ضاعت
        // الكوكي بين البداية والإغلاق لا نُنشئ ملفّ زائر ثانياً لنفس الشخص.
        const owner = (d.visitorId as string | undefined) ?? visitorId;

        const batch = db.batch();
        batch.set(doc, { score: score.total, scoreReasons: score.reasons }, { merge: true });

        // التنبيه مرّة واحدة لكل جلسة — alerted يمنع التكرار لو وصل end مرّتين.
        if (score.total >= ALERT_THRESHOLD && !d.alerted) {
          batch.set(doc, { alerted: true }, { merge: true });
          void sendAlert({
            score: score.total,
            reasons: score.reasons,
            city: geo.city,
            country: geo.country,
            org: (d.rdns as string | undefined) ?? geo.asOrganization,
            referrer: d.referrerHost as string | undefined,
            device: `${info.deviceType} · ${info.browser}`,
            activeMs: active,
            sessionId,
          });
        }
        batch.set(
          db.collection("visitors").doc(owner),
          { totalActiveMs: FieldValue.increment(active), lastSeenAt: now },
          { merge: true }
        );
        batch.set(
          db.collection("stats").doc(`daily_${today()}`),
          {
            totalActiveMs: FieldValue.increment(active),
            completedSessions: FieldValue.increment(1),
            engagedSessions: FieldValue.increment(active >= 10_000 ? 1 : 0),
            hotSessions: FieldValue.increment(score.total >= ALERT_THRESHOLD ? 1 : 0),
          },
          { merge: true }
        );
        await batch.commit();
      }
    }
  } catch (err) {
    console.error("[track] فشلت الكتابة:", err);
  }

  return reply(visitorId, isNewVisitor);
}
