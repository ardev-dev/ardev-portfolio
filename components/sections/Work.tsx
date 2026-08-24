"use client";

import { ArrowUpRight } from "lucide-react";
import { heads, moreProjects, projects, socials } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { Head } from "@/components/Head";
import { Reveal } from "@/components/Reveal";

export function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="scroll-mt-24 py-14 lg:py-20">
      <Head num="03." title={t(heads.work)} />

      <div className="flex flex-col">
        {projects.map((p) => (
          <Reveal key={p.name}>
            <div className="group -mx-4 rounded-xl p-4 transition-colors duration-200 hover:bg-white/[0.025]">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-heading transition-colors group-hover:text-accent">
                  {p.name}
                  {p.featured && <span className="h-1.5 w-1.5 rounded-full bg-accent" title="Flagship" />}
                </h3>
                <span className="shrink-0 font-mono text-xs text-faint">{t(p.kind)}</span>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-body">{t(p.blurb)}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-faint">
                      {tag}
                    </span>
                  ))}
                </div>
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-xs font-medium text-accent"
                  >
                    {t(l.label)} <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* المزيد — قائمة مُدمجة */}
      <div className="mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">{t(heads.more)}</p>
        <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {moreProjects.map((p) => (
            <div
              key={p.name}
              className="flex items-baseline justify-between gap-3 border-b border-line/60 py-2.5 transition-colors hover:border-accent/40"
            >
              <span className="text-sm text-heading">{p.name}</span>
              <span className="shrink-0 font-mono text-xs text-faint">{t(p.kind)}</span>
            </div>
          ))}
        </div>
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="link-underline mt-7 inline-flex items-center gap-1.5 font-mono text-sm text-accent"
        >
          {t(heads.viewGithub)} <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
