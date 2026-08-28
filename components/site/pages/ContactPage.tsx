"use client";

import { ArrowUpRight, Clock, Copy, Check, MapPin } from "lucide-react";
import { useState } from "react";
import { profile, socials } from "@/lib/data";
import { Shell } from "@/components/site/pages/Shell";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";
import type { L } from "@/lib/data";

const channels: { label: string; handle: string; href: string; note: L }[] = [
  {
    label: "LinkedIn",
    handle: socials.linkedinHandle,
    href: socials.linkedin,
    note: { en: "Roles & introductions", ar: "الوظائف والتعارف" },
  },
  {
    label: "GitHub",
    handle: socials.githubHandle,
    href: socials.github,
    note: { en: "Code & open source", ar: "الكود والمصادر المفتوحة" },
  },
  {
    label: "pub.dev",
    handle: socials.pubdevHandle,
    href: socials.pubdev,
    note: { en: "Published packages", ar: "الحزم المنشورة" },
  },
];

/** نسخ البريد بضغطة — أسرع طريق للمُوظِّف الذي يكتب من جهاز آخر. */
function CopyEmail() {
  const { t } = useLang();
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          // الحافظة محجوبة (سياق غير آمن) — الرابط المجاور يظلّ يعمل
        }
      }}
      className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm text-ink"
      aria-live="polite"
    >
      {done ? <Check size={15} /> : <Copy size={15} />}
      {done ? t({ en: "Copied", ar: "نُسخ" }) : t({ en: "Copy email", ar: "انسخ البريد" })}
    </button>
  );
}

export function ContactPage() {
  const { t } = useLang();
  // توقيت الرياض: يخبر الزائر متى يتوقّع ردّاً بدل وعد مبهم.
  const localTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Riyadh",
  }).format(new Date());

  return (
    <Shell>
      <div  className="anim glass relative overflow-hidden rounded-[32px] p-8 sm:p-12 lg:p-16" style={{ "--d": "0s" } as React.CSSProperties}>
        {/* ضوء علوي داخل اللوح — يعطي الزجاج اتجاه إضاءة */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_70%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t({ en: "Available for senior roles", ar: "متاح لأدوار هندسية خبيرة" })}
            </span>

            <h2 className="mt-7 max-w-[13ch] font-display text-display text-ink text-balance lg:max-w-none">
              {t({ en: "Building something", ar: "تبني نظاماً" })}{" "}
              <Em className="text-grad">{t({ en: "that has to work?", ar: "لا يحتمل الخطأ؟" })}</Em>
            </h2>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg">
              {t({
                en: "Tell me what you're building and what's breaking. I read every message myself and reply within a day.",
                ar: "أخبرني بما تبنيه وما الذي يتعطّل فيه. أقرأ كل رسالة بنفسي وأردّ خلال يوم.",
              })}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={socials.email}
                className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                {profile.email}
                <ArrowUpRight size={15} />
              </a>
              <CopyEmail />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 text-[12px] text-fg-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} /> {t(profile.location)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} />
                <span dir="ltr">{localTime}</span> {t({ en: "local time", ar: "بتوقيتي" })}
              </span>
              <span dir="ltr">AST · UTC+3</span>
            </div>
          </div>

          {/* القنوات: لكلٍّ غرضها، فلا يتردّد الزائر أيّها يطرق */}
          <div className="grid gap-3">
            {channels.map((c, i) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="anim card card-hover group flex items-center justify-between gap-4 rounded-2xl px-5 py-4" style={{ "--d": "0.15s" } as React.CSSProperties}>
                <span className="min-w-0">
                  <span className="block text-[14px] text-ink" dir="ltr">
                    {c.label}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[11px] text-fg-muted" dir="ltr">
                    {c.handle}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-[11px] text-fg-muted sm:block">{t(c.note)}</span>
                  <ArrowUpRight
                    size={15}
                    className="text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 px-2 text-[11px] text-fg-faint">
        <span>
          © {new Date().getFullYear()} {t(profile.name)}
        </span>
        <span>{t({ en: "Built with Next.js — designed and coded by me.", ar: "بُني بـ Next.js — تصميماً وبرمجةً بيدي." })}</span>
      </div>
    </Shell>
  );
}
