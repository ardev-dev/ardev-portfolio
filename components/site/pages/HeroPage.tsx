"use client";

import { ArrowDown } from "lucide-react";
import { profile, stats } from "@/lib/data";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";

/** سطر يصعد من خلف قناع — الحركة الوحيدة في العنوان. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <span className="anim-line" style={{ "--d": `${delay}s` } as React.CSSProperties}>
        {children}
      </span>
    </span>
  );
}

/**
 * الشريحة الأولى: تعريف بشخص، لا شعار.
 * العنوان قصير، والنبذة تحمل الوزن، والحقائق على اليمين تُجيب أسئلة الزائر
 * الأربعة الأولى (من؟ أين؟ ماذا يعمل؟ بأي لغة نتحدّث؟) قبل أن يسألها.
 */
export function HeroPage() {
  const { t } = useLang();

  return (
    <div data-scroll className="h-full w-full overflow-y-auto overscroll-contain px-4 pb-28 pt-24 sm:px-8 sm:pt-28">
      <div className="mx-auto flex min-h-full w-full max-w-[1180px] flex-col justify-center">
        <div className="anim window overflow-hidden rounded-2xl" style={{ "--d": "0.05s" } as React.CSSProperties}>
          <div className="window-bar flex items-center gap-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="mx-auto hidden font-mono text-[11px] text-fg-faint sm:block" dir="ltr">
              ardev.dev
            </span>
          </div>

          <div className="relative isolate px-6 py-10 sm:px-12 sm:py-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_70%)]" />

            <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
              <div>
                <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] text-ink">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  {t(profile.status)}
                </span>

                <h1 className="mt-6 font-display text-display text-ink">
                  <Line delay={0.15}>
                    <span className="text-grad">{t({ en: "Abdulrahman Morshed —", ar: "عبدالرحمن مرشد —" })}</span>
                  </Line>
                  <Line delay={0.26}>
                    <Em className="text-shine">{t({ en: "software engineer.", ar: "مهندس برمجيات." })}</Em>
                  </Line>
                </h1>

                <div className="anim mt-7 space-y-4" style={{ "--d": "0.5s" } as React.CSSProperties}>
                  {profile.intro.map((para, i) => (
                    <p key={i} className={`max-w-xl text-[15px] leading-relaxed ${i === 0 ? "text-ink" : "text-fg"}`}>
                      {t(para)}
                    </p>
                  ))}
                </div>
              </div>

              {/* بطاقة الحقائق: قراءة سريعة لمن لا يقرأ الفقرات */}
              <dl
                className="anim divide-y divide-white/[0.07] self-start rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-1"
                style={{ "--d": "0.62s" } as React.CSSProperties}
              >
                {profile.facts.map((f) => (
                  <div key={f.label.en} className="py-3.5">
                    <dt className="text-[11px] uppercase tracking-wider text-fg-muted">{t(f.label)}</dt>
                    <dd className="mt-1 text-[13.5px] text-ink">{t(f.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div
          className="anim mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
          style={{ "--d": "0.74s" } as React.CSSProperties}
        >
          {stats.map((s) => (
            <div key={s.label.en} className="glass rounded-2xl px-5 py-5 text-center">
              <div className="font-display text-2xl font-semibold text-ink" dir="ltr">
                {s.value}
                {s.suffix}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-fg-muted">{t(s.label)}</div>
            </div>
          ))}
        </div>

        <p
          className="anim mt-7 flex items-center justify-center gap-2 text-[11px] text-fg-faint"
          style={{ "--d": "0.86s" } as React.CSSProperties}
        >
          <ArrowDown size={13} className="animate-scroll-cue" />
          {t({ en: "Scroll, swipe or use the arrow keys", ar: "مرّر أو اسحب أو استخدم الأسهم" })}
        </p>
      </div>
    </div>
  );
}
