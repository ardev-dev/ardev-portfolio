"use client";

import { ArrowUpRight } from "lucide-react";
import { heads, moreProjects, projects, sections, socials, ui, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { GithubIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

function Card({ project, delay }: { project: Project; delay: number }) {
  const { t } = useLang();
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={cn(
          "card card-hover group relative flex h-full flex-col rounded-2xl p-6",
          project.featured && "ring-1 ring-accent/25"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold text-ink">{project.name}</h3>
            <p className="mt-0.5 font-mono text-xs text-accent">{t(project.kind)}</p>
          </div>
          {project.featured && (
            <span className="shrink-0 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-accent">
              {t(ui.flagship)}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-fg">{t(project.blurb)}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-fg-muted">
              {tag}
            </span>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-4 pt-5">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group/l inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                {t(l.label)}
                <ArrowUpRight size={13} className="transition-transform group-hover/l:translate-x-0.5 group-hover/l:-translate-y-0.5" />
              </a>
            ))}
          </div>
        )}
      </article>
    </Reveal>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <SectionHeading eyebrow={t(sections.work.eyebrow)} title={t(sections.work.title)}>
        {t(sections.work.subtitle)}
      </SectionHeading>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Card key={p.name} project={p} delay={(i % 3) * 0.06} />
        ))}
      </div>

      <Reveal>
        <div className="card mt-4 rounded-2xl p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">{t(heads.more)}</p>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-accent-violet"
            >
              <GithubIcon size={14} /> {t(heads.viewGithub)}
            </a>
          </div>
          <div className="mt-5 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((p) => (
              <div key={p.name} className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] py-2.5">
                <span className="text-sm text-ink">{p.name}</span>
                <span className="shrink-0 font-mono text-[11px] text-fg-muted">{t(p.kind)}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
