"use client";

import { profile, skillGroups } from "@/lib/data";
import { Shell, PageHead } from "@/components/site/pages/Shell";
import { Em } from "@/components/site/Em";
import { useLang } from "@/components/LanguageProvider";

export function MethodPage() {
  const { t } = useLang();
  const lifecycle = skillGroups.find((g) => g.title.en === "Lifecycle");
  const rest = skillGroups.filter((g) => g.title.en !== "Lifecycle");

  return (
    <Shell>
      <PageHead
        title={
          <>
            {t({ en: "The", ar: "المنهج" })} <Em>{t({ en: "method", ar: "أوّلاً" })}</Em>
          </>
        }
        desc={t({
          en: "Technologies are evidence of range, not identity.",
          ar: "التقنيات دليل اتّساع، لا هويّة.",
        })}
      />

      <p  className="anim mt-8 max-w-3xl text-[15px] leading-relaxed text-fg" style={{ "--d": "0.1s" } as React.CSSProperties}>
        {t(profile.about)}
      </p>

      {lifecycle && (
        <div  className="anim mt-10 flex flex-wrap items-center gap-x-1 gap-y-2" style={{ "--d": "0.2s" } as React.CSSProperties}>
          {lifecycle.items.map((s, i) => (
            <span key={s.en} className="flex items-center gap-1">
              <span className="glass rounded-full px-3.5 py-1.5 text-[12px] text-ink">
                {t(s)}
              </span>
              {i < lifecycle.items.length - 1 && <span className="px-1 text-fg-faint">·</span>}
            </span>
          ))}
        </div>
      )}

      <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((g, i) => (
          <div key={g.title.en} className="anim " style={{ "--d": "0.25s" } as React.CSSProperties}>
            <h3 className="text-[13px] text-ink">{t(g.title)}</h3>
            <div className="mt-2.5 flex flex-wrap gap-x-2.5 gap-y-1">
              {g.items.map((c) => (
                <span key={c.en} className="font-mono text-[11px] text-fg-muted">
                  {t(c)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}
