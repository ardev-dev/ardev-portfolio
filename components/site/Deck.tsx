"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useDeck } from "@/components/site/DeckContext";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

/**
 * سطح شرائح بملء الشاشة: كل قسم صفحة تُقلَب بالعجلة أو اللمس أو المفاتيح.
 *
 * كل الصفحات تبقى مُركّبة ونُزيح الشريط كاملاً — لا انتظار حركة خروج، ومحتوى
 * كامل يقرأه محرّك البحث. وقبل التركيب تُعرض مكدّسة قابلة للتمرير، فلا تعتمد
 * قراءة الموقع على JS.
 */
export function Deck() {
  const { pages, index, mounted, go, step } = useDeck();
  const reduce = useReducedMotion();
  const { t } = useLang();
  const touchY = useRef<number | null>(null);

  useEffect(() => {
    if (!mounted) return;

    const onWheel = (e: WheelEvent) => {
      // التمرير الداخلي أولاً (صفحة أطول من الشاشة على الجوّال)
      const scroller = (e.target as HTMLElement)?.closest?.("[data-scroll]") as HTMLElement | null;
      if (scroller && scroller.scrollHeight > scroller.clientHeight) {
        const atTop = scroller.scrollTop <= 0;
        const atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atEnd)) return;
      }
      if (Math.abs(e.deltaY) < 12) return;
      e.preventDefault();
      step(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        step(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(pages.length - 1);
    };

    const onTouchStart = (e: TouchEvent) => (touchY.current = e.touches[0]?.clientY ?? null);
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY.current === null) return;
      const dy = touchY.current - (e.changedTouches[0]?.clientY ?? touchY.current);
      if (Math.abs(dy) > 60) step(dy > 0 ? 1 : -1);
      touchY.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [mounted, step, go, pages.length]);

  return (
    <main className={cn("inset-0", mounted ? "fixed overflow-hidden" : "relative")}>
      <div
        className={cn("h-full w-full", mounted && "will-change-transform")}
        style={
          mounted
            ? {
                transform: `translate3d(0, ${-index * 100}%, 0)`,
                transition: reduce ? "none" : `transform 0.72s ${EASE}`,
              }
            : undefined
        }
      >
        {pages.map((p, i) => (
          <section
            key={p.id}
            id={p.id}
            aria-hidden={mounted ? i !== index : undefined}
            className={cn("w-full", mounted ? "h-full" : "min-h-screen")}
            style={
              mounted
                ? {
                    opacity: i === index ? 1 : 0,
                    transform: i === index ? "none" : "scale(0.985)",
                    transition: reduce ? "none" : `opacity 0.5s ease, transform 0.72s ${EASE}`,
                    pointerEvents: i === index ? "auto" : "none",
                  }
                : undefined
            }
          >
            {p.node}
          </section>
        ))}
      </div>

      {mounted && (
        <>
          <div dir="ltr" className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4">
            <button
              onClick={() => step(-1)}
              disabled={index === 0}
              aria-label={t({ en: "Previous", ar: "السابق" })}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-fg backdrop-blur-xl transition-colors hover:text-ink disabled:opacity-25"
            >
              <ArrowUp size={14} />
            </button>
            <span className="font-mono text-[11px] text-fg-muted">
              {String(index + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => step(1)}
              disabled={index === pages.length - 1}
              aria-label={t({ en: "Next", ar: "التالي" })}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-fg backdrop-blur-xl transition-colors hover:text-ink disabled:opacity-25"
            >
              <ArrowDown size={14} />
            </button>
          </div>
        </>
      )}
    </main>
  );
}
