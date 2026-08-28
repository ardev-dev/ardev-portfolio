"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { packages, roles } from "@/lib/data";
import { Shell, PageHead } from "@/components/site/pages/Shell";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

/** الخبرة والحزم المنشورة في صفحة واحدة: المسار ثم الدليل العام عليه. */
export function CraftPage() {
  const { t } = useLang();

  return (
    <Shell>
      <PageHead
        title={
          <>
            {t({ en: "Track", ar: "المسار" })} <Em>{t({ en: "record", ar: "والأثر" })}</Em>
          </>
        }
        desc={t({
          en: "Where I've owned systems — and what I've published in the open.",
          ar: "أين تولّيتُ أنظمة كاملة، وما نشرتُه للعموم.",
        })}
      />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-9">
          {roles.map((r, i) => (
            <motion.div
              key={r.company}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noreferrer" className="text-[15px] text-ink hover:underline">
                    {r.company}
                  </a>
                ) : (
                  <span className="text-[15px] text-ink">{r.company}</span>
                )}
                <span className="font-mono text-[11px] text-fg-faint">{t(r.period)}</span>
              </div>
              <h3 className="mt-1 text-[13px] text-fg">{t(r.title)}</h3>
              <ul className="mt-3 space-y-2">
                {r.points.map((pt) => (
                  <li key={pt.en} className="relative ps-4 text-[13px] leading-relaxed text-fg-muted">
                    <span className="absolute start-0 top-[9px] h-1 w-1 rounded-full bg-fg-faint" />
                    {t(pt)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint">
            {t({ en: "Published packages", ar: "حزم منشورة" })}
          </p>
          <div className="mt-5 space-y-3">
            {packages.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: EASE }}
                className="card card-hover group block rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[12.5px] text-ink" dir="ltr">
                    {p.name}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-fg-muted" dir="ltr">
                      {p.points}
                    </span>
                    <ArrowUpRight size={12} className="text-fg-faint transition-colors group-hover:text-ink" />
                  </span>
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-fg-muted">{t(p.blurb)}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
