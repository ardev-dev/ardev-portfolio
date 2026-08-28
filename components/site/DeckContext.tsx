"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { L } from "@/lib/data";

export type Page = { id: string; label: L; node: ReactNode };

type Ctx = {
  pages: Page[];
  index: number;
  mounted: boolean;
  go: (i: number) => void;
  step: (delta: number) => void;
};

const DeckCtx = createContext<Ctx | null>(null);
const LOCK_MS = 780; // زمن الانتقال + هامش، يمنع القفز صفحتين بلفّة واحدة

/**
 * حالة السطح مرفوعة فوق الشريط والشريحة معاً، حتى يعرض شريط التنقّل كل الأقسام
 * ويعرف أيّها نشط دون أن يُكرّر أحدهما مصدر الحقيقة.
 */
export function DeckProvider({ pages, children }: { pages: Page[]; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const locked = useRef(false);

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(pages.length - 1, next));
      setIndex((cur) => {
        if (clamped !== cur) history.replaceState(null, "", `#${pages[clamped]!.id}`);
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
      go(index + delta);
    },
    [go, index]
  );

  // الصفحة المطلوبة في الرابط عند الفتح
  useEffect(() => {
    if (!mounted) return;
    const i = pages.findIndex((p) => p.id === location.hash.slice(1));
    if (i > 0) setIndex(i);
  }, [mounted, pages]);

  // القياس يقرأ التقدّم من هنا: في سطح الشرائح لا يوجد "عمق تمرير".
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.dataset.deck = "1";
    root.dataset.deckProgress = String(Math.round(((index + 1) / pages.length) * 100));
    root.dataset.deckPage = pages[index]?.id ?? "";
  }, [mounted, index, pages]);

  return <DeckCtx.Provider value={{ pages, index, mounted, go, step }}>{children}</DeckCtx.Provider>;
}

export function useDeck() {
  const c = useContext(DeckCtx);
  if (!c) throw new Error("useDeck must be used within DeckProvider");
  return c;
}
