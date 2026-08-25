"use client";

import { useEffect, useState } from "react";
import { Mail, Package } from "lucide-react";
import { nav, profile, socials, ui } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: socials.github, Icon: GithubIcon, label: "GitHub" },
  { href: socials.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
  { href: socials.pubdev, Icon: Package, label: "pub.dev" },
  { href: socials.email, Icon: Mail, label: "Email" },
];

export function Sidebar() {
  const { t, toggle } = useLang();
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24 pt-24 pb-10">
      <div>
        {/* الاسم والدور */}
        <p className="eyebrow font-mono text-xs uppercase text-accent">{profile.brand}</p>
        <h1 className="mt-3 font-display text-mega text-heading">{t(profile.name)}</h1>
        <p className="mt-4 font-display text-xl font-semibold text-body sm:text-2xl">{t(profile.role)}</p>
        <p className="mt-5 max-w-xs text-body leading-relaxed">{t(profile.tagline)}</p>

        {/* التنقّل — يُبرز القسم الحالي */}
        <nav className="mt-16 hidden lg:block" aria-label="In-page">
          <ul className="flex flex-col gap-1">
            {nav.map((n) => {
              const on = active === n.href.slice(1);
              return (
                <li key={n.href}>
                  <a href={n.href} className="group flex items-center py-2">
                    <span
                      className={cn(
                        "me-4 h-px transition-all duration-300",
                        on ? "w-16 bg-heading" : "w-8 bg-faint group-hover:w-16 group-hover:bg-heading"
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-xs uppercase tracking-[0.18em] transition-colors",
                        on ? "text-heading" : "text-faint group-hover:text-heading"
                      )}
                    >
                      {t(n.label)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* الروابط + تبديل اللغة */}
      <div className="mt-12 flex items-center gap-5 lg:mt-0">
        {socialLinks.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="text-faint transition-colors hover:text-accent"
          >
            <Icon size={20} />
          </a>
        ))}
        <span className="h-4 w-px bg-line" />
        <button
          onClick={toggle}
          className="font-mono text-xs uppercase tracking-widest text-faint transition-colors hover:text-accent"
          aria-label="Switch language"
        >
          {t(ui.langLabel)}
        </button>
      </div>
    </header>
  );
}
