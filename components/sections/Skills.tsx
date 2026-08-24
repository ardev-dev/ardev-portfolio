"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "@/components/Section";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading index="03" eyebrow="Capabilities" title="The full lifecycle — and the stack behind it">
        Technologies are evidence, not identity. I own the system from requirements to production
        support; these are the tools I reach for.
      </SectionHeading>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-line bg-ink-800/40 p-6"
          >
            <h3 className="font-display text-lg font-bold text-fg">{group.title}</h3>
            <div className="mt-4 h-px w-full rule-glow" />
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gradient" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
