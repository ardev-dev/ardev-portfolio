"use client";

import { marquee } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";

export function Marquee() {
  const { t } = useLang();
  const items = [...marquee, ...marquee];
  return (
    <section className="mx-auto max-w-5xl px-5 py-8">
      <p className="text-center font-mono text-xs uppercase tracking-[0.22em] text-fg-muted">
        {t({ en: "Built with", ar: "مبنيّ بـ" })}
      </p>
      <div className="mask-fade-x mt-5 overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee gap-3">
          {items.map((tech, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-sm text-fg"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
