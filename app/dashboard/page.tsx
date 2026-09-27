"use client";

/**
 * ─── لوحة الزيارات ─────────────────────────────────────────────────────────
 *
 * ⚠️ **أُعيد بناؤها من الصفر لأنّ سابقتها لم تكن تُقرأ.** كانت مخطّطاتٍ
 * تجميعية — دول ومدن ومتصفّحات وساعات وقمع — وهو تصميمٌ صحيح لموقعٍ فيه آلاف
 * الزوّار، وخاطئ تماماً هنا: الموقع رأى **أحد عشر زائراً في ثمانية وعشرين
 * يوماً**. «٧٣٪ من السعودية» تعني ٢٤ جلسة، و«ذروة الساعة ٩» تعني ثلاث زيارات.
 * نسبةٌ مئوية من عيّنةٍ بهذا الحجم رقمٌ يوهم الدقّة ولا يحملها.
 *
 * **المبدأ الجديد: إجاباتٌ لا رسوم.** اللوحة تجيب ثلاثة أسئلة بالترتيب:
 *   ① ماذا جرى؟ — جملةٌ واحدة بالعربية، لا بطاقات أرقام.
 *   ② من هم؟ — بطاقة لكل **شخص** لا لكل جلسة، مرتّبين بالنيّة لا بالزمن.
 *   ③ ماذا أفعل الآن؟ — خطوات مشتقّة من البيانات نفسها.
 * والتفاصيل التقنية تبقى متاحةً **مطويّة** لمن أرادها، لا متصدّرة.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore";
import { getClientAuth, getClientDb, OWNER_EMAIL } from "@/lib/firebase";
import type { Visit } from "./types";
import { buildPeople, type Person } from "./people";
import { ChannelsSection, PeopleSection } from "./PeopleSection";

/* ─── مدى زمنيّ ────────────────────────────────────────────────────────────── */

const RANGES = [
  { key: "7", label: "٧ أيّام", days: 7 },
  { key: "30", label: "٣٠ يوماً", days: 30 },
  { key: "90", label: "٩٠ يوماً", days: 90 },
  { key: "all", label: "كل الوقت", days: 3650 },
] as const;

type RangeKey = (typeof RANGES)[number]["key"];

/* ─── جملة الحكم ───────────────────────────────────────────────────────────── */

/**
 * ⚠️ **بطاقات الأرقام لا تُفسَّر، والجملة تُفسَّر.** «٣٣ زيارة · ١١ زائراً ·
 * ١٨ث» أرقامٌ يقرؤها صاحبها فلا يعرف أهي جيّدة أم سيّئة. الجملة تقول الحكم
 * صراحةً — وهي أصعب على الكاتب وأسهل على القارئ، وهذا هو المقصود.
 */
function verdict(people: Person[], days: number): { line: string; tone: "good" | "warn" | "bad" } {
  const n = people.length;
  if (!n) return { line: `لا زوّار في آخر ${days} يوماً — الموقع لم يره أحد.`, tone: "bad" };

  const contacted = people.filter((p) => p.contacted).length;
  const cv = people.filter((p) => p.openedCv).length;
  const repeat = people.filter((p) => p.sessions.length > 1).length;

  const head = `${n} ${n === 1 ? "شخصاً واحداً زار" : n === 2 ? "شخصين زارا" : "أشخاص زاروا"} موقعك`;

  if (contacted) {
    return {
      line: `${head} — و${contacted} منهم نقر وسيلة تواصل. تابِعهم اليوم قبل أن يبرد الاهتمام.`,
      tone: "good",
    };
  }
  if (cv) {
    return {
      line: `${head} — و${cv} منهم فتح سيرتك الذاتية ولم يتواصل. هؤلاء أقرب فرصك.`,
      tone: "good",
    };
  }
  if (repeat) {
    return {
      line: `${head} — ${repeat} منهم عاد أكثر من مرّة، لكن لا أحد فتح سيرتك. الاهتمام موجود ولم يتحوّل إلى خطوة.`,
      tone: "warn",
    };
  }
  return {
    line: `${head} — كلّهم مرّوا مرّةً واحدة بلا تفاعل. المشكلة في عدد الزوّار لا في الموقع.`,
    tone: "warn",
  };
}

/* ─── ماذا أفعل الآن ───────────────────────────────────────────────────────── */

