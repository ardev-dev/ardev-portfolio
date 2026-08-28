"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { getClientAuth, getClientDb, OWNER_EMAIL } from "@/lib/firebase";
import { scoreLabel, scoreSession } from "@/lib/score";
import type { Daily, Visit, Visitor } from "./types";

/* ─── مساعدات عرض ──────────────────────────────────────────────────────────── */

const fmtDuration = (ms = 0) => {
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}ث`;
  return `${Math.floor(sec / 60)}د ${sec % 60}ث`;
};

const fmtTime = (t?: { toDate: () => Date }) =>
  t ? t.toDate().toLocaleString("ar-SA", { dateStyle: "short", timeStyle: "short" }) : "—";

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

/** قائمة تجاهل محليّة — لاستبعاد زياراتك أنت بلا أي كتابة في القاعدة. */
const IGNORE_KEY = "ardev_dash_ignore";
const readIgnored = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(IGNORE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
};

function mergeMaps(rows: Daily[], field: keyof Daily): [string, number][] {
  const out = new Map<string, number>();
  for (const r of rows) {
    const m = r[field] as Record<string, number> | undefined;
    if (!m) continue;
    for (const [k, v] of Object.entries(m)) out.set(k, (out.get(k) ?? 0) + v);
  }
  return [...out.entries()].sort((a, b) => b[1] - a[1]);
}

/** الوسيط أصدق من المتوسّط في مقاييس الأداء — قيمة شاذّة واحدة لا تُزيحه. */
const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)]!;
};

function toCsv(rows: Visit[]): string {
  const cols = [
    "id", "startedAt", "score", "ip", "rdns", "country", "city", "deviceType", "browser", "os",
    "activeMs", "durationMs", "maxScrollPct", "referrerHost", "siteLang", "exitSection", "lcpMs", "inpMs", "cls",
  ];
  const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const line = (v: Visit) =>
    [
      v.id, v.startedAt?.toDate().toISOString(), v.score, v.ip, v.rdns, v.geo?.country, v.geo?.city,
      v.deviceType, v.browser, v.os, v.activeMs, v.durationMs, v.maxScrollPct, v.referrerHost,
      v.siteLang, v.exitSection, v.lcpMs, v.inpMs, v.cls,
    ].map(cell).join(",");
  return [cols.join(","), ...rows.map(line)].join("\n");
}

/* ─── لبنات الواجهة ────────────────────────────────────────────────────────── */

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card rounded-2xl px-4 py-5">
      <div className="text-xs text-fg">{label}</div>
      <div className="mt-1.5 font-display text-3xl font-bold text-ink" dir="ltr">
        {value}
      </div>
      {sub && <div className="mt-1 font-mono text-[11px] text-fg-muted">{sub}</div>}
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const { text, tone } = scoreLabel(score);
  const cls =
    tone === "hot"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
      : tone === "warm"
        ? "border-accent/30 bg-accent-soft text-accent"
        : "border-white/10 bg-white/[0.04] text-fg-muted";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] ${cls}`}>
      <span className="font-mono" dir="ltr">{score}</span>
      {text}
    </span>
  );
}

