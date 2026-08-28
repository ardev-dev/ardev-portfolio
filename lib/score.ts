/**
 * ─── تقييم الجلسة ───────────────────────────────────────────────────────────
 * رقم واحد (0–100) يرتّب الزيارات بحسب احتمال أن تكون فرصة حقيقيّة.
 * يُستعمل في مكانين بنفس المنطق: الخادم (لتقرير إرسال تنبيه) واللوحة (للترتيب)،
 * فيُعرّف هنا مرّة واحدة بلا اعتماديّات على المتصفح أو Firestore.
 */

export type Scorable = {
  activeMs?: number;
  maxScrollPct?: number;
  sectionsSeen?: string[];
  eventCounts?: Record<string, number>;
  returning?: boolean;
  isBot?: boolean;
};

export type ScoreBreakdown = { total: number; reasons: string[] };

/** الوزن الأكبر للنيّة المُعلَنة (نقر التواصل)، ثم للانتباه، ثم للتكرار. */
export function scoreSession(v: Scorable): ScoreBreakdown {
  if (v.isBot) return { total: 0, reasons: ["بوت"] };

  const e = v.eventCounts ?? {};
  const reasons: string[] = [];
  let total = 0;

  const add = (points: number, why: string) => {
    if (points <= 0) return;
    total += points;
    reasons.push(why);
  };

  // انتباه: دقيقة نشطة كاملة تساوي السقف.
  const attention = Math.min((v.activeMs ?? 0) / 60_000, 1) * 30;
  add(Math.round(attention), `${Math.round((v.activeMs ?? 0) / 1000)}ث نشطة`);

  add(Math.round(((v.maxScrollPct ?? 0) / 100) * 15), `تمرير ${v.maxScrollPct ?? 0}%`);
  add(Math.min((v.sectionsSeen?.length ?? 0) * 3, 10), `${v.sectionsSeen?.length ?? 0} أقسام`);

  if (e.contact_email) add(25, "نقر البريد");
  if (e.outbound_click) add(10, "زار روابطك الخارجيّة");
  if (e.copy) add(5, "نسخ نصّاً");
  if (v.returning) add(10, "زائر عائد");

  return { total: Math.min(Math.round(total), 100), reasons };
}

/** العتبة التي تستحقّ تنبيهاً فوريّاً — نيّة واضحة، لا مجرّد تصفّح. */
export const ALERT_THRESHOLD = 55;

export function scoreLabel(total: number): { text: string; tone: "hot" | "warm" | "cold" } {
  if (total >= ALERT_THRESHOLD) return { text: "فرصة", tone: "hot" };
  if (total >= 25) return { text: "مهتمّ", tone: "warm" };
  return { text: "عابر", tone: "cold" };
}
