/**
 * روابط القنوات — **مسارات قصيرة لا معاملات استعلام**.
 *
 * ⚠️ **قرار صاحب الموقع: لا `?` بعد النطاق.** الصيغة المعتادة
 * (`ardev.dev/?utm_source=linkedin`) تجعل الرابط المنشور يبدو دعائياً ويُربك
 * من يراه، وبعض التطبيقات تقصّه أو تُعيد ترتيب معاملاته. فالقناة تُحمَل في
 * المسار: `ardev.dev/in`.
 *
 * ⚠️ **ولماذا القناة أصلاً:** «مباشر» كان أكبر مصدرٍ في اللوحة (١٩ من ٣٣)،
 * وهو ليس مصدراً بل **غياب مصدر** — متصفّحات واتساب ولينكدإن وإنستغرام
 * الداخلية تحذف `referrer` عمداً. لا يُحلّ بالتحليل بل بوسم الرابط قبل نشره.
 *
 * المسارات تُترجَم في `middleware.ts` إلى الصفحة الرئيسية مع كعكة قناة.
 */

export interface Channel {
  key: string;
  label: string;
  /** أين يوضع هذا الرابط بالضبط — بلا هذا تُخلط القنوات فتفقد معناها. */
  where: string;
  /** المسار القصير بعد النطاق. */
  path: string;
}

export const CHANNELS: Channel[] = [
  { key: "linkedin", label: "لينكدإن", where: "حقل الموقع في ملفّك · ومنشوراتك", path: "/in" },
  { key: "whatsapp", label: "واتساب", where: "حين ترسل الرابط لعميل", path: "/wa" },
  { key: "cv", label: "داخل السيرة الذاتية", where: "رابط الموقع في ملفّ الـPDF نفسه", path: "/cv" },
  { key: "github", label: "جيت هَب", where: "ملفّك التعريفيّ وREADME المشاريع", path: "/gh" },
  { key: "email", label: "توقيع البريد", where: "توقيعك في كل رسالة", path: "/mail" },
  { key: "pubdev", label: "pub.dev", where: "صفحات حزمك المنشورة", path: "/pub" },
  { key: "x", label: "منصّة X", where: "الملفّ والمنشورات", path: "/x" },
  { key: "instagram", label: "إنستغرام", where: "البايو", path: "/ig" },
  { key: "facebook", label: "فيسبوك", where: "الملفّ والمنشورات", path: "/fb" },
];

const BASE = "https://ardev.dev";

export const channelUrl = (c: Channel): string => BASE + c.path;
