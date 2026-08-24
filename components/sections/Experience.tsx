"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { SectionHeading } from "@/components/Section";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading index="04" eyebrow="Experience" title="Where I've owned systems" />

      <div className="relative mt-12 pl-6 sm:pl-8">
        {/* الخطّ الزمني */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-violet via-cyan/40 to-transparent" />

        <div className="flex flex-col gap-10">
          {experience.map((job, i) => (
            <motion.div
              key={job.org}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* النقطة */}
              <span className="absolute -left-[26px] top-1.5 grid h-3.5 w-3.5 place-items-center sm:-left-[34px]">
                <span className="h-3.5 w-3.5 rounded-full bg-accent-gradient shadow-glow" />
              </span>

              <p className="font-mono text-xs text-cyan">{job.period}</p>
              <h3 className="mt-1.5 font-display text-xl font-bold text-fg">{job.role}</h3>
              <p className="text-sm font-medium text-violet-400">{job.org}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">{job.summary}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {job.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-fg-muted">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet/60" />
                    {h}
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
