"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile, stats } from "@/lib/data";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

/** ظهور سطر-بسطر: القناع يقصّ الحرف قبل أن يصعد، فتبدو الكلمات كأنها تُطبع. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroPage() {
  const { t } = useLang();

  return (
    <div className="flex h-full w-full items-center px-4 pt-20 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto w-full max-w-[1180px]"
      >
        <div className="window overflow-hidden rounded-2xl">
          <div className="window-bar flex items-center gap-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="mx-auto hidden font-mono text-[11px] text-fg-faint sm:block" dir="ltr">
              ardev.dev
            </span>
          </div>

          <div className="relative isolate px-6 py-12 sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_70%)]" />

            <h1 className="font-display text-mega text-ink">
              <Line delay={0.15}>
                <span className="text-grad">{t({ en: "I engineer systems,", ar: "أبني أنظمةً" })}</span>
              </Line>
              <Line delay={0.28}>
                <span className="text-grad">{t({ en: "products &", ar: "ومنتجاتٍ" })}</span>{" "}
                <Em className="text-shine">{t({ en: "scale.", ar: "تصمد وتكبر." })}</Em>
              </Line>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              className="mt-10 flex flex-col gap-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-sm text-[15px] leading-relaxed text-fg">
                {t({
                  en: "Senior Software Engineer & Technical Lead at Somow — six years owning products end-to-end.",
                  ar: "مهندس برمجيات أوّل وقائد تقني في سُمو — ستّ سنوات أملك فيها المنتج من فكرته إلى تشغيله.",
                })}
              </p>
              <p className="text-[13px] text-fg-muted">
                {t(profile.location)}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.95, ease: EASE }}
          className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label.en} className="bg-bg-900/80 px-5 py-5 text-center">
              <div className="font-display text-2xl font-semibold text-ink" dir="ltr">
                {s.value}
                {s.suffix}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-fg-muted">{t(s.label)}</div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-8 flex items-center justify-center gap-2 text-[11px] text-fg-faint"
        >
          <ArrowDown size={13} className="animate-scroll-cue" />
          {t({ en: "Scroll or use arrow keys", ar: "مرّر أو استخدم الأسهم" })}
        </motion.p>
      </motion.div>
    </div>
  );
}
