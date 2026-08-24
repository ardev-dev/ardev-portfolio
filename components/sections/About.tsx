"use client";

import { heads, profile, skillGroups } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";

export function About() {
  const { t } = useLang();
  // رقائق التقنيات — من المجموعات التقنية فقط (نستثني "دورة الحياة" فهي عملية لا أدوات).
  const chips = skillGroups.filter((g) => g.title.en !== "Lifecycle").flatMap((g) => g.items);

  return (
    <section id="about" className="scroll-mt-24 py-14 lg:py-20">
      <Head num="01." title={t(heads.about)} />
      <Reveal>
        <p className="max-w-xl text-[15px] leading-relaxed text-body">{t(profile.about)}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-faint">{t(heads.currently)}</p>
        <div className="mt-4 flex max-w-xl flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c.en}
              className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1 font-mono text-xs text-body"
            >
              {t(c)}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
