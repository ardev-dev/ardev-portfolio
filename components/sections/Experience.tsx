"use client";

import { experience, heads } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  const { t } = useLang();
  return (
    <section id="experience" className="scroll-mt-24 py-14 lg:py-20">
      <Head num="02." title={t(heads.experience)} />
      <div className="flex flex-col">
        {experience.map((job) => (
          <Reveal key={job.org.en}>
            <div className="group relative -mx-4 grid gap-2 rounded-xl p-4 transition-colors duration-200 hover:bg-white/[0.025] sm:grid-cols-[130px_1fr] sm:gap-6">
              <p className="pt-1 font-mono text-xs uppercase leading-relaxed tracking-wider text-faint">
                {t(job.period)}
              </p>
              <div>
                <h3 className="font-display text-base font-semibold text-heading">
                  <span className="transition-colors group-hover:text-accent">{t(job.role)}</span>
                  <span className="text-body"> · {t(job.org)}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{t(job.summary)}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {job.highlights.map((h) => (
                    <li key={h.en} className="flex gap-2.5 text-sm leading-relaxed text-body">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {t(h)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
