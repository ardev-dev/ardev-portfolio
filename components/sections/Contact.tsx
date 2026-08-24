"use client";

import { heads, profile, socials, ui } from "@/lib/data";
import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <Reveal>
        <div className="text-center">
          <p className="eyebrow font-mono text-xs uppercase text-accent">{t(heads.contact)}</p>
          <h2 className="mx-auto mt-5 max-w-lg font-display text-display text-heading text-balance">
            {t(ui.ctaTitleA)} <span className="text-accent">{t(ui.ctaTitleB)}</span>
          </h2>
          <a
            href={socials.email}
            className="link-underline mt-8 inline-block font-mono text-lg text-heading"
          >
            {profile.email}
          </a>
          <p className="mt-16 font-mono text-xs text-faint">
            © {new Date().getFullYear()} {t(profile.name)} · {t(profile.location)}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
