"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Package } from "lucide-react";
import { packages, socials } from "@/lib/data";
import { SectionHeading } from "@/components/Section";

export function OpenSource() {
  return (
    <section id="open-source" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading index="02" eyebrow="Open Source" title="Published packages">
        Maintained Dart packages on pub.dev under the{" "}
        <a href={socials.pubdev} target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">
          ardev.dev
        </a>{" "}
        publisher — solving real gaps the community was stuck on.
      </SectionHeading>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {packages.map((pkg, i) => (
          <motion.a
            key={pkg.name}
            href={pkg.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="card-glow group flex flex-col rounded-3xl border border-line bg-ink-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-soft text-violet-400">
                <Package size={20} />
              </span>
              <ArrowUpRight
                size={18}
                className="text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-400"
              />
            </div>
            <h3 className="mt-5 break-all font-mono text-[15px] font-semibold text-fg">{pkg.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{pkg.blurb}</p>
            <p className="mt-5 font-mono text-xs text-cyan">{pkg.meta}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
