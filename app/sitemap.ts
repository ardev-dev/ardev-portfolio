import type { MetadataRoute } from "next";

const SITE = "https://ardev.dev";

/**
 * الرئيسية بنسختين لغويّتين. alternates تُخرِج وسوم hreflang داخل
 * الـ sitemap، وهي الطريقة التي يوصي بها Google لربط النسختين.
 * وسياسة الخصوصية بنسخة إنجليزية واحدة، وتاريخها ثابت لأنّها لا تتغيّر مع كل نشر.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: SITE,
          ar: `${SITE}/?lang=ar`,
          "x-default": SITE,
        },
      },
    },
    {
      url: `${SITE}/privacy`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
