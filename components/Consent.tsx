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
      className="fixed bottom-4 z-[60] mx-4 max-w-[330px] rounded-2xl border border-white/[0.08] bg-bg-800/95 p-4 shadow-card backdrop-blur-xl ltr:left-4 rtl:right-4"
    >
      <p className="text-[12.5px] leading-relaxed text-fg">
        {t({
          en: "Analytics cookies — country, device, and which sections you read. No ads, nothing shared.",
          ar: "كوكيز تحليلية — الدولة والجهاز والأقسام المقروءة. بلا إعلانات ولا مشاركة.",
        })}
      </p>
      <div className="mt-3.5 flex flex-wrap gap-2">
        <button
          onClick={() => decide("granted")}
          className="btn-primary rounded-lg px-3.5 py-1.5 text-[12.5px] font-semibold"
        >
          {t({ en: "Accept", ar: "موافق" })}
        </button>
        <button
          onClick={() => decide("denied")}
          className="btn-ghost rounded-lg px-3.5 py-1.5 text-[12.5px] text-ink"
        >
          {t({ en: "Decline", ar: "أرفض" })}
        </button>
      </div>
    </div>
  );
}
