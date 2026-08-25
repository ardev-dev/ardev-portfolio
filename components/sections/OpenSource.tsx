"use client";

import { ArrowUpRight, Package } from "lucide-react";
import { packages, scale, sections } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

export function OpenSource() {
  const { t } = useLang();
  return (
    <section id="open-source" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <SectionHeading eyebrow={t(sections.openSource.eyebrow)} title={t(sections.openSource.title)}>
        {t({
          en: "Maintained Dart packages on pub.dev under the ardev.dev publisher — solving real gaps the community was stuck on.",
          ar: "حزم Dart مُصانة على pub.dev تحت الناشر ardev.dev — تحلّ ثغرات حقيقية عَلِق عندها المجتمع.",
        })}
      </SectionHeading>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((pkg, i) => {
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Package size={18} />
                </span>
                {pkg.href && <ArrowUpRight size={16} className="text-fg-faint transition-colors group-hover:text-accent" />}
              </div>
              <h3 className="mt-4 break-all font-mono text-sm font-semibold text-ink">{pkg.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg">{t(pkg.blurb)}</p>
              <p className="mt-4 font-mono text-xs text-accent">{t(pkg.meta)}</p>
            </>
          );
          const cls = cn("card group flex h-full flex-col rounded-2xl p-5", pkg.href && "card-hover");
          return (
            <Reveal key={pkg.name} delay={(i % 4) * 0.06} className="h-full">
              {pkg.href ? (
                <a href={pkg.href} target="_blank" rel="noreferrer" className={cls}>
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="card mt-4 grid grid-cols-2 rounded-2xl sm:grid-cols-4">
          {scale.map((s, i) => (
            <div
              key={s.label.en}
              className={cn(
                "px-5 py-7 text-center",
                i > 0 && "sm:border-s sm:border-white/[0.06]",
                i >= 2 && "border-t border-white/[0.06] sm:border-t-0"
              )}
            >
              <div dir="ltr" className="font-display text-3xl font-bold text-grad">{t(s.value)}</div>
              <div className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-fg-muted">{t(s.label)}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
