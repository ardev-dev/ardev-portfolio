"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Package } from "lucide-react";
import { packages, scale, sections, socials } from "@/lib/data";
import { SectionHeading } from "@/components/Section";
import { GithubIcon } from "@/components/BrandIcons";
import { useLang } from "@/components/LanguageProvider";

export function OpenSource() {
  const { t } = useLang();
  return (
    <section id="open-source" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading index="02" eyebrow={t(sections.openSource.eyebrow)} title={t(sections.openSource.title)}>
        {t(sections.openSource.subA)}{" "}
        <a href={socials.pubdev} target="_blank" rel="noreferrer" className="text-violet-400 hover:underline">
          ardev.dev
        </a>{" "}
        {t(sections.openSource.subB)}
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
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{t(pkg.blurb)}</p>
            <p className="mt-5 font-mono text-xs text-cyan">{t(pkg.meta)}</p>
          </motion.a>
        ))}
      </div>

      {/* شريط المقياس — أرقام حقيقية من جرد المشاريع + GitHub */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 overflow-hidden rounded-3xl border border-line bg-ink-800/40"
      >
        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {scale.map((s) => (
            <div key={s.label.en} className="bg-ink-900/60 px-5 py-6 text-center">
              <div className="font-display text-3xl font-bold text-gradient">{t(s.value)}</div>
              <div className="mt-1 text-xs text-fg-muted">{t(s.label)}</div>
            </div>
          ))}
        </div>
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center gap-2 border-t border-line py-4 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          <GithubIcon size={16} /> {socials.githubHandle}
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
