import type { Metadata } from "next";

// لوحة خاصّة: تُمنع من الفهرسة صراحةً (القيد الأمني الحقيقي في firestore.rules).
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false, nocache: true },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
