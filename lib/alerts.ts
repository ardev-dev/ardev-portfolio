/**
 * ─── تنبيه الفرص ────────────────────────────────────────────────────────────
 * حين تتجاوز جلسةٌ عتبةَ الاهتمام، يصل إشعار فوري بدل انتظار فتح اللوحة.
 * القناة اختياريّة بالكامل: بلا إعداد يبقى التنبيه مسجّلاً في الوثيقة فقط.
 */
import "server-only";

export type AlertInput = {
  score: number;
  reasons: string[];
  city?: string;
  country?: string;
  org?: string;
  referrer?: string;
  device?: string;
  activeMs?: number;
  sessionId: string;
};

function body(a: AlertInput): string {
  const where = [a.city, a.country].filter(Boolean).join("، ") || "مكان غير معروف";
  const lines = [
    `🔥 زيارة تستحقّ الانتباه — ${a.score}/100`,
    `المكان: ${where}${a.org ? ` · ${a.org}` : ""}`,
    `المصدر: ${a.referrer || "مباشر"} · ${a.device ?? ""}`,
    `الزمن النشط: ${Math.round((a.activeMs ?? 0) / 1000)} ثانية`,
    `الإشارات: ${a.reasons.join("، ")}`,
    `الجلسة: ${a.sessionId}`,
  ];
  return lines.join("\n");
}

/**
 * تُرسِل عبر أول قناة مضبوطة، ولا ترمي أبداً — فشل التنبيه لا يجوز أن يُفشل
 * تسجيل الزيارة نفسها.
 */
export async function sendAlert(a: AlertInput): Promise<"webhook" | "email" | "none"> {
  const text = body(a);

  try {
    // Slack / Discord / n8n — أي رابط يقبل POST بـ JSON.
    const hook = process.env.ALERT_WEBHOOK_URL;
    if (hook) {
      await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, content: text }), // content لِـ Discord، text لِـ Slack
      });
      return "webhook";
    }

    const key = process.env.RESEND_API_KEY;
    const to = process.env.ALERT_EMAIL;
    if (key && to) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.ALERT_FROM ?? "onboarding@resend.dev",
          to,
          subject: `زيارة ${a.score}/100 — ${[a.city, a.country].filter(Boolean).join("، ")}`,
          text,
        }),
      });
      return "email";
    }
  } catch (err) {
    console.error("[alert] تعذّر الإرسال:", err);
  }

  return "none";
}
