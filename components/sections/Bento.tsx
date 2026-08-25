"use client";

import { ArrowRight } from "lucide-react";
import { sections, skillGroups, type SkillGroup } from "@/lib/data";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/components/LanguageProvider";

function byTitle(en: string): SkillGroup {
  return skillGroups.find((g) => g.title.en === en) ?? skillGroups[0];
}

function Chips({ items }: { items: SkillGroup["items"] }) {
  const { t } = useLang();
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((c) => (
        <span key={c.en} className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-fg">
          {t(c)}
        </span>
      ))}
    </div>
  );
}

function Card({ children, span = false, delay = 0 }: { children: React.ReactNode; span?: boolean; delay?: number }) {
  return (
    <Reveal delay={delay} className={span ? "md:col-span-2" : ""}>
      <div className="card card-hover h-full rounded-3xl p-6 sm:p-7">{children}</div>
    </Reveal>
  );
}

export function Bento() {
  const { t } = useLang();
  const lifecycle = byTitle("Lifecycle");
  const payments = byTitle("Payments & Fintech");
  const backend = byTitle("Backend & Data");
  const web = byTitle("Web & Mobile");
  const realtime = byTitle("Real-Time & Platforms");

  return (
    <section id="capabilities" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <SectionHeading eyebrow={t(sections.skills.eyebrow)} title={t(sections.skills.title)}>
        {t(sections.skills.subtitle)}
      </SectionHeading>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Card span>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {t({ en: "End-to-end ownership", ar: "ملكية من الفكرة للتشغيل" })}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-ink">
            {t({ en: "I own the full lifecycle", ar: "أتولّى دورة الحياة كاملة" })}
          </h3>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {lifecycle.items.map((step, i) => (
              <span key={step.en} className="inline-flex items-center gap-2">
                <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-ink">
                  {t(step)}
                </span>
                {i < lifecycle.items.length - 1 && <ArrowRight size={13} className="text-fg-faint rtl:rotate-180" />}
              </span>
            ))}
          </div>
        </Card>

        <Card delay={0.05}>
          <h3 className="font-display text-lg font-bold text-ink">{t(payments.title)}</h3>
          <Chips items={payments.items} />
        </Card>

        <Card delay={0.1}>
          <h3 className="font-display text-lg font-bold text-ink">{t(backend.title)}</h3>
          <Chips items={backend.items} />
        </Card>

        <Card delay={0.15}>
          <h3 className="font-display text-lg font-bold text-ink">{t(web.title)}</h3>
          <Chips items={web.items} />
        </Card>

        <Card delay={0.2}>
          <h3 className="font-display text-lg font-bold text-ink">{t(realtime.title)}</h3>
          <Chips items={realtime.items} />
        </Card>
      </div>
    </section>
  );
}
