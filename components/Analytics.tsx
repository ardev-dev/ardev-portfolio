"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { logEvent } from "firebase/analytics";
import { initAnalytics } from "@/lib/firebase";
import { startTracking } from "@/lib/tracker";
import { Consent, type ConsentState } from "@/components/Consent";

/**
 * يُشغّل طبقتَي القياس بعد الموافقة فقط — لا يُصيّر شيئاً ولا يؤخّر الرسم:
 *  · Firebase Analytics (GA4) للتقارير الجاهزة والاتجاهات.
 *  · متتبّع Firestore الخاص للتفاصيل الخام (IP، جهاز، مدّة جلسة، أقسام مقروءة).
 */
export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentState>(null);
  const onChange = useCallback((c: ConsentState) => setConsent(c), []);
  const stopped = useRef(false);

  useEffect(() => {
    if (consent !== "granted") return;

    let analytics: Awaited<ReturnType<typeof initAnalytics>> = null;
    let cancelled = false;

    void initAnalytics().then((a) => {
      if (!cancelled) analytics = a;
    });

    // القياس لا يجوز أن يُسقِط الموقع أبداً: أي عطب في المتتبّع يُبتلع هنا
    // بدل أن يصعد إلى شجرة React ويُظهر شاشة الخطأ للزائر.
    let stop: (() => void) | null = null;
    try {
      stop = startTracking((name, params) => {
        if (analytics) logEvent(analytics, name, params as never);
      }).stop;
    } catch (e) {
      console.error("[analytics] تعذّر بدء التتبّع:", e);
    }

    return () => {
      cancelled = true;
      if (stop && !stopped.current) {
        stopped.current = true;
        stop();
      }
    };
  }, [consent]);

  // لا نقيس زيارات المالك للوحة التحكّم — تلوّث الإحصاءات بلا فائدة.
  if (pathname?.startsWith("/dashboard")) return null;

  return <Consent onChange={onChange} />;
}
