"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/Section";
import { cn } from "@/lib/utils";

const accentRing: Record<string, string> = {
  violet: "group-hover:shadow-glow",
  cyan: "group-hover:shadow-glow-cyan",
  pink: "group-hover:shadow-lift",
};

function Card({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "card-glow group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-ink-800/60 p-6 transition-all duration-300 hover:-translate-y-1",
        accentRing[project.accent ?? "violet"],
        featured && "sm:p-8"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={cn("font-display font-bold text-fg", featured ? "text-2xl" : "text-xl")}>
            {project.name}
          </h3>
          <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-violet">{project.kind}</p>
        </div>
        {project.featured && (
          <span className="rounded-full border border-violet/30 bg-violet-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-violet-400">
            Flagship
          </span>
        )}
      </div>

      <p className={cn("mt-4 text-fg-muted", featured ? "text-[15px] leading-relaxed" : "text-sm leading-relaxed")}>
        {project.blurb}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-xs text-fg-muted">
            {t}
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
              {l.label}
              <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading index="01" eyebrow="Selected Work" title="Products I build & operate">
        Production systems shipped end-to-end — mobile, web, and backend — across consultation,
        real-estate, delivery, and financial domains.
      </SectionHeading>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {featured.map((p) => (
          <Card key={p.name} project={p} featured />
        ))}
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((p) => (
          <Card key={p.name} project={p} />
        ))}
      </div>
    </section>
  );
}
