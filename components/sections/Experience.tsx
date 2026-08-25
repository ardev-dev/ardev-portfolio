"use client";

import { experience, sections } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

export function Experience() {
  const { t } = useLang();
  return (
    <section id="experience" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24">
      <SectionHeading eyebrow={t(sections.experience.eyebrow)} title={t(sections.experience.title)} />

      <div className="relative mt-12 ps-6 sm:ps-9">
        <div className="absolute inset-y-3 start-0 w-px bg-gradient-to-b from-accent via-accent/25 to-transparent" />
        <div className="flex flex-col gap-4">
          {experience.map((job) => (
            <Reveal key={job.org.en}>
              <div className="card rounded-2xl p-6 relative">
                <span className="absolute -start-[25px] top-7 h-3 w-3 rounded-full bg-accent-grad ring-4 ring-bg-900 sm:-start-[37px]" />
                <p className="font-mono text-xs text-accent">{t(job.period)}</p>
                <h3 className="mt-1.5 font-display text-lg font-bold text-ink">
                  {t(job.role)} <span className="font-normal text-fg">· {t(job.org)}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg">{t(job.summary)}</p>
                {job.highlights.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {job.highlights.map((h) => (
                      <li key={h.en} className="flex gap-2.5 text-sm leading-relaxed text-fg">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {t(h)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
