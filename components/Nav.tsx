"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { socials, ui, type L } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const links: { label: L; href: string }[] = [
  { label: { en: "Capabilities", ar: "القدرات" }, href: "#capabilities" },
  { label: { en: "Work", ar: "الأعمال" }, href: "#work" },
  { label: { en: "Open Source", ar: "مفتوح المصدر" }, href: "#open-source" },
  { label: { en: "Experience", ar: "الخبرة" }, href: "#experience" },
];

export function Nav() {
  const { t, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3">
      <div
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-3 py-2 transition-all duration-300",
          scrolled ? "border border-white/10 bg-bg-900/70 shadow-card backdrop-blur-xl" : "border border-transparent"
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5 ps-1">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-grad text-sm font-bold text-bg-900 shadow-btn">
            AR
          </span>
          <span className="font-mono text-sm text-fg transition-colors group-hover:text-ink">ardev.dev</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm text-fg transition-colors hover:text-ink"
            >
              {t(l.label)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-fg transition-colors hover:text-ink"
            aria-label="Switch language"
          >
            {t(ui.langLabel)}
          </button>
          <a
            href={socials.email}
            className="btn-primary hidden rounded-xl px-4 py-2 text-sm font-semibold text-white sm:inline-block"
          >
            {t(ui.getInTouch)}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-ink md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-2xl border border-white/10 bg-bg-900/90 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-fg hover:bg-white/5 hover:text-ink"
              >
                {t(l.label)}
              </a>
            ))}
            <a
              href={socials.email}
              onClick={() => setOpen(false)}
              className="btn-primary mt-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              {t(ui.getInTouch)}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
