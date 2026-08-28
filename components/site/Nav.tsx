"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile, socials, ui, type L } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const links: { label: L; href: string }[] = [
  { label: { en: "Work", ar: "الأعمال" }, href: "#work" },
  { label: { en: "Info", ar: "عنّي" }, href: "#info" },
];

export function Nav() {
  const { t, toggle } = useLang();
  const [active, setActive] = useState("#work");
  const [open, setOpen] = useState(false);

  // القسم الظاهر يحدّد الحبّة النشطة — بمراقب واحد بدل حساب مواضع عند كل تمرير.
  useEffect(() => {
    const targets = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { threshold: [0.15, 0.5], rootMargin: "-20% 0px -50% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
        {/* الاسم — يقوم مقام الشعار، فالطباعة هي الهويّة */}
        <a href="#top" className="group leading-tight">
          <div className="text-[15px] font-medium tracking-tight text-ink">{t(profile.name)}</div>
          <div className="mt-0.5 text-[11px] text-fg-muted transition-colors group-hover:text-fg">{t(profile.role)}</div>
        </a>

        {/* حبّة التنقّل المركزيّة */}
        <nav className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 md:block">
          <div className="relative flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] p-1 backdrop-blur-xl">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="relative rounded-full px-4 py-1.5 text-[13px] text-fg transition-colors hover:text-ink">
                {active === l.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.09]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className={cn("relative", active === l.href && "text-ink")}>{t(l.label)}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-0.5 text-[13px] text-fg transition-colors hover:text-ink sm:inline-flex"
          >
            LinkedIn <ArrowUpRight size={13} />
          </a>
          <a
            href="/Abdulrahman-Morshed-CV.pdf"
            target="_blank"
            className="hidden items-center gap-0.5 text-[13px] text-fg transition-colors hover:text-ink sm:inline-flex"
          >
            {t({ en: "Resume", ar: "السيرة" })} <ArrowUpRight size={13} />
          </a>
          <button
            onClick={toggle}
            className="hidden text-[13px] text-fg transition-colors hover:text-ink sm:block"
            aria-label="Switch language"
          >
            {t(ui.langLabel)}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-ink md:hidden"
            aria-label="Menu"
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
            className="mx-5 flex flex-col gap-1 rounded-2xl border border-white/[0.08] bg-bg-800/95 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-fg hover:bg-white/[0.05] hover:text-ink"
              >
                {t(l.label)}
              </a>
            ))}
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="rounded-xl px-3 py-2.5 text-sm text-fg">
              LinkedIn
            </a>
            <a href="/Abdulrahman-Morshed-CV.pdf"
            target="_blank" className="rounded-xl px-3 py-2.5 text-sm text-fg">
              {t({ en: "Resume", ar: "السيرة" })}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
