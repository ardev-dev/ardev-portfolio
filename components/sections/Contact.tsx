"use client";

import { motion } from "framer-motion";
import { Mail, Package } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

const links = [
  { label: "Email", value: profile.email, href: socials.email, Icon: Mail },
  { label: "GitHub", value: socials.githubHandle, href: socials.github, Icon: GithubIcon },
  { label: "pub.dev", value: socials.pubdevHandle, href: socials.pubdev, Icon: Package },
  { label: "LinkedIn", value: socials.linkedinHandle, href: socials.linkedin, Icon: LinkedinIcon },
];

export function Contact() {
  return (
    <footer id="contact" className="relative scroll-mt-24 px-4 pb-14 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rule-glow mb-16 h-px w-full" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet">Let&apos;s build</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-h2 text-fg text-balance">
            Have a system worth building right? <span className="text-gradient">Let&apos;s talk.</span>
          </h2>
          <a
            href={socials.email}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent-gradient px-6 py-3.5 text-sm font-semibold text-ink shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Mail size={16} /> {profile.email}
          </a>
        </motion.div>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(({ label, value, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-line bg-ink-800/40 px-4 py-3.5 transition-colors hover:border-violet/40 hover:bg-white/5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-fg-muted transition-colors group-hover:text-violet-400">
                <Icon size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-fg-faint">{label}</span>
                <span className="block truncate font-mono text-sm text-fg">{value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-sm text-fg-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Framer Motion.
          </p>
          <p className="font-mono">{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
