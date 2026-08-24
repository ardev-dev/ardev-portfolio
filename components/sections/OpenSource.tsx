"use client";

import { ArrowUpRight } from "lucide-react";
import { heads, packages, scale } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";

export function OpenSource() {
  const { t } = useLang();
  return (
    <section id="open-source" className="scroll-mt-24 py-14 lg:py-20">
      <Head num="04." title={t(heads.openSource)} />

      <div className="flex flex-col">
        {packages.map((pkg) => {
          const body = (
            <>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-mono text-sm font-semibold text-heading transition-colors group-hover:text-accent">
                  {pkg.name}
                  {pkg.href && (
                    <ArrowUpRight size={13} className="ms-1 inline -translate-y-px text-faint transition-colors group-hover:text-accent" />
                  )}
                </h3>
                <span className="shrink-0 font-mono text-xs text-accent/80">{t(pkg.meta)}</span>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-body">{t(pkg.blurb)}</p>
            </>
          );
          return (
            <Reveal key={pkg.name}>
              {pkg.href ? (
                <a
                  href={pkg.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group -mx-4 block rounded-xl p-4 transition-colors duration-200 hover:bg-white/[0.025]"
                >
                  {body}
                </a>
              ) : (
                <div className="group -mx-4 rounded-xl p-4">{body}</div>
              )}
            </Reveal>
          );
        })}
      </div>

      {/* أرقام المقياس */}
      <Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          {scale.map((s) => (
            <div key={s.label.en}>
              <div className="font-display text-3xl font-bold text-accent">{t(s.value)}</div>
              <div className="mt-1 font-mono text-[11px] uppercase leading-tight tracking-wider text-faint">
                {t(s.label)}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
