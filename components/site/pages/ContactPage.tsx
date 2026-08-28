"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { marquee, profile, socials } from "@/lib/data";
import { Shell } from "@/components/site/pages/Shell";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

const channels = [
  { label: "Email", href: socials.email, handle: profile.email },
  { label: "LinkedIn", href: socials.linkedin, handle: socials.linkedinHandle },
  { label: "GitHub", href: socials.github, handle: socials.githubHandle },
  { label: "pub.dev", href: socials.pubdev, handle: socials.pubdevHandle },
];

export function ContactPage() {
  const { t } = useLang();

  return (
    <Shell>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-faint">
          {t({ en: "Available for senior roles", ar: "متاح لأدوار هندسية أولى" })}
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-mega text-ink text-balance">
          {t({ en: "Have a system worth", ar: "لديك نظامٌ يستحقّ" })}{" "}
          <Em className="text-grad">{t({ en: "building right?", ar: "أن يُبنى بإتقان؟" })}</Em>
        </h2>

        <a
          href={socials.email}
          className="btn-primary mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
        >
          {t({ en: "Start a conversation", ar: "لنبدأ الحديث" })}
          <ArrowUpRight size={15} />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4"
      >
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="group bg-bg-900/80 px-5 py-6 transition-colors hover:bg-bg-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-ink" dir="ltr">
                {c.label}
              </span>
              <ArrowUpRight
                size={13}
                className="text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </div>
            <div className="mt-1.5 truncate font-mono text-[11px] text-fg-muted" dir="ltr">
              {c.handle}
            </div>
          </a>
        ))}
      </motion.div>

      {/* شريط التقنيات — يقفل الصفحة بإيقاع بصري بدل فراغ */}
      <div className="mask-fade-x mt-14 overflow-hidden">
        <div className="marquee-track flex animate-marquee items-center gap-9 pe-9">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={`${m}-${i}`} className="whitespace-nowrap font-mono text-[11px] text-fg-faint" dir="ltr">
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-fg-faint">
        <span>
          © {new Date().getFullYear()} {t(profile.name)}
        </span>
        <span>{t(profile.location)}</span>
      </div>
    </Shell>
  );
}
