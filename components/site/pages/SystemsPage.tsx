"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { moreProjects, projects } from "@/lib/data";
import { Shell, PageHead } from "@/components/site/pages/Shell";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

/** المشاريع التي لا لقطات لها + قائمة الأعمال الأخرى. */
export function SystemsPage({ slugs }: { slugs: string[] }) {
  const { t, lang } = useLang();
  const items = projects.filter((p) => slugs.includes(p.slug));

  return (
    <Shell>
      <PageHead
        title={
          <>
            {t({ en: "Other", ar: "أنظمة" })} <Em>{t({ en: "systems", ar: "أخرى" })}</Em>
          </>
        }
        desc={t({
          en: "Platforms and pipelines where the interesting part was never the interface.",
          ar: "منصّات وخطوط إنتاج لم تكن الواجهة يوماً هي الجزء الصعب فيها.",
        })}
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
            className="card card-hover rounded-2xl p-6"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-h2 text-ink">
                {lang === "ar" && p.nameAr ? p.nameAr : p.name}
              </h3>
              <span className="font-mono text-[11px] text-fg-faint">{p.year}</span>
            </div>
            <p className="mt-1 text-[12.5px] text-fg-muted">{t(p.kind)}</p>
            <p className="mt-4 text-[13.5px] leading-relaxed text-fg">{t(p.blurb)}</p>

            {p.metrics && (
              <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {p.metrics.map((m) => (
                  <div key={m.label.en}>
                    <dt className="font-display text-lg font-semibold text-ink" dir="ltr">
                      {m.value}
                    </dt>
                    <dd className="mt-0.5 text-[10px] uppercase tracking-wider text-fg-muted">{t(m.label)}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] text-fg-muted"
                  dir="ltr"
                >
                  {tag}
                </span>
              ))}
            </div>

            {p.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-4">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-[13px] text-ink"
                  >
                    {t(l.label)}
                    <ArrowUpRight size={12} className="transition-transform group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
        className="mt-10 border-t border-white/[0.07] pt-8"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint">
          {t({ en: "Also built", ar: "وأيضاً" })}
        </p>
        <div className="mt-5 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {moreProjects.map((m) => (
            <div key={m.name} className="flex items-baseline justify-between gap-3 border-b border-white/[0.05] py-2.5">
              <span className="text-[13px] text-ink" dir="ltr">
                {m.name}
              </span>
              <span className="shrink-0 text-[11px] text-fg-muted">{t(m.kind)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </Shell>
  );
}