/** كل بند فعلٌ محدّد لا ملاحظة عامّة — وإلّا صار القسم زينة. */
function actions(people: Person[], untaggedShare: number): string[] {
  const out: string[] = [];

  const hot = people.filter((p) => p.contacted || p.openedCv);
  for (const p of hot.slice(0, 3)) {
    out.push(
      `تابِع ${p.places[0] ?? "زائراً"} — ${p.openedCv ? "فتح سيرتك" : "نقر وسيلة تواصل"}`
      + ` وجاء عبر ${p.firstSource === "direct" ? "رابط غير موسوم" : p.firstSource}.`,
    );
  }

  const loyal = people.filter((p) => !p.openedCv && !p.contacted && p.sessions.length >= 3);
  if (loyal.length) {
    out.push(
      `${loyal.length} ${loyal.length === 1 ? "شخص عاد" : "أشخاص عادوا"} ثلاث مرّات فأكثر بلا أن يفتح سيرتك`
      + ` — اجعل زرّ السيرة أوضح في أوّل الشاشة.`,
    );
  }

  if (untaggedShare >= 0.4) {
    out.push(
      `${Math.round(untaggedShare * 100)}٪ من الزيارات بلا مصدرٍ معروف.`
      + ` انسخ روابط القنوات أدناه واستبدل بها رابطك في لينكدإن والسيرة وجيت هَب.`,
    );
  }

  if (!out.length) out.push("لا إجراء عاجل — راجع بعد أيّام.");
  return out;
}