/** أعمدة الزيارات — سلسلة واحدة بلون واحد، فالعنوان يكفي عن مفتاح ألوان. */
function DailyBars({ rows }: { rows: Daily[] }) {
  const max = Math.max(1, ...rows.map((r) => r.visits ?? 0));
  return (
    <div className="card rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-ink">الزيارات اليوميّة</h2>
      <div className="mt-5 flex h-40 items-end gap-[2px]" dir="ltr">
        {rows.map((r) => {
          const v = r.visits ?? 0;
          const hot = r.hotSessions ?? 0;
          return (
            <div key={r.id} className="group relative flex-1" title={`${r.date}: ${v} زيارة · ${hot} فرصة`}>
              <div
                className="w-full rounded-t bg-accent/80 transition-colors group-hover:bg-accent"
                style={{ height: `${Math.max((v / max) * 100, v ? 3 : 0)}%` }}
              />
              <span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-bg-900 px-1.5 py-0.5 font-mono text-[10px] text-ink shadow-card group-hover:block">
                {v}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between border-t border-white/[0.06] pt-2 font-mono text-[10px] text-fg-muted" dir="ltr">
        <span>{rows[0]?.date}</span>
        <span>{rows.at(-1)?.date}</span>
      </div>
    </div>
  );
}

function Breakdown({ title, rows }: { title: string; rows: [string, number][] }) {
  const max = Math.max(1, ...rows.map(([, v]) => v));
  return (
    <div className="card rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      {rows.length === 0 && <p className="mt-3 text-xs text-fg-muted">لا بيانات بعد.</p>}
      <div className="mt-4 space-y-2">
        {rows.slice(0, 8).map(([k, v]) => (
          <div key={k} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div className="min-w-0">
              <div className="truncate text-xs text-ink">{k}</div>
              <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full bg-accent/70" style={{ width: `${(v / max) * 100}%` }} />
              </div>
            </div>
            <span className="font-mono text-xs text-fg-muted">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionRow({ v, score, onIgnore }: { v: Visit; score: number; onIgnore: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const events = Object.entries(v.eventCounts ?? {});
  return (
    <>
      <tr
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer border-t border-white/[0.06] transition-colors hover:bg-white/[0.03]"
      >
        <td className="py-2.5 pe-3"><ScoreBadge score={score} /></td>
        <td className="py-2.5 pe-3 text-xs text-fg">{fmtTime(v.startedAt)}</td>
        <td className="py-2.5 pe-3 text-xs text-ink">
          {[v.geo?.city, v.geo?.country].filter(Boolean).join("، ") || "—"}
          {v.rdns && <div className="font-mono text-[10px] text-accent" dir="ltr">{v.rdns}</div>}
        </td>
        <td className="py-2.5 pe-3 text-xs text-fg">{v.deviceType} · {v.browser}</td>
        <td className="py-2.5 pe-3 font-mono text-xs text-ink" dir="ltr">{fmtDuration(v.activeMs)}</td>
        <td className="py-2.5 pe-3 font-mono text-xs text-fg" dir="ltr">{v.maxScrollPct ?? 0}%</td>
        <td className="py-2.5 pe-3 text-xs text-fg">{v.referrerHost || "direct"}</td>
        <td className="py-2.5 font-mono text-xs text-accent" dir="ltr">
          {events.length ? events.map(([k, c]) => `${k}×${c}`).join(" ") : "—"}
        </td>
      </tr>
      {open && (
        <tr className="border-t border-white/[0.06] bg-white/[0.02]">
          <td colSpan={8} className="p-4">
            <dl className="grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  ["أسباب التقييم", v.scoreReasons?.join("، ")],
                  ["IP", v.ip],
                  ["اسم الشبكة (rDNS)", v.rdns],
                  ["المزوّد", v.geo?.asOrganization],
                  ["المنطقة", v.geo?.countryRegion],
                  ["توقيت الزائر", v.browserTimezone],
                  ["لغات المتصفح", v.browserLanguages],
                  ["لغة الموقع", v.siteLang],
                  ["الشاشة / النافذة", [v.screen, v.viewport].filter(Boolean).join(" / ")],
                  ["الاتصال", v.connection],
                  ["المدّة الكلّية", fmtDuration(v.durationMs)],
                  ["قسم المغادرة", v.exitSection],
                  ["LCP / INP / CLS", [v.lcpMs && `${v.lcpMs}ms`, v.inpMs && `${v.inpMs}ms`, v.cls].filter(Boolean).join(" / ")],
                  ["TTFB / Load", [v.ttfbMs, v.loadMs].filter(Boolean).map((x) => `${x}ms`).join(" / ")],
                  ["زائر عائد", v.returning ? "نعم" : "لا"],
                  ["معرّف الزائر", v.visitorId],
                  ["البيئة", v.env],
                  ["المُحيل الكامل", v.referrer],
                  ["حملة UTM", [v.utm?.source, v.utm?.medium, v.utm?.campaign].filter(Boolean).join(" / ")],
                  ["الأقسام المقروءة", v.sectionsSeen?.join("، ")],
                  [
                    "زمن كل قسم",
                    Object.entries(v.sectionTimeMs ?? {})
                      .sort((a, b) => b[1] - a[1])
                      .map(([k, ms]) => `${k}: ${fmtDuration(ms)}`)
                      .join("، "),
                  ],
                ] as [string, string | undefined][]
              )
                .filter(([, val]) => val)
                .map(([k, val]) => (
                  <div key={k}>
                    <dt className="text-fg-muted">{k}</dt>
                    <dd className="mt-0.5 break-words text-ink">{val}</dd>
                  </div>
                ))}
            </dl>
            {v.visitorId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIgnore(v.visitorId!);
                }}
                className="mt-4 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-fg hover:text-ink"
              >
                تجاهل هذا الزائر (زياراتي)
              </button>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

/* ─── الصفحة ───────────────────────────────────────────────────────────────── */

const RANGES = [
  { days: 7, label: "٧ أيام" },
  { days: 14, label: "١٤ يوماً" },
  { days: 30, label: "٣٠ يوماً" },
];

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);

  const [days, setDays] = useState(14);
  const [hideBots, setHideBots] = useState(true);
  const [sortByScore, setSortByScore] = useState(false);
  const [ignored, setIgnored] = useState<string[]>([]);

  useEffect(() => {
    setIgnored(readIgnored());
    return onAuthStateChanged(getClientAuth(), (u) => {
      setUser(u);
      setReady(true);
    });
  }, []);

  const allowed = user?.email === OWNER_EMAIL;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const db = getClientDb();
      // ثلاثة استعلامات محدودة — قراءات معدودة تُبقي اللوحة داخل الباقة المجانيّة.
      const [statsSnap, visitsSnap, visitorsSnap] = await Promise.all([
        getDocs(query(collection(db, "stats"), orderBy("date", "desc"), limit(31))),
        getDocs(query(collection(db, "visits"), orderBy("startedAt", "desc"), limit(100))),
        getDocs(query(collection(db, "visitors"), orderBy("lastSeenAt", "desc"), limit(50))),
      ]);
      setDaily(statsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Daily));
      setVisits(visitsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Visit));
      setVisitors(visitorsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Visitor));
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذّرت القراءة");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) void load();
  }, [allowed, load]);

  const ignore = useCallback((id: string) => {
    setIgnored((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id];
      try {
        localStorage.setItem(IGNORE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // المدى المختار بترتيب زمني، مع تصفير الأيام الغائبة حتى لا ينكمش المحور.
  const range = useMemo(() => {
    const byDate = new Map(daily.map((d) => [d.date ?? d.id.replace("daily_", ""), d]));
    return Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      const k = dayKey(d);
      return byDate.get(k) ?? ({ id: k, date: k, visits: 0 } as Daily);
    });
  }, [daily, days]);

  const shown = useMemo(() => {
    const cutoff = Date.now() - days * 86_400_000;
    const rows = visits
      .filter((v) => (hideBots ? !v.isBot : true))
      .filter((v) => !(v.visitorId && ignored.includes(v.visitorId)))
      .filter((v) => (v.startedAt ? v.startedAt.toDate().getTime() >= cutoff : true))
      .map((v) => ({ v, score: v.score ?? scoreSession(v).total }));
    return sortByScore ? [...rows].sort((a, b) => b.score - a.score) : rows;
  }, [visits, hideBots, ignored, days, sortByScore]);

  const sum = (rows: Daily[], f: keyof Daily) => rows.reduce((a, r) => a + ((r[f] as number) ?? 0), 0);
  const totalVisits = sum(range, "visits");
  const totalActive = sum(range, "totalActiveMs");
  const completed = sum(range, "completedSessions");
  const hot = sum(range, "hotSessions");

  const vitals = useMemo(
    () => ({
      lcp: median(shown.map(({ v }) => v.lcpMs ?? 0).filter(Boolean)),
      inp: median(shown.map(({ v }) => v.inpMs ?? 0).filter(Boolean)),
      cls: median(shown.map(({ v }) => v.cls ?? 0).filter((x) => x > 0)),
    }),
    [shown]
  );

  const topVisitors = useMemo(
    () =>
      visitors
        .filter((x) => !x.isBot && !ignored.includes(x.id))
        .sort((a, b) => (b.sessions ?? 0) - (a.sessions ?? 0))
        .slice(0, 6),
    [visitors, ignored]
  );

  const exportCsv = () => {
    const blob = new Blob([`﻿${toCsv(shown.map((s) => s.v))}`], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ardev-visits-${dayKey(new Date())}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (!ready) return <main className="grid min-h-screen place-items-center text-sm text-fg">…</main>;

  if (!allowed) {
    return (
      <main className="grid min-h-screen place-items-center px-5" dir="rtl">
        <div className="card w-full max-w-sm rounded-2xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-ink">لوحة التحكّم</h1>
          <p className="mt-2 text-sm text-fg">{user ? `${user.email} غير مصرّح له.` : "الدخول لمالك الموقع فقط."}</p>
          <button
            onClick={async () => {
              setError(null);
              try {
                const provider = new GoogleAuthProvider();
                provider.setCustomParameters({ prompt: "select_account" });
                await signInWithPopup(getClientAuth(), provider);
              } catch (e) {
                setError(e instanceof Error ? e.message : "فشل الدخول");
              }
            }}
            className="btn-primary mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
          >
            الدخول عبر Google
          </button>
          {user && (
            <button
              onClick={() => signOut(getClientAuth())}
              className="mt-3 w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm text-fg"
            >
              تسجيل الخروج
            </button>
          )}
          {error && <p className="mt-4 text-xs text-rose-400">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12" dir="rtl">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">لوحة الزيارات</h1>
          <p className="mt-1 font-mono text-xs text-fg-muted">{user?.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={exportCsv} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-ink">
            CSV
          </button>
          <button
            onClick={load}
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-ink disabled:opacity-50"
          >
            {loading ? "…" : "تحديث"}
          </button>
          <button onClick={() => signOut(getClientAuth())} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-fg">
            خروج
          </button>
        </div>
      </header>

      {/* المرشّحات في صفّ واحد فوق كل شيء */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {RANGES.map((r) => (
          <button
            key={r.days}
            onClick={() => setDays(r.days)}
            className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
              days === r.days ? "border-accent/40 bg-accent-soft text-accent" : "border-white/10 text-fg hover:text-ink"
            }`}
          >
            {r.label}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-white/10" />
        <button
          onClick={() => setHideBots((b) => !b)}
          className={`rounded-lg border px-3 py-1.5 text-xs ${hideBots ? "border-accent/40 bg-accent-soft text-accent" : "border-white/10 text-fg"}`}
        >
          إخفاء البوتات
        </button>
        <button
          onClick={() => setSortByScore((b) => !b)}
          className={`rounded-lg border px-3 py-1.5 text-xs ${sortByScore ? "border-accent/40 bg-accent-soft text-accent" : "border-white/10 text-fg"}`}
        >
          ترتيب بالتقييم
        </button>
        {ignored.length > 0 && (
          <button
            onClick={() => {
              localStorage.removeItem(IGNORE_KEY);
              setIgnored([]);
            }}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-fg-muted"
          >
            إلغاء التجاهل ({ignored.length})
          </button>
        )}
      </div>

      {error && <p className="mt-6 text-sm text-rose-400">{error}</p>}

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="الزيارات" value={String(totalVisits)} sub={`${sum(range, "newVisitors")} زائر جديد`} />
        <Stat label="فرص تستحقّ المتابعة" value={String(hot)} sub={`تقييم ٥٥+`} />
        <Stat label="متوسّط الزمن النشط" value={fmtDuration(completed ? totalActive / completed : 0)} sub="لكل جلسة مكتملة" />
        <Stat
          label="LCP / INP الوسيط"
          value={vitals.lcp ? `${(vitals.lcp / 1000).toFixed(1)}s` : "—"}
          sub={vitals.inp ? `INP ${vitals.inp}ms · CLS ${vitals.cls}` : "قياس ميداني"}
        />
      </section>

      <section className="mt-4">
        <DailyBars rows={range} />
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Breakdown title="الدول" rows={mergeMaps(range, "byCountry")} />
        <Breakdown title="المدن" rows={mergeMaps(range, "byCity")} />
        <Breakdown title="مصادر الزيارة" rows={mergeMaps(range, "byReferrer")} />
        <Breakdown title="الأجهزة" rows={mergeMaps(range, "byDevice")} />
        <Breakdown title="المتصفحات" rows={mergeMaps(range, "byBrowser")} />
        <Breakdown title="أنظمة التشغيل" rows={mergeMaps(range, "byOs")} />
      </section>

      <section className="card mt-4 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-ink">الزوّار العائدون — التكرار أصدق من الزيارة الواحدة</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topVisitors.map((x) => (
            <div key={x.id} className="rounded-xl border border-white/[0.06] p-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm text-ink">{[x.lastCity, x.lastCountry].filter(Boolean).join("، ") || "—"}</span>
                <span className="font-mono text-xs text-accent" dir="ltr">{x.sessions ?? 1}×</span>
              </div>
              <div className="mt-1.5 space-y-0.5 text-[11px] text-fg-muted">
                <div>أول لمسة: {x.firstTouch?.referrerHost ?? "—"}</div>
                <div>آخر لمسة: {x.lastTouch?.referrerHost ?? "—"}</div>
                <div dir="ltr" className="font-mono">
                  {fmtDuration(x.totalActiveMs)} · {fmtTime(x.lastSeenAt)}
                </div>
              </div>
            </div>
          ))}
          {topVisitors.length === 0 && <p className="text-xs text-fg-muted">لا زوّار بعد.</p>}
        </div>
      </section>

      <section className="card mt-4 overflow-x-auto rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-ink">الجلسات ({shown.length}) — اضغط أي صفّ للتفاصيل</h2>
        <table className="mt-4 w-full min-w-[920px] text-start">
          <thead>
            <tr className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              {["التقييم", "الوقت", "المكان", "الجهاز", "نشط", "تمرير", "المصدر", "الأحداث"].map((h) => (
                <th key={h} className="pb-2 pe-3 text-start font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map(({ v, score }) => (
              <SessionRow key={v.id} v={v} score={score} onIgnore={ignore} />
            ))}
          </tbody>
        </table>
        {shown.length === 0 && !loading && <p className="mt-4 text-xs text-fg-muted">لا جلسات في هذا المدى.</p>}
      </section>
    </main>
  );
}
