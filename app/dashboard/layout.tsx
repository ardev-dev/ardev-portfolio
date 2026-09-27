import type { Metadata } from "next";

// لوحة خاصّة: تُمنع من الفهرسة صراحةً (القيد الأمني الحقيقي في firestore.rules).
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // ⚠️ **الخطّ العربيّ يُفرَض هنا، ولا يكفي `dir="rtl"`.** جذر المستند
  // `lang="en"` (الموقع إنجليزيّ أساساً)، وقاعدة Cairo في `globals.css`
  // مشروطة بـ`html[lang="ar"]` — فكان كل نصّ عربيّ في اللوحة يُرسَم بـ
  // Inter Tight اللاتينيّ وبديله: حروفٌ متفاوتة الارتفاع وتشكيلٌ مكسور.
  return (
    <div lang="ar" dir="rtl" className="font-arabic">
      {children}
    </div>
  );
}
