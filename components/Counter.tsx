"use client";

import { useEffect, useRef, useState } from "react";

/** عدّاد يتصاعد من الصفر عند ظهوره — بـ IntersectionObserver خام + احتياط زمني يضمن بلوغ القيمة. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const s = performance.now();
      const d = 1300;
      const tick = (now: number) => {
        const p = Math.min((now - s) / d, 1);
        const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setN(Math.round(e * value));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const el = ref.current;
    const io = el
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              run();
              io?.disconnect();
            }
          },
          { rootMargin: "-20px" }
        )
      : null;
    if (el && io) io.observe(el);
    const fallback = setTimeout(run, 1200); // يضمن التشغيل حتى لو لم يُطلق IO
    return () => {
      io?.disconnect();
      clearTimeout(fallback);
    };
  }, [value]);

  return (
    <span ref={ref} dir="ltr" style={{ display: "inline-block", unicodeBidi: "isolate" }}>
      {n}
      {suffix}
    </span>
  );
}
