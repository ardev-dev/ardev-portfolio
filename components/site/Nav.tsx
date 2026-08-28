"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile, socials, ui } from "@/lib/data";
import { useDeck } from "@/components/site/DeckContext";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const CV = "/Abdulrahman-Morshed-CV.pdf";

export function Nav() {
  const { t, toggle } = useLang();
  const { pages, index, go } = useDeck();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
        {/* الاسم يقوم مقام الشعار — الطباعة هي الهويّة */}
        <button onClick={() => go(0)} className="group shrink-0 text-start leading-tight">
          <div className="text-[15px] font-medium tracking-tight text-ink">{t(profile.name)}</div>
          <div className="mt-0.5 hidden text-[11px] text-fg-muted transition-colors group-hover:text-fg sm:block">{t(profile.role)}</div>
        </button>

        {/* شريط الأقسام: كل الشرائح، والحبّة تنزلق إلى النشط */}
        <nav aria-label={t({ en: "Sections", ar: "الأقسام" })} className="hidden xl:block">
          <div className="glass-bar flex items-center gap-0.5 rounded-full p-1">
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => go(i)}
                aria-current={i === index}
                className="relative rounded-full px-3 py-1.5 text-[12.5px] text-fg transition-colors hover:text-ink"
              >
                {i === index && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.16] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={cn("relative whitespace-nowrap", i === index && "text-ink")}>{t(p.label)}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-0.5 text-[13px] text-fg transition-colors hover:text-ink sm:inline-flex"
          >
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a
            href={CV}
            target="_blank"
            className="hidden items-center gap-0.5 text-[13px] text-fg transition-colors hover:text-ink sm:inline-flex"
          >
            {t({ en: "Resume", ar: "السيرة" })} <ArrowUpRight size={13} />
          </a>
          <button onClick={toggle} className="text-[13px] text-fg transition-colors hover:text-ink" aria-label="Switch language">
            {t(ui.langLabel)}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="glass grid h-9 w-9 place-items-center rounded-full text-ink xl:hidden"
            aria-label={t({ en: "Menu", ar: "القائمة" })}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-5 grid grid-cols-2 gap-1 rounded-3xl p-3 sm:grid-cols-3 xl:hidden"
          >
            {pages.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  go(i);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-start text-[13px] transition-colors",
                  i === index ? "bg-white/[0.08] text-ink" : "text-fg hover:bg-white/[0.05] hover:text-ink"
                )}
              >
                {t(p.label)}
              </button>
            ))}
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="rounded-xl px-3 py-2.5 text-[13px] text-fg">
              LinkedIn
            </a>
            <a href={CV} target="_blank" className="rounded-xl px-3 py-2.5 text-[13px] text-fg">
              {t({ en: "Resume", ar: "السيرة" })}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
