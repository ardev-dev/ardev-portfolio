"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LanguageProvider";

const KEY = "ardev_consent";
export type ConsentState = "granted" | "denied" | null;

/** يقرأ الاختيار المحفوظ — null يعني أن الزائر لم يُسأل بعد. */
export function readConsent(): ConsentState {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null; // التخزين محجوب (تصفّح خاص) → نسأل ولا نفترض الموافقة
  }
}

/**
 * لافتة موافقة على القياس. لا يبدأ أي تتبّع ولا تُضبط أي كوكي قبل "موافق" —
 * هذا هو الترتيب الذي يتطلّبه GDPR فعليّاً (الموافقة قبل الجمع، لا بعده).
 */
export function Consent({ onChange }: { onChange: (state: ConsentState) => void }) {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) onChange(saved);
    else setVisible(true);
  }, [onChange]);

  const decide = (state: Exclude<ConsentState, null>) => {
    try {
      localStorage.setItem(KEY, state);
    } catch {}
    setVisible(false);
    onChange(state);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t({ en: "Privacy", ar: "الخصوصية" })}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-white/10 bg-bg-900/95 p-4 shadow-card backdrop-blur-xl sm:p-5"
    >
      <p className="text-sm leading-relaxed text-fg">
        {t({
          en: "I use analytics cookies to see how this site is found and read — visit time, country, device, and which sections you read. No ads, no third-party sharing.",
          ar: "أستخدم كوكيز تحليلية لأعرف كيف يُكتشف هذا الموقع ويُقرأ — وقت الزيارة والدولة والجهاز والأقسام المقروءة. بلا إعلانات ولا مشاركة مع أطراف أخرى.",
        })}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => decide("granted")}
          className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold text-white"
        >
          {t({ en: "Accept", ar: "موافق" })}
        </button>
        <button
          onClick={() => decide("denied")}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-white/20 hover:bg-white/[0.08]"
        >
          {t({ en: "Decline", ar: "أرفض" })}
        </button>
      </div>
    </div>
  );
}
