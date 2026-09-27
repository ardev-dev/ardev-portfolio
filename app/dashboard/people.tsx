"use client";

/**
 * ─── طبقة «الأشخاص» ────────────────────────────────────────────────────────
 *
 * ⚠️ **النسبة المئوية من أحد عشر زائراً لا تعني شيئاً.** اللوحة السابقة بُنيت
 * على مخطّطات تجميعية (دول · مدن · متصفّحات · ساعات)، وهو تصميمٌ صحيح لموقعٍ
 * فيه آلاف الزوّار وخاطئ تماماً عند هذا الحجم: «٧٣٪ من السعودية» تعني ٢٤
 * جلسة، و«ذروة الزيارات الساعة ٩» تعني ثلاث زيارات.
 *
 * وحين يكون الزوّار أحد عشر **تستطيع النظر في كلّ واحدٍ منهم فرداً** — وهذا
 * بالضبط ما يحوّل التقرير إلى فرصة: لا «٧ زيارات من لينكدإن» بل «شخصٌ من جدة
 * عاد خمس مرّات عبر لينكدإن وفتح سيرتك».
 *
 * فالوحدة هنا **الشخص** (`visitorId` عبر جلساته)، لا الجلسة ولا اليوم.
 */

import type { Visit } from "./types";
import { scoreSession } from "@/lib/score";

export interface Person {
  visitorId: string;
  sessions: Visit[];
  firstAt: Date | null;
  lastAt: Date | null;
  activeMs: number;
  maxScrollPct: number;
  /** أوّل مصدرٍ عُرف له — الأصدق في نسبة الفضل، فالعودة المباشرة لا تُنشئ اكتشافاً. */
  firstSource: string;
  lastSource: string;
  sources: string[];
  places: string[];
  devices: string[];
  events: Record<string, number>;
  sections: string[];
  score: number;
  reasons: string[];
  /** إشارات النيّة الصريحة — وجودها يرفع الشخص فوق كل تجميع. */
  openedCv: boolean;
  contacted: boolean;
}

const asDate = (t?: { toDate: () => Date }) => {
  try {
    return t?.toDate() ?? null;
  } catch {
    return null;
  }
};

/** يبني ملفّات الأشخاص من الجلسات الخام. */
export function buildPeople(visits: Visit[]): Person[] {
  const byId = new Map<string, Visit[]>();
  for (const v of visits) {
    // جلسةٌ بلا معرّف زائر لا تنتمي إلى شخص — تُترك للعرض الزمنيّ لا هنا.
    const id = v.visitorId;
    if (!id) continue;
    (byId.get(id) ?? byId.set(id, []).get(id)!).push(v);
  }

  const people: Person[] = [];
  for (const [visitorId, raw] of byId) {
    const sessions = [...raw].sort(
      (a, b) => (asDate(a.startedAt)?.getTime() ?? 0) - (asDate(b.startedAt)?.getTime() ?? 0),
    );
    const events: Record<string, number> = {};
    const sections = new Set<string>();
    let activeMs = 0;
    let maxScrollPct = 0;

    for (const s of sessions) {
      activeMs += s.activeMs ?? 0;
      maxScrollPct = Math.max(maxScrollPct, s.maxScrollPct ?? 0);
      for (const [k, n] of Object.entries(s.eventCounts ?? {})) events[k] = (events[k] ?? 0) + n;
      for (const sec of s.sectionsSeen ?? []) sections.add(sec);
    }

    const uniq = (xs: (string | undefined)[]) =>
      [...new Set(xs.filter((x): x is string => !!x && x !== "—"))];

    const sources = uniq(sessions.map((s) => s.referrerHost));
    // ⚠️ **أوّل مصدرٍ غير مباشر هو مصدر الاكتشاف.** أخذُ أوّل جلسةٍ حرفياً يمنح
    // الفضل لـ«مباشر» كلّما فتح الشخص الموقع من سجلّ متصفّحه قبل أن يصل من
    // لينكدإن — فتُنسب الفرصة إلى لا أحد.
    const firstSource = sessions.map((s) => s.referrerHost).find((r) => r && r !== "direct")
      ?? sessions[0]?.referrerHost ?? "direct";

    // التقييم على **مجموع** نشاط الشخص لا على جلسةٍ واحدة: ثلاث زياراتٍ قصيرة
    // متكرّرة نيّةٌ أوضح من زيارةٍ واحدة طويلة.
    const { total, reasons } = scoreSession({
      activeMs,
      maxScrollPct,
      sectionsSeen: [...sections],
      eventCounts: events,
      returning: sessions.length > 1,
      isBot: sessions.some((s) => s.isBot),
    });

    people.push({
      visitorId,
      sessions,
      firstAt: asDate(sessions[0]?.startedAt),
      lastAt: asDate(sessions[sessions.length - 1]?.lastSeenAt ?? sessions[sessions.length - 1]?.startedAt),
      activeMs,
      maxScrollPct,
      firstSource,
      lastSource: sessions[sessions.length - 1]?.referrerHost ?? "direct",
      sources,
      places: uniq(sessions.map((s) => s.geo?.city ?? s.geo?.country)),
      devices: uniq(sessions.map((s) => s.deviceType)),
      events,
      sections: [...sections],
      score: total,
      reasons,
      openedCv: (events.cv_open ?? 0) > 0,
      contacted:
        (events.contact_email ?? 0) + (events.contact_whatsapp ?? 0)
        + (events.contact_linkedin ?? 0) + (events.contact_phone ?? 0) > 0,
    });
  }

  // الترتيب بالنيّة لا بالزمن: من فتح سيرتك أمس أهمّ ممّن مرّ قبل دقيقة.
  return people.sort((a, b) => {
    const w = (p: Person) => (p.contacted ? 2 : 0) + (p.openedCv ? 1 : 0);
    return w(b) - w(a) || b.score - a.score || (b.lastAt?.getTime() ?? 0) - (a.lastAt?.getTime() ?? 0);
  });
}

/**
 * ملخّصٌ جاهز للصق — **الجسر بين التقرير والفرصة**.
 *
 * ⚠️ الغرض أن تفتح لينكدإن وتكتب رسالةً في دقيقة، لا أن تتذكّر من الجدول.
 */
export function followUpText(p: Person): string {
  const d = (x: Date | null) => (x ? x.toLocaleDateString("ar-SA", { dateStyle: "medium" }) : "—");
  const lines = [
    `زائر ${p.visitorId.slice(0, 8)} — ${p.places[0] ?? "مكان غير معروف"}`,
    `اكتشفك عبر: ${p.firstSource} · آخر زيارة من: ${p.lastSource}`,
    `${p.sessions.length} زيارة بين ${d(p.firstAt)} و${d(p.lastAt)} · ${Math.round(p.activeMs / 1000)} ثانية نشطة`,
    p.sections.length ? `قرأ: ${p.sections.slice(0, 6).join(" · ")}` : "",
    p.openedCv ? "✅ فتح سيرتك الذاتية" : "",
    p.contacted ? "✅ نقر وسيلة تواصل" : "",
  ];
  return lines.filter(Boolean).join("\n");
}
