/**
 * روابط القنوات الموسومة (UTM) — **الحلّ الوحيد لـ«مباشر ٥٨٪»**.
 *
 * ⚠️ **الغموض في المصدر ليس عطلاً نُصلحه بالتحليل.** متصفّحات واتساب ولينكدإن
 * وإنستغرام الداخلية تحذف `referrer` عمداً، فتصل الزيارة بلا مصدر مهما بلغت
 * دقّة التتبّع. الطريق الوحيد أن **نوسم الرابط قبل نشره** — فما نضعه نحن في
 * العنوان يصل كاملاً.
 *
 * الاستعمال: انسخ الرابط المناسب من اللوحة والصقه في المكان المقصود، ولا
 * تنشر `ardev.dev` عارياً في أيّ قناة.
 */

export interface Channel {
  key: string;
  label: string;
  /** أين يوضع هذا الرابط بالضبط — بلا هذا تُخلط القنوات وتفقد معناها. */
  where: string;
  source: string;
  medium: string;
}

export const CHANNELS: Channel[] = [
  { key: "linkedin_profile", label: "لينكدإن — الملفّ", where: "حقل الموقع في ملفّك الشخصيّ", source: "linkedin", medium: "profile" },
  { key: "linkedin_post", label: "لينكدإن — منشور", where: "أي منشور تكتبه", source: "linkedin", medium: "post" },
  { key: "linkedin_dm", label: "لينكدإن — رسالة", where: "رسائلك المباشرة", source: "linkedin", medium: "dm" },
  { key: "whatsapp", label: "واتساب", where: "حين ترسل الرابط لعميل", source: "whatsapp", medium: "dm" },
  { key: "cv_pdf", label: "داخل السيرة الذاتية", where: "رابط الموقع في ملفّ الـPDF نفسه", source: "cv", medium: "pdf" },
  { key: "github", label: "جيت هَب", where: "ملفّك التعريفيّ وREADME المشاريع", source: "github", medium: "profile" },
  { key: "email_sig", label: "توقيع البريد", where: "توقيعك في كل رسالة", source: "email", medium: "signature" },
  { key: "pubdev", label: "pub.dev", where: "صفحات حزمك المنشورة", source: "pubdev", medium: "package" },
  { key: "x", label: "منصّة X", where: "الملفّ والمنشورات", source: "x", medium: "profile" },
];

const BASE = "https://ardev.dev";

/** يبني الرابط الموسوم. [campaign] اختياريّ لتمييز حملةٍ بعينها. */
export function channelUrl(c: Channel, campaign?: string): string {
  const q = new URLSearchParams({ utm_source: c.source, utm_medium: c.medium });
  if (campaign) q.set("utm_campaign", campaign);
  return `${BASE}/?${q.toString()}`;
}
