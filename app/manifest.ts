import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

/** بيان الويب: يحسّن إشارات الجوّال ويسمح بالتثبيت على الشاشة الرئيسية. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name.en} — ${profile.role.en}`,
    short_name: profile.brand,
    description: profile.role.en,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "en",
    dir: "auto",
    categories: ["portfolio", "technology", "productivity"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
