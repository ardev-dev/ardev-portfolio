import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", // المسارات القصيرة أدواتُ توجيهٍ لا صفحات — فهرستها تُنتج نسخاً مكرّرة
      // من الصفحة الرئيسية وتُشتّت ترتيبها.
      disallow: ["/dashboard", "/api/", "/in", "/wa", "/gh", "/x", "/pub", "/cv", "/mail", "/ig", "/fb", "/me", "/me-off"] },
    sitemap: "https://ardev.dev/sitemap.xml",
  };
}
