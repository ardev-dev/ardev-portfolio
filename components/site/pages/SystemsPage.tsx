"use client";

import { ArrowUpRight } from "lucide-react";
import { catalog, catalogStats } from "@/lib/data";
import { Shell, PageHead } from "@/components/site/pages/Shell";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";

/**
 * الفهرس الكامل للأعمال. صفحة طويلة عمداً — تمرّر داخلياً عبر Shell،
 * والغرض إظهار الاتّساع الحقيقي بدل عيّنة منه.
 */
export function SystemsPage() {
  const { t, lang } = useLang();

  return (
    <Shell wide>
      <PageHead
        title={
          <>
            {t({ en: "Everything", ar: "كل ما" })} <Em>{t({ en: "shipped", ar: "بنيتُه" })}</Em>
          </>
        }
        desc={t({
          en: "Six years of work, grouped by what it is rather than when it happened.",
          ar: "ستّ سنوات من العمل، مجموعة بحسب نوعها لا بحسب تاريخها.",
        })}
      />

      <dl
        className="anim mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-b border-white/[0.07] pb-8 sm:grid-cols-4"
        style={{ "--d": "0.05s" } as React.CSSProperties}
      >
        {catalogStats.map((s) => (
          <div key={s.label.en}>
            <dt className="font-display text-2xl font-semibold text-ink">
              <span dir="ltr">{s.value}</span>
            </dt>
            <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-fg-muted">{t(s.label)}</dd>
          </div>
        ))}
      </dl>

      {catalog.map((group, gi) => (
        <section
          key={group.id}
          className="anim mt-10"
          style={{ "--d": `${0.1 + gi * 0.05}s` } as React.CSSProperties}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="font-display text-h2 text-ink">{t(group.title)}</h3>
            <p className="text-[12.5px] text-fg-muted">{t(group.desc)}</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((w) => {
              const name = lang === "ar" && w.nameAr ? w.nameAr : w.name;
              const Card = w.href ? "a" : "div";
              return (
                <Card
                  key={w.name}
                  {...(w.href ? { href: w.href, target: "_blank", rel: "noreferrer" } : {})}
                  className="card card-hover group flex flex-col rounded-2xl p-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="flex items-center gap-1 font-display text-[15px] font-semibold text-ink">
                      {name}
                      {w.href && (
                        <ArrowUpRight
                          size={12}
                          className="text-fg-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      )}
                    </h4>
                    <span className="shrink-0 font-mono text-[10.5px] text-fg-faint" dir="ltr">
                      {lang === "ar" ? w.year.replace("Now", "الآن") : w.year}
                    </span>
                  </div>

                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-fg">{t(w.kind)}</p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {w.stack.map((s) => (
                      <span
                        key={s}
                        className="glass rounded-md px-1.5 py-0.5 font-mono text-[10px] text-fg-muted"
                        dir="ltr"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      ))}

    </Shell>
  );
}
