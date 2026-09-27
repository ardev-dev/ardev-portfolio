"use client";

import { useState } from "react";
import { Copy, FileText, MessageSquare, MapPin, Clock, Check } from "lucide-react";
import { CHANNELS, channelUrl } from "@/lib/links";
import { followUpText, type Person } from "./people";

/* ─── أدوات عرض صغيرة ──────────────────────────────────────────────────────── */

const secs = (ms: number) => {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}ث` : `${Math.floor(s / 60)}د ${s % 60}ث`;
};

const day = (d: Date | null) =>
  d ? d.toLocaleDateString("ar-SA", { day: "numeric", month: "short" }) : "—";

/** أسماء القنوات بالعربية — `com.linkedin.android` لا يقولها أحد. */
const SOURCE_AR: Record<string, string> = {
  direct: "مباشر",
  "com.linkedin.android": "لينكدإن (تطبيق)",
  "www.linkedin.com": "لينكدإن",
  "lnkd.in": "لينكدإن",
  "www.facebook.com": "فيسبوك",
  "l.instagram.com": "إنستغرام",
  "www.google.com": "بحث جوجل",
  "pub.dev": "pub.dev",
  "github.com": "جيت هَب",
};
const srcAr = (s: string) => SOURCE_AR[s] ?? s;

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        });
      }}
      className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-[11px] text-fg hover:text-ink"
    >
      {done ? <Check size={12} /> : <Copy size={12} />} {done ? "نُسخ" : label}
    </button>
  );
}

/* ─── بطاقة شخص ────────────────────────────────────────────────────────────── */

function Heat({ p }: { p: Person }) {
  // ⚠️ النيّة المُعلَنة تسبق الرقم: من فتح سيرتك «فرصة» ولو قصُرت زيارته.
  const tone = p.contacted
    ? { t: "تواصل", c: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" }
    : p.openedCv
      ? { t: "فتح السيرة", c: "bg-amber-500/15 text-amber-300 border-amber-500/30" }
      : p.score >= 55
        ? { t: "مهتمّ", c: "bg-sky-500/15 text-sky-300 border-sky-500/30" }
        : { t: "عابر", c: "bg-white/5 text-fg border-white/10" };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[11px] ${tone.c}`}>{tone.t}</span>
  );
}

function PersonCard({ p }: { p: Person }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Heat p={p} />
        <span className="font-mono text-[11px] text-fg/60">{p.visitorId.slice(0, 8)}</span>
        <span className="ms-auto text-[11px] text-fg/60">
          {day(p.firstAt)} ← {day(p.lastAt)}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-fg">
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} /> {p.places[0] ?? "—"}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> {p.sessions.length} زيارة · {secs(p.activeMs)}
        </span>
        <span>تمرير {p.maxScrollPct}%</span>
      </div>

      {/* ⚠️ **أوّل مصدرٍ وآخره معاً.** الأوّل ينسب الاكتشاف والآخر يقول أين هو
          الآن — وعرضُ أحدهما وحده يُخفي نصف القصّة. */}
      <div className="mt-2 text-[12px] text-fg">
        اكتشفك عبر <strong className="text-ink">{srcAr(p.firstSource)}</strong>
        {p.lastSource !== p.firstSource && <> · آخر مرّة من <strong className="text-ink">{srcAr(p.lastSource)}</strong></>}
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {p.openedCv && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300">
            <FileText size={11} /> فتح السيرة
          </span>
        )}
        {p.contacted && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-300">
            <MessageSquare size={11} /> نقر تواصل
          </span>
        )}
        {p.sections.slice(0, 4).map((s) => (
          <span key={s} className="rounded-lg bg-white/5 px-2 py-0.5 text-[11px] text-fg/80">{s}</span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <CopyButton text={followUpText(p)} label="انسخ للمتابعة" />
        <button type="button" onClick={() => setOpen((v) => !v)}
                className="text-[11px] text-fg/70 hover:text-ink">
          {open ? "إخفاء الزيارات" : `الزيارات (${p.sessions.length})`}
        </button>
      </div>

      {open && (
        <ol className="mt-3 space-y-1 border-s border-white/10 ps-3 text-[11px] text-fg/80">
          {p.sessions.map((s, i) => (
            <li key={s.id ?? i}>
              {day(s.startedAt ? s.startedAt.toDate() : null)} · {srcAr(s.referrerHost ?? "direct")} ·{" "}
              {secs(s.activeMs ?? 0)} · تمرير {s.maxScrollPct ?? 0}%
              {s.geo?.city ? ` · ${s.geo.city}` : ""}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ─── الأقسام المُصدَّرة ────────────────────────────────────────────────────── */

export function PeopleSection({ people }: { people: Person[] }) {
  if (!people.length) {
    return <p className="text-[13px] text-fg/70">لا زوّار في هذا المدى.</p>;
  }
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {people.map((p) => <PersonCard key={p.visitorId} p={p} />)}
    </div>
  );
}

/**
 * روابط القنوات — **أداة عمل لا تقرير**.
 *
 * ⚠️ «مباشر» أكبر مصدرٍ في اللوحة، وهو ليس مصدراً بل **غياب مصدر**: متصفّحات
 * واتساب ولينكدإن الداخلية تحذف `referrer` عمداً. فلا يُحلّ بالتحليل بل
 * بنسخ الرابط الموسوم من هنا قبل نشره في أيّ مكان.
 */
export function ChannelsSection({ perSource }: { perSource: Record<string, number> }) {
  return (
    <div className="space-y-2">
      <p className="text-[12px] text-fg/70">
        انسخ رابط القناة والصقه في موضعها — ولا تنشر <span className="font-mono">ardev.dev</span> عارياً
        بعد اليوم، فالزيارة بلا وسمٍ تصل مجهولة المصدر.
      </p>
      <div className="grid gap-2 md:grid-cols-2">
        {CHANNELS.map((c) => {
          const hits = perSource[c.source] ?? 0;
          return (
            <div key={c.key} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">
              <div className="min-w-0 flex-1">
                <div className="text-[12px] text-ink">{c.label}</div>
                <div className="truncate text-[11px] text-fg/60">{c.where}</div>
              </div>
              {hits > 0 && (
                <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[11px] text-sky-300">
                  {hits}
                </span>
              )}
              <CopyButton text={channelUrl(c)} label="انسخ" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
