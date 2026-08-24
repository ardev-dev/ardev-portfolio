"use client";

import { motion } from "framer-motion";
import { skillGroups, sections } from "@/lib/data";
import { SectionHeading } from "@/components/Section";
import { useLang } from "@/components/LanguageProvider";

export function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading index="03" eyebrow={t(sections.skills.eyebrow)} title={t(sections.skills.title)}>
        {t(sections.skills.subtitle)}
      </SectionHeading>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title.en}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-line bg-ink-800/40 p-6"
          >
            <h3 className="font-display text-lg font-bold text-fg">{t(group.title)}</h3>
            <div className="mt-4 h-px w-full rule-glow" />
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.items.map((sk) => (
                <li key={sk.en} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gradient" />
                  {t(sk)}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
