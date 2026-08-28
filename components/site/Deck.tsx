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
  // نلتقط عند بداية اللمسة سياقَها كاملاً: أين بدأت، وداخل أي حاوية قابلة
  // للتمرير، وعند أي موضع تمرير — كلّها لازمة للتفريق بين "تمرير المحتوى"
  // و"قلب الشريحة".
  const touch = useRef<{ y: number; at: number; scroller: HTMLElement | null; top: number } | null>(null);

  useEffect(() => {
    if (!mounted) return;

    /** الحاوية القابلة للتمرير التي تحوي هدف الحدث، إن كان لها فائض فعلي. */
    const scrollerOf = (target: EventTarget | null): HTMLElement | null => {
      const el = (target as HTMLElement)?.closest?.("[data-scroll]") as HTMLElement | null;
      return el && el.scrollHeight - el.clientHeight > 4 ? el : null;
    };

    /** هل بقي في الحاوية مجال للتمرير في هذا الاتجاه؟ */
    const canScroll = (el: HTMLElement, down: boolean) =>
      down ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2;

    const onWheel = (e: WheelEvent) => {
      // التمرير الداخلي أولاً (صفحة أطول من الشاشة)
      const scroller = scrollerOf(e.target);
      if (scroller && canScroll(scroller, e.deltaY > 0)) return;
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

    const onTouchStart = (e: TouchEvent) => {
      const scroller = scrollerOf(e.target);
      touch.current = {
        y: e.touches[0]?.clientY ?? 0,
        at: Date.now(),
        scroller,
        top: scroller?.scrollTop ?? 0,
      };
    };

    const onTouchEnd = (e: TouchEvent) => {
      const t0 = touch.current;
      touch.current = null;
      if (!t0) return;

      const dy = t0.y - (e.changedTouches[0]?.clientY ?? t0.y);
      if (Math.abs(dy) < 70) return;
      const down = dy > 0;

      if (t0.scroller) {
        // تحرّك المحتوى فعلاً أثناء اللمسة → كان يقرأ لا يقلب صفحة.
        if (Math.abs(t0.scroller.scrollTop - t0.top) > 2) return;
        // ما زال في الحاوية مجال في هذا الاتجاه → التمرير من حقّها لا من حقّ السطح.
        if (canScroll(t0.scroller, down)) return;
      }

      step(down ? 1 : -1);
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
            data-active={mounted ? (i === index ? "true" : "false") : undefined}
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
          <div dir="ltr" className="glass-bar fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full px-2 py-2">
            <button
              onClick={() => step(-1)}
              disabled={index === 0}
              aria-label={t({ en: "Previous", ar: "السابق" })}
              className="glass grid h-10 w-10 place-items-center rounded-full text-fg transition-all hover:scale-105 hover:text-ink disabled:opacity-25 disabled:hover:scale-100"
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
              className="glass grid h-10 w-10 place-items-center rounded-full text-fg transition-all hover:scale-105 hover:text-ink disabled:opacity-25 disabled:hover:scale-100"
            >
              <ArrowDown size={14} />
            </button>
          </div>
        </>
      )}
    </main>
  );
}
