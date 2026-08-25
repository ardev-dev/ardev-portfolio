"use client";

import { Mail, Package } from "lucide-react";
import { heads, profile, socials, ui } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

const icons = [
  { href: socials.email, Icon: Mail, label: "Email" },
  { href: socials.github, Icon: GithubIcon, label: "GitHub" },
  { href: socials.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
  { href: socials.pubdev, Icon: Package, label: "pub.dev" },
];

export function Contact() {
  const { t } = useLang();
  return (
    <footer id="contact" className="mx-auto max-w-5xl px-5 pb-16 pt-12">
      <Reveal>
        <div className="grad-border card relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(129,140,248,0.28),transparent_70%)]" />
          <p className="relative font-mono text-xs uppercase tracking-[0.22em] text-accent">{t(heads.contact)}</p>
          <h2 className="relative mx-auto mt-4 max-w-lg font-display text-display text-ink text-balance">
            {t(ui.ctaTitleA)} <span className="text-grad">{t(ui.ctaTitleB)}</span>
          </h2>
          <a
            href={socials.email}
            className="btn-primary relative mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
          >
            <Mail size={16} /> {profile.email}
          </a>
          <div className="relative mt-9 flex items-center justify-center gap-3">
            {icons.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-fg transition-colors hover:border-white/20 hover:text-ink"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-10 flex flex-col items-center justify-between gap-2 text-sm text-fg-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} {t(profile.name)} · {t(ui.builtWith)}
        </p>
        <p className="font-mono">{t(profile.location)}</p>
      </div>
    </footer>
  );
}
