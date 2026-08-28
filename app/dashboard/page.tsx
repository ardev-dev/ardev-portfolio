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
import type { Daily, Visit } from "./types";

/* ─── مساعدات عرض ──────────────────────────────────────────────────────────── */

const fmtDuration = (ms = 0) => {
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}ث`;
  const m = Math.floor(sec / 60);
  return `${m}د ${sec % 60}ث`;
};

const fmtTime = (t?: { toDate: () => Date }) =>
  t ? t.toDate().toLocaleString("ar-SA", { dateStyle: "short", timeStyle: "short" }) : "—";

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

/** يجمع خرائط العدّادات عبر عدّة أيام في قائمة مرتّبة تنازليّاً. */
function mergeMaps(rows: Daily[], field: keyof Daily): [string, number][] {
  const out = new Map<string, number>();
  for (const r of rows) {
    const m = r[field] as Record<string, number> | undefined;
    if (!m) continue;
    for (const [k, v] of Object.entries(m)) out.set(k, (out.get(k) ?? 0) + v);
  }
  return [...out.entries()].sort((a, b) => b[1] - a[1]);
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

/**
 * أعمدة الزيارات اليوميّة — سلسلة واحدة بلون واحد، فلا حاجة لمفتاح ألوان؛
 * العنوان يسمّيها. الشبكة والمحاور متراجعة بصريّاً لتبقى البيانات هي البارزة.
 */
function DailyBars({ rows }: { rows: Daily[] }) {
  const max = Math.max(1, ...rows.map((r) => r.visits ?? 0));
  return (
    <div className="card rounded-2xl p-5">
      <h2 className="text-sm font-semibold text-ink">الزيارات اليوميّة — آخر 14 يوماً</h2>
      <div className="mt-5 flex h-40 items-end gap-[2px]" dir="ltr">
        {rows.map((r) => {
          const v = r.visits ?? 0;
          return (
            <div key={r.id} className="group relative flex-1" title={`${r.date}: ${v}`}>
              <div
                className="w-full rounded-t bg-accent/80 transition-colors group-hover:bg-accent"
                style={{ height: `${Math.max((v / max) * 100, v ? 3 : 0)}%` }}
              />
              <span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-bg-900 px-1.5 py-0.5 font-mono text-[10px] text-ink shadow-card group-hover:block">
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

/** قائمة تفصيليّة بأشرطة نسبيّة — الرقم بلون النصّ لا بلون الشريط. */
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

function SessionRow({ v }: { v: Visit }) {
  const [open, setOpen] = useState(false);
  const events = Object.entries(v.eventCounts ?? {});
  return (
    <>
      <tr
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer border-t border-white/[0.06] transition-colors hover:bg-white/[0.03]"
      >
        <td className="py-2.5 pe-3 text-xs text-fg">{fmtTime(v.startedAt)}</td>
        <td className="py-2.5 pe-3 text-xs text-ink">
          {[v.geo?.city, v.geo?.country].filter(Boolean).join("، ") || "—"}
        </td>
        <td className="py-2.5 pe-3 text-xs text-fg">
          {v.deviceType} · {v.browser} · {v.os}
        </td>
        <td className="py-2.5 pe-3 font-mono text-xs text-ink" dir="ltr">
          {fmtDuration(v.activeMs)}
        </td>
        <td className="py-2.5 pe-3 font-mono text-xs text-fg" dir="ltr">
          {v.maxScrollPct ?? 0}%
        </td>
        <td className="py-2.5 pe-3 text-xs text-fg">{v.referrerHost || "direct"}</td>
        <td className="py-2.5 font-mono text-xs text-accent" dir="ltr">
          {events.length ? events.map(([k, n]) => `${k}×${n}`).join(" ") : "—"}
        </td>
      </tr>
      {open && (
        <tr className="border-t border-white/[0.06] bg-white/[0.02]">
          <td colSpan={7} className="p-4">
            <dl className="grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["IP", v.ip],
                ["المزوّد", v.geo?.asOrganization],
                ["المنطقة", v.geo?.countryRegion],
                ["توقيت الزائر", v.browserTimezone],
                ["لغات المتصفح", v.browserLanguages],
                ["لغة الموقع", v.siteLang],
                ["الشاشة / النافذة", [v.screen, v.viewport].filter(Boolean).join(" / ")],
                ["الاتصال", v.connection],
                ["المدّة الكلّية", fmtDuration(v.durationMs)],
                ["TTFB / Load", [v.ttfbMs, v.loadMs].filter(Boolean).map((x) => `${x}ms`).join(" / ")],
                ["زائر عائد", v.returning ? "نعم" : "لا"],
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
              ]
                .filter(([, val]) => val)
                .map(([k, val]) => (
                  <div key={k as string}>
                    <dt className="text-fg-muted">{k}</dt>
                    <dd className="mt-0.5 break-words text-ink">{val as string}</dd>
                  </div>
                ))}
            </dl>
          </td>
        </tr>
      )}
    </>
  );
}

/* ─── الصفحة ───────────────────────────────────────────────────────────────── */

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [daily, setDaily] = useState<Daily[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => onAuthStateChanged(getClientAuth(), (u) => {
    setUser(u);
    setReady(true);
  }), []);

  const allowed = user?.email === OWNER_EMAIL;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const db = getClientDb();
      // استعلامان فقط بحدّ صريح — قراءات معدودة تُبقي اللوحة داخل الباقة المجانيّة.
      const [statsSnap, visitsSnap] = await Promise.all([
        getDocs(query(collection(db, "stats"), orderBy("date", "desc"), limit(30))),
        getDocs(query(collection(db, "visits"), orderBy("startedAt", "desc"), limit(60))),
      ]);
      setDaily(statsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Daily));
      setVisits(visitsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Visit));
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذّرت القراءة");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (allowed) void load();
  }, [allowed, load]);

  // آخر 14 يوماً بترتيب زمني، مع تصفير الأيام الغائبة حتى لا ينكمش المحور.
  const last14 = useMemo(() => {
    const byDate = new Map(daily.map((d) => [d.date ?? d.id.replace("daily_", ""), d]));
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      const k = dayKey(d);
      return byDate.get(k) ?? ({ id: k, date: k, visits: 0 } as Daily);
    });
  }, [daily]);

  const week = useMemo(() => last14.slice(7), [last14]);
  const sum = (rows: Daily[], f: keyof Daily) => rows.reduce((a, r) => a + ((r[f] as number) ?? 0), 0);
  const weekVisits = sum(week, "visits");
  const weekActive = sum(week, "totalActiveMs");
  const weekCompleted = sum(week, "completedSessions");
  const engaged = sum(week, "engagedSessions");

  if (!ready) {
    return <main className="grid min-h-screen place-items-center text-sm text-fg">…</main>;
  }

  if (!allowed) {
    return (
      <main className="grid min-h-screen place-items-center px-5" dir="rtl">
        <div className="card w-full max-w-sm rounded-2xl p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-ink">لوحة التحكّم</h1>
          <p className="mt-2 text-sm text-fg">
            {user ? `${user.email} غير مصرّح له.` : "الدخول لمالك الموقع فقط."}
          </p>
          <button
            onClick={async () => {
              setError(null);
              try {
                // نطلب اختيار الحساب صراحةً — يتجنّب الدخول الصامت بحساب خاطئ.
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
        <div className="flex gap-2">
          <button
            onClick={load}
            disabled={loading}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-ink disabled:opacity-50"
          >
            {loading ? "…" : "تحديث"}
          </button>
          <button
            onClick={() => signOut(getClientAuth())}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-fg"
          >
            خروج
          </button>
        </div>
      </header>

      {error && <p className="mt-6 text-sm text-rose-400">{error}</p>}

      <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="زيارات اليوم" value={String(last14.at(-1)?.visits ?? 0)} />
        <Stat label="زيارات 7 أيام" value={String(weekVisits)} sub={`${sum(week, "newVisitors")} جديد`} />
        <Stat
          label="متوسّط الزمن النشط"
          value={fmtDuration(weekCompleted ? weekActive / weekCompleted : 0)}
          sub="لكل جلسة مكتملة"
        />
        <Stat
          label="جلسات متفاعلة"
          value={weekCompleted ? `${Math.round((engaged / weekCompleted) * 100)}%` : "—"}
          sub="أطول من 10 ثوانٍ"
        />
      </section>

      <section className="mt-4">
        <DailyBars rows={last14} />
      </section>

      <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Breakdown title="الدول" rows={mergeMaps(week, "byCountry")} />
        <Breakdown title="المدن" rows={mergeMaps(week, "byCity")} />
        <Breakdown title="مصادر الزيارة" rows={mergeMaps(week, "byReferrer")} />
        <Breakdown title="الأجهزة" rows={mergeMaps(week, "byDevice")} />
        <Breakdown title="المتصفحات" rows={mergeMaps(week, "byBrowser")} />
        <Breakdown title="أنظمة التشغيل" rows={mergeMaps(week, "byOs")} />
      </section>

      <section className="card mt-4 overflow-x-auto rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-ink">آخر الجلسات — اضغط أي صفّ للتفاصيل</h2>
        <table className="mt-4 w-full min-w-[860px] text-start">
          <thead>
            <tr className="text-start font-mono text-[10px] uppercase tracking-wider text-fg-muted">
              <th className="pb-2 pe-3 text-start font-normal">الوقت</th>
              <th className="pb-2 pe-3 text-start font-normal">المكان</th>
              <th className="pb-2 pe-3 text-start font-normal">الجهاز</th>
              <th className="pb-2 pe-3 text-start font-normal">نشط</th>
              <th className="pb-2 pe-3 text-start font-normal">تمرير</th>
              <th className="pb-2 pe-3 text-start font-normal">المصدر</th>
              <th className="pb-2 text-start font-normal">الأحداث</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((v) => (
              <SessionRow key={v.id} v={v} />
            ))}
          </tbody>
        </table>
        {visits.length === 0 && !loading && (
          <p className="mt-4 text-xs text-fg-muted">لا جلسات بعد — تأكّد من ضبط FIREBASE_SERVICE_ACCOUNT.</p>
        )}
      </section>
    </main>
  );
}
