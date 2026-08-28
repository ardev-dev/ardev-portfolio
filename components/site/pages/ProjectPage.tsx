"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { Shell } from "@/components/site/pages/Shell";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function Phones({ shots, name }: { shots: string[]; name: string }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {shots.slice(0, 3).map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, y: 40, rotate: i === 0 ? -3 : i === 2 ? 3 : 0 }}
          animate={{ opacity: 1, y: 0, rotate: i === 0 ? -3 : i === 2 ? 3 : 0 }}
          transition={{ duration: 0.85, delay: 0.15 + i * 0.09, ease: EASE }}
          className={cn(
            "w-[33%] max-w-[170px] shrink-0 lg:max-w-[190px]",
            i === 1 && "z-10 -mx-2 w-[36%] max-w-[185px] lg:max-w-[205px]",
            i === 2 && "hidden md:block"
          )}
        >
          <div className="overflow-hidden rounded-[22px] border border-white/12 bg-black p-[5px] shadow-lift">
            <Image
              src={s}
              alt={`${name} — ${i + 1}`}
              width={626}
              height={1354}
              sizes="210px"
              priority={i === 0}
              className="h-auto w-full rounded-[17px]"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BrowserShot({ src, alt, host }: { src: string; alt: string; host?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
      className="window overflow-hidden rounded-xl"
    >
      <div className="window-bar flex items-center gap-1.5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        {host && (
          <span className="mx-auto font-mono text-[11px] text-fg-faint" dir="ltr">
            {host}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover object-top" />
      </div>
    </motion.div>
  );
}

export function ProjectPage({ p, index, total }: { p: Project; index: number; total: number }) {
  const { t, lang } = useLang();
  const title = lang === "ar" && p.nameAr ? p.nameAr : p.name;

  return (
    <Shell>
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="flex items-center gap-3 font-mono text-[11px] text-fg-faint" dir="ltr">
            <span>
              {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-white/15" />
            <span>{p.year}</span>
          </div>

          <div className="mt-6 flex items-center gap-3.5">
            {p.icon && (
              <Image
                src={p.icon}
                alt=""
                width={52}
                height={52}
                className="rounded-[13px] border border-white/10"
              />
            )}
            <div>
              <h2 className="font-display text-display text-ink">{title}</h2>
              <p className="mt-0.5 text-[13px] text-fg-muted">{t(p.kind)}</p>
            </div>
          </div>

          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-fg">{t(p.blurb)}</p>

          {p.metrics && (
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {p.metrics.map((m) => (
                <div key={m.label.en}>
                  <dt className="font-display text-xl font-semibold text-ink" dir="ltr">
                    {m.value}
                  </dt>
                  <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-fg-muted">{t(m.label)}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-8 flex flex-wrap gap-1.5">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-fg-muted"
                dir="ltr"
              >
                {tag}
              </span>
            ))}
          </div>

          {p.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-5">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 border-b border-white/15 pb-0.5 text-sm text-ink transition-colors hover:border-white/60"
                >
                  {t(l.label)}
                  {/* السهم علامة "رابط خارجي" عالميّة — لا يُعكس في RTL. */}
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        <div className="min-w-0">
          {p.shots ? <Phones shots={p.shots} name={title} /> : p.cover ? (
            <BrowserShot src={p.cover} alt={title} host={p.links[0]?.href.replace(/^https?:\/\//, "")} />
          ) : (
            <div className="card grid aspect-[16/10] place-items-center rounded-xl">
              <span className="font-serif text-5xl italic text-fg-faint">{p.name}</span>
            </div>
          )}
        </div>
      </div>
    </Shell>
  );
}
