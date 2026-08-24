"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { moreProjects, projects, sections, ui, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/Section";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const accentRing: Record<string, string> = {
  violet: "hover:shadow-glow",
  cyan: "hover:shadow-glow-cyan",
  pink: "hover:shadow-lift",
};

function Card({ project }: { project: Project }) {
  const { t } = useLang();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "card-glow group relative flex h-full flex-col rounded-3xl border border-line bg-ink-800/60 p-6 transition-all duration-300 hover:-translate-y-1",
        accentRing[project.accent ?? "violet"]
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold text-fg">{project.name}</h3>
          <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-violet">{t(project.kind)}</p>
        </div>
        {project.featured && (
          <span className="shrink-0 rounded-full border border-violet/30 bg-violet-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-violet-400">
            {t(ui.flagship)}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-fg-muted">{t(project.blurb)}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-xs text-fg-muted">
            {tag}
          </span>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-4 pt-6">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 text-sm font-medium text-fg transition-colors hover:text-violet-400"
            >
              {t(l.label)}
              <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export function Work() {
  const { t } = useLang();

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading index="01" eyebrow={t(sections.work.eyebrow)} title={t(sections.work.title)}>
        {t(sections.work.subtitle)}
      </SectionHeading>

      {/* شبكة موحّدة 3×3 — متوازنة بصرياً */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.name} project={p} />
        ))}
      </div>

      {/* المزيد — بطاقات مُدمجة لبقية المشاريع */}
      <div className="mt-14">
        <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-fg-faint">
          {t(ui.moreWork)}
          <span className="h-px flex-1 bg-line" />
        </h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex h-full flex-col rounded-2xl border border-line bg-ink-800/40 p-4 transition-colors hover:border-violet/40 hover:bg-white/5"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="font-display text-base font-bold text-fg">{p.name}</h4>
                <span className="shrink-0 font-mono text-[11px] text-violet-400">{t(p.kind)}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span key={tag} className="rounded bg-white/[0.04] px-2 py-0.5 text-[11px] text-fg-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
