"use client";

import { ArrowRight, Mail } from "lucide-react";
import { profile, socials, stats, ui } from "@/lib/data";
import { Counter } from "@/components/Counter";
import { GithubIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

export function Hero() {
  const { t } = useLang();
  const available = { en: "Available for senior roles", ar: "متاح لأدوار أولى" };

  return (
    <section id="top" className="relative mx-auto max-w-4xl px-5 pt-36 pb-16 text-center sm:pt-44">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-fg backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t(available)} · {t(profile.location)}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h1 className="mt-7 font-display text-mega text-ink">{t(profile.name)}</h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-3 font-display text-display text-grad">{t(profile.role)}</p>
      </Reveal>

      <Reveal delay={0.18}>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg text-balance">{t(profile.tagline)}</p>
        <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-fg-muted text-balance">{t(profile.positioning)}</p>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#work" className="btn-primary group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white">
            {t(ui.viewWork)}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
          </a>
          <a
            href={socials.email}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-white/20 hover:bg-white/[0.08]"
          >
            <Mail size={16} /> {t(ui.getInTouch)}
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-ink transition-colors hover:border-white/20 hover:bg-white/[0.08]"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.3} className="mt-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label.en} className="card card-hover rounded-2xl px-4 py-5">
              <div className="font-display text-3xl font-bold text-ink sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-xs text-fg">{t(s.label)}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
