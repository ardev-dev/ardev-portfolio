"use client";

import { motion } from "framer-motion";
import { profile, skillGroups } from "@/lib/data";
import { Shell, PageHead } from "@/components/site/pages/Shell";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

export function MethodPage() {
  const { t } = useLang();
  const lifecycle = skillGroups.find((g) => g.title.en === "Lifecycle");
  const rest = skillGroups.filter((g) => g.title.en !== "Lifecycle");

  return (
    <Shell>
      <PageHead
        title={
          <>
            {t({ en: "The", ar: "المنهج" })} <Em>{t({ en: "method", ar: "أوّلاً" })}</Em>
          </>
        }
        desc={t({
          en: "Technologies are evidence of range, not identity.",
          ar: "التقنيات دليل اتّساع، لا هويّة.",
        })}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="mt-8 max-w-3xl text-[15px] leading-relaxed text-fg"
      >
        {t(profile.about)}
      </motion.p>

      {lifecycle && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-x-1 gap-y-2"
        >
          {lifecycle.items.map((s, i) => (
            <span key={s.en} className="flex items-center gap-1">
              <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12px] text-ink">
                {t(s)}
              </span>
              {i < lifecycle.items.length - 1 && <span className="px-1 text-fg-faint">·</span>}
            </span>
          ))}
        </motion.div>
      )}

      <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((g, i) => (
          <motion.div
            key={g.title.en}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: EASE }}
          >
            <h3 className="text-[13px] text-ink">{t(g.title)}</h3>
            <div className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1">
              {g.items.map((c) => (
                <span key={c.en} className="font-mono text-[11px] text-fg-muted">
                  {t(c)}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}
