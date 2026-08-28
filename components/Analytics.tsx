"use client";

import { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { initAnalytics } from "@/lib/firebase";
import { startTracking } from "@/lib/tracker";

/**
 * يُشغّل طبقتَي القياس بعد الترطيب فقط — لا يُصيّر شيئاً ولا يؤخّر الرسم:
 *  · Firebase Analytics (GA4) للتقارير الجاهزة والاتجاهات.
 *  · متتبّع Firestore الخاص للتفاصيل الخام (IP، جهاز، مدّة جلسة، أقسام مقروءة).
 */
export function Analytics() {
  useEffect(() => {
    let analytics: Awaited<ReturnType<typeof initAnalytics>> = null;
    let cancelled = false;

    void initAnalytics().then((a) => {
      if (!cancelled) analytics = a;
    });

    const { stop } = startTracking((name, params) => {
      if (analytics) logEvent(analytics, name, params as never);
    });

    return () => {
      cancelled = true;
      stop();
    };
  }, []);

  return null;
}
