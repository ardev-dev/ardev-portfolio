"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, profile, socials, ui } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

export function Nav() {
  const { t, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass shadow-card" : "border border-transparent"
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label={profile.brand}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-gradient font-display text-sm font-bold text-ink shadow-glow">
              AR
            </span>
            <span className="font-mono text-sm text-fg-muted transition-colors group-hover:text-fg">
              ardev.dev
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={cn(
                  "rounded-lg px-3.5 py-1.5 text-sm transition-colors",
                  active === n.href.slice(1) ? "text-fg" : "text-fg-muted hover:text-fg"
                )}
              >
                {t(n.label)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="rounded-xl border border-line bg-white/5 px-3 py-2 text-sm font-medium text-fg transition-colors hover:border-violet/50 hover:bg-white/10"
              aria-label="Switch language"
            >
              {t(ui.langLabel)}
            </button>
            <a
              href={socials.email}
              className="hidden rounded-xl bg-accent-gradient px-4 py-2 text-sm font-semibold text-ink shadow-glow transition-transform hover:scale-[1.03] active:scale-95 sm:inline-block"
            >
              {t(ui.getInTouch)}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-fg md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
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
              className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
            >
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-fg-muted hover:bg-white/5 hover:text-fg"
                >
                  {t(n.label)}
                </a>
              ))}
              <a
                href={socials.email}
                onClick={() => setOpen(false)}
                className="mt-1 rounded-lg bg-accent-gradient px-3 py-2.5 text-center text-sm font-semibold text-ink"
              >
                {t(ui.getInTouch)}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