/* ─── الصفحة ───────────────────────────────────────────────────────────────── */

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rangeKey, setRangeKey] = useState<RangeKey>("30");
  const [showTech, setShowTech] = useState(false);
  const [ips, setIps] = useState<string[]>([]);
  const [myIp, setMyIp] = useState<string>("");

  useEffect(() => onAuthStateChanged(getClientAuth(), (u) => { setUser(u); setReady(true); }), []);
  const allowed = user?.email === OWNER_EMAIL;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const db = getClientDb();
      const [snap, cfg] = await Promise.all([
        getDocs(query(collection(db, "visits"), orderBy("startedAt", "desc"), limit(300))),
        getDoc(doc(db, "config", "owner")).catch(() => null),
      ]);
      setVisits(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Visit));
      setIps((cfg?.data()?.ips as string[] | undefined) ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذّرت القراءة");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (allowed) void load(); }, [allowed, load]);
  useEffect(() => {
    fetch("/api/track", { method: "GET" }).then((r) => r.json())
      .then((d) => setMyIp(String(d?.ip ?? ""))).catch(() => {});
  }, []);

  const days = RANGES.find((r) => r.key === rangeKey)!.days;

  const people = useMemo(() => {
    const from = Date.now() - days * 86_400_000;
    const inRange = visits.filter((v) => {
      if (v.isBot) return false;                       // الزحف ليس زائراً
      const t = v.startedAt?.toDate?.().getTime();
      return t === undefined || t >= from;
    });
    return buildPeople(inRange);
  }, [visits, days]);

  const perChannel = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of people) {
      for (const s of p.sessions) {
        const k = (s as Visit & { channel?: string }).channel
          ?? (s.referrerHost && s.referrerHost !== "direct" ? s.referrerHost : "—");
        m[k] = (m[k] ?? 0) + 1;
      }
    }
    return m;
  }, [people]);

  const untagged = useMemo(() => {
    const total = people.reduce((a, p) => a + p.sessions.length, 0);
    if (!total) return 0;
    const known = Object.entries(perChannel).filter(([k]) => k !== "—")
      .reduce((a, [, v]) => a + v, 0);
    return (total - known) / total;
  }, [people, perChannel]);

  const v = verdict(people, days);
  const todo = actions(people, untagged);

  const saveIp = async (next: string[]) => {
    setIps(next);
    await setDoc(doc(getClientDb(), "config", "owner"), { ips: next }, { merge: true });
  };

  /* ── الحواجز ── */
  if (!ready) return <Shell><p className="text-fg">جارٍ التحقّق…</p></Shell>;
  if (!user) {
    return (
      <Shell>
        <button
          onClick={() => signInWithPopup(getClientAuth(), new GoogleAuthProvider())}
          className="rounded-xl border border-white/15 px-4 py-2 text-sm text-ink hover:bg-white/5"
        >
          دخول بجوجل
        </button>
      </Shell>
    );
  }
  if (!allowed) {
    return (
      <Shell>
        <p className="text-fg">هذا الحساب لا يملك الوصول.</p>
        <button onClick={() => signOut(getClientAuth())} className="mt-3 text-sm text-fg-muted underline">خروج</button>
      </Shell>
    );
  }

  // ⚠️ **الحالة تُقال بالشريط لا بتلوين البطاقة كلّها.** خلفيةٌ خضراء أو
  // كهرمانية تُخرج اللوحة عن لوحة الموقع الرماديّة الدافئة؛ وشريطٌ جانبيّ
  // رفيع يكفي للتمييز ويُبقي النصّ هو البطل.
  const toneBar = v.tone === "good" ? "before:bg-ink"
    : v.tone === "warn" ? "before:bg-fg-muted"
      : "before:bg-fg-faint";

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6">
      <header className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-ink">
            من زار موقعك
          </h1>
          <p className="mt-0.5 text-[12px] text-fg-faint">لوحة خاصّة — غير مفهرسة</p>
        </div>
        <div className="ms-auto flex items-center gap-1">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRangeKey(r.key)}
              className={`rounded-lg border px-3 py-1.5 text-[12px] transition-colors ${
                rangeKey === r.key
                  ? "border-transparent bg-ink font-semibold text-bg"
                  : "border-line text-fg-muted hover:border-white/20 hover:text-ink"
              }`}
            >
              {r.label}
            </button>
          ))}
          <button onClick={() => void load()} className="ms-2 text-[12px] text-fg-faint underline-offset-4 hover:text-ink hover:underline">
            {loading ? "…" : "تحديث"}
          </button>
        </div>
      </header>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {/* ① الحكم */}
      <section
        className={`relative mt-6 overflow-hidden rounded-2xl border border-line bg-bg-800/60 p-5 shadow-card
          before:absolute before:inset-y-0 before:end-0 before:w-[3px] ${toneBar}`}
      >
        <p className="text-[17px] font-medium leading-[1.85] text-ink">{v.line}</p>
      </section>

      {/* ② ماذا أفعل */}
      <section className="mt-8">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-faint">ماذا أفعل الآن</h2>
        <ul className="mt-3 space-y-2">
          {todo.map((t, i) => (
            <li key={i} className="flex gap-2.5 rounded-xl border border-line bg-bg-800/40 px-3.5 py-2.5 text-[13px] leading-relaxed text-fg">
              <span className="mt-[2px] shrink-0 text-ink">←</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ③ الأشخاص */}
      <section className="mt-10">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-faint">الأشخاص ({people.length})</h2>
        <p className="mt-1 text-[12px] text-fg-muted">
          مرتّبون بالنيّة لا بالزمن: من فتح سيرتك أو نقر تواصلاً يتصدّر.
        </p>
        <div className="mt-3"><PeopleSection people={people} /></div>
      </section>

      {/* ④ القنوات */}
      <section className="mt-10">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-fg-faint">روابط القنوات</h2>
        <div className="mt-2"><ChannelsSection perSource={perChannel} /></div>
      </section>

      {/* ⑤ الإعدادات والتفاصيل — مطويّة */}
      <section className="mt-10">
        <button onClick={() => setShowTech((s) => !s)} className="text-[12px] text-fg-faint underline-offset-4 hover:text-ink">
          {showTech ? "إخفاء الإعدادات" : "الإعدادات واستثناء زياراتك"}
        </button>
        {showTech && (
          <div className="mt-3 space-y-4 rounded-2xl border border-line bg-bg-800/40 p-4">
            <div>
              <h3 className="text-[13px] font-semibold text-ink">استثناء زياراتك</h3>
              <p className="mt-1 text-[12px] text-fg-muted">
                طريقتان تسدّان ثغرتَي بعضهما: زيارة <span className="font-mono">ardev.dev/me</span>{" "}
                تستثني هذا المتصفّح، وتسجيل عنوانك يستثني شبكتك كلّها.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[12px] text-fg" dir="ltr">{myIp || "…"}</span>
                {myIp && !ips.includes(myIp) && (
                  <button onClick={() => void saveIp([...ips, myIp])}
                          className="rounded-lg border border-line px-2.5 py-1 text-[11px] text-ink transition-colors hover:border-white/25">
                    استثنِ عنواني الحالي
                  </button>
                )}
              </div>
              {ips.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {ips.map((x) => (
                    <li key={x} className="flex items-center gap-2 text-[12px] text-fg" dir="ltr">
                      <span className="font-mono">{x}</span>
                      <button onClick={() => void saveIp(ips.filter((y) => y !== x))}
                              className="text-[11px] text-red-400">إزالة</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="text-[13px] font-semibold text-ink">الجلسات الخام</h3>
              <p className="mt-1 text-[12px] text-fg-muted">
                {visits.length} جلسة محمّلة · {visits.filter((x) => x.isBot).length} منها زحفٌ آليّ مُستبعَد.
              </p>
            </div>
          </div>
        )}
      </section>

      <footer className="mt-10 flex items-center gap-3 text-[11px] text-fg-faint">
        <span>{user.email}</span>
        <button onClick={() => signOut(getClientAuth())} className="underline">خروج</button>
      </footer>
    </main>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-4" dir="rtl">
      <div className="text-center">{children}</div>
    </main>
  );
}
