import type { MetadataRoute } from "next";

const SITE = "https://ardev.dev";

/**
 * صفحة واحدة بنسختين لغويّتين. alternates تُخرِج وسوم hreflang داخل
 * الـ sitemap، وهي الطريقة التي يوصي بها Google لربط النسختين.
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
  ];
}
