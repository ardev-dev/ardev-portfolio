"use client";

import { motion } from "framer-motion";
import { experience, sections } from "@/lib/data";
import { SectionHeading } from "@/components/Section";
import { useLang } from "@/components/LanguageProvider";

export function Experience() {
  const { t } = useLang();
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading index="04" eyebrow={t(sections.experience.eyebrow)} title={t(sections.experience.title)} />

      <div className="relative mt-12 pl-6 sm:pl-8 rtl:pl-0 rtl:pr-6 sm:rtl:pr-8">
        {/* الخطّ الزمني */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet via-cyan/40 to-transparent rtl:left-auto rtl:right-0" />

        <div className="flex flex-col gap-10">
          {experience.map((job, i) => (
            <motion.div
              key={job.org.en}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* النقطة */}
              <span className="absolute -left-[26px] top-1.5 h-3.5 w-3.5 rounded-full bg-accent-gradient shadow-glow sm:-left-[34px] rtl:left-auto rtl:-right-[26px] sm:rtl:-right-[34px]" />

              <p className="font-mono text-xs text-cyan">{t(job.period)}</p>
              <h3 className="mt-1.5 font-display text-xl font-bold text-fg">{t(job.role)}</h3>
              <p className="text-sm font-medium text-violet-400">{t(job.org)}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">{t(job.summary)}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {job.highlights.map((h) => (
                  <li key={h.en} className="flex items-start gap-2 text-sm text-fg-muted">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet/60" />
                    {t(h)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
