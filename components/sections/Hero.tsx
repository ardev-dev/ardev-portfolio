"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { profile, socials, stats } from "@/lib/data";
import { Counter } from "@/components/Counter";
import { GithubIcon } from "@/components/BrandIcons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pt-36 pb-16 sm:px-6 sm:pt-44">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
        {/* شارة الحالة */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3.5 py-1.5 text-xs text-fg-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {profile.status}
          </span>
        </motion.div>

        {/* الاسم */}
        <motion.h1
          variants={item}
          className="mt-6 font-display text-mega text-fg"
        >
          {profile.firstName}
          <span className="text-gradient">.</span>
        </motion.h1>

        {/* الدور */}
        <motion.p variants={item} className="mt-3 font-display text-display text-fg-muted">
          {profile.role}
        </motion.p>

        {/* الوصف */}
        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted text-balance">
          {profile.tagline}
        </motion.p>

        {/* أزرار */}
        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-2xl bg-accent-gradient px-5 py-3 text-sm font-semibold text-ink shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
          >
            View my work
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white/5 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-violet/50 hover:bg-white/10"
          >
            <GithubIcon size={16} /> GitHub
          </a>
          <a
            href={socials.email}
            className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white/5 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-cyan/50 hover:bg-white/10"
          >
            <Mail size={16} /> {profile.email}
          </a>
        </motion.div>

        {/* بطاقة الهوية الصغيرة */}
        <motion.p variants={item} className="mt-6 flex items-center gap-2 font-mono text-sm text-fg-faint">
          <Sparkles size={14} className="text-violet" />
          {profile.brand} · based in {profile.location}
        </motion.p>
      </motion.div>

      {/* الإحصاءات */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={item} className="bg-ink-900/80 px-5 py-6">
            <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-xs text-fg-muted sm:text-sm">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
