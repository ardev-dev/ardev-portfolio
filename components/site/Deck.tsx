"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import type { L } from "@/lib/data";

export type Page = { id: string; label: L; node: ReactNode };

const EASE = [0.22, 1, 0.36, 1] as const;
const LOCK_MS = 780; // زمن الانتقال + هامش، يمنع القفز صفحتين بلفّة واحدة

/**
 * سطح شرائح بملء الشاشة: كل قسم صفحة مستقلّة تُقلَب بالعجلة أو اللمس أو المفاتيح.
 *
 * قاعدة السلامة: قبل أن يُركّب React (أو إن تعطّل JS) تُعرض كل الصفحات مكدّسة
 * وقابلة للتمرير عاديّاً — فلا يفقد أحد المحتوى، ولا تعتمد قراءة الموقع على JS.
 */
export function Deck({ pages }: { pages: Page[] }) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const { t, dir: rtl } = useLang();

  const locked = useRef(false);
  const touchY = useRef<number | null>(null);

  const go = useCallback(
    (next: number, direction: number) => {
      const clamped = Math.max(0, Math.min(pages.length - 1, next));
      setIndex((cur) => {
        if (clamped === cur) return cur;
        setDir(direction);
        // الرابط يعكس الصفحة الحالية فتصبح كل شريحة قابلة للمشاركة.
        history.replaceState(null, "", `#${pages[clamped]!.id}`);
        return clamped;
      });
    },
    [pages]
  );

  const step = useCallback(
    (delta: number) => {
      if (locked.current) return;
      locked.current = true;
      setTimeout(() => (locked.current = false), LOCK_MS);
      go(index + delta, delta);
    },
    [go, index]
  );

  useEffect(() => setMounted(true), []);

  // الصفحة المطلوبة في الرابط عند الفتح
  useEffect(() => {
    if (!mounted) return;
    const id = location.hash.slice(1);
    const i = pages.findIndex((p) => p.id === id);
    if (i > 0) setIndex(i);
  }, [mounted, pages]);

  useEffect(() => {
    if (!mounted) return;

    const onWheel = (e: WheelEvent) => {
      // نترك التمرير الداخلي يعمل داخل العناصر القابلة للتمرير (صفحة طويلة على جوّال)
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
      const k = e.key;
      if (["ArrowDown", "PageDown", " ", "ArrowRight"].includes(k)) {
        e.preventDefault();
        step(1);
      } else if (["ArrowUp", "PageUp", "ArrowLeft"].includes(k)) {
        e.preventDefault();
        step(-1);
      } else if (k === "Home") go(0, -1);
      else if (k === "End") go(pages.length - 1, 1);
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

  // القياس يقرأ التقدّم من هنا: في سطح الشرائح لا يوجد "عمق تمرير".
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.dataset.deck = "1";
    root.dataset.deckProgress = String(Math.round(((index + 1) / pages.length) * 100));
    root.dataset.deckPage = pages[index]?.id ?? "";
  }, [mounted, index, pages]);

  /**
   * كل الصفحات تبقى مُركّبة في DOM ونُزيح الشريط كاملاً — لا تبديل ولا انتظار
   * حركة خروج. مكسبان: انتقال حتمي لا يعتمد على اكتمال حركة سابقة، ومحتوى
   * كامل يقرأه محرّك البحث وقارئ الشاشة بدل صفحة واحدة.
   */
  return (
    <main className={cn("inset-0", mounted ? "fixed overflow-hidden" : "relative")}>
      <div
        className={cn("h-full w-full", mounted && "will-change-transform")}
        style={
          mounted
            ? {
                transform: `translate3d(0, ${-index * 100}%, 0)`,
                transition: reduce ? "none" : `transform 0.72s cubic-bezier(${EASE.join(",")})`,
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
                    transition: reduce ? "none" : "opacity 0.5s ease, transform 0.72s cubic-bezier(0.22,1,0.36,1)",
                    pointerEvents: i === index ? "auto" : "none",
                  }
                : undefined
            }
          >
            {p.node}
          </section>
        ))}
      </div>

      {!mounted ? null : (
        <>

      {/* مؤشّر الصفحات */}
      <nav
        aria-label={t({ en: "Sections", ar: "الأقسام" })}
        className={cn("fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex", rtl === "rtl" ? "left-6" : "right-6")}
      >
        {pages.map((p, i) => (
          <button
            key={p.id}
            onClick={() => go(i, i > index ? 1 : -1)}
            aria-label={t(p.label)}
            aria-current={i === index}
            className="group flex items-center gap-2.5"
          >
            <span
              className={cn(
                "text-[10px] uppercase tracking-wider transition-all",
                i === index ? "text-ink opacity-100" : "text-fg-faint opacity-0 group-hover:opacity-100"
              )}
            >
              {t(p.label)}
            </span>
            <span
              className={cn(
                "h-px transition-all duration-500",
                i === index ? "w-7 bg-ink" : "w-3.5 bg-white/25 group-hover:w-5 group-hover:bg-white/50"
              )}
            />
          </button>
        ))}
      </nav>

      {/* العدّاد وأزرار القلب */}
      <div dir="ltr" className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4">
        <button
          onClick={() => step(-1)}
          disabled={index === 0}
          aria-label={t({ en: "Previous", ar: "السابق" })}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-fg backdrop-blur-xl transition-colors hover:text-ink disabled:opacity-25"
        >
          <ArrowUp size={14} />
        </button>
        <span className="font-mono text-[11px] text-fg-muted" dir="ltr">
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
