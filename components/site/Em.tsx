"use client";

import type { ReactNode } from "react";
import { useLang } from "@/components/LanguageProvider";

/**
 * التوكيد داخل العناوين.
 * الإنجليزية: مائل بخطّ Instrument Serif — كما في المراجع.
 * العربية: لا يوجد مائل في الطباعة العربية، وخطّ الـserif اللاتيني لا يملك
 * حروفاً عربيّة أصلاً (فيسقط إلى خطّ آخر ويبدو كأنّه خطأ)، لذا نُوكّد بالتدرّج
 * المعدني ووزن أخفّ بدل الإمالة.
 */
export function Em({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { lang } = useLang();
  return lang === "ar" ? (
    <span className={`font-display font-normal text-grad ${className}`}>{children}</span>
  ) : (
    <span className={`font-serif italic ${className}`}>{children}</span>
  );
}
