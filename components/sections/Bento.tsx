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
  const ai = byTitle("AI & Automation");

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

        <Card span delay={0.25}>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {t({ en: "Modern toolchain", ar: "أدوات حديثة" })}
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-ink">{t(ai.title)}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg">
            {t({
              en: "I use the latest AI tools — Claude Code, Cursor, Copilot — to accelerate delivery and automation, while holding a high bar for clean, tested, production-grade code.",
              ar: "أستخدم أحدث أدوات الذكاء الاصطناعي — Claude Code وCursor وCopilot — لتسريع التسليم والأتمتة، مع الحفاظ على معيار هندسي عالٍ لكود نظيف ومُختبَر وجاهز للإنتاج.",
            })}
          </p>
          <Chips items={ai.items} />
        </Card>

        <Card delay={0.3}>
          <h3 className="font-display text-lg font-bold text-ink">
            {t({ en: "Engineering bar", ar: "المعيار الهندسي" })}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-fg">
            {t({
              en: "Clean Architecture · SOLID · code review · production monitoring — a 50% cut in QA-filed defects.",
              ar: "معمارية نظيفة · SOLID · مراجعة كود · مراقبة إنتاج — خفض 50% في العيوب المُبلَّغة من الجودة.",
            })}
          </p>
        </Card>
      </div>
    </section>
  );
}
