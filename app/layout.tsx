import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { profile, socials, storeApps } from "@/lib/data";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Analytics } from "@/components/Analytics";

/* خطوط ذاتيّة الاستضافة عبر next/font — غير حاجبة للعرض (LCP أفضل). */
const sans = Inter_Tight({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", display: "swap", variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cairo",
});

const NAME = profile.name.en;
const ROLE = profile.role.en;
const description = `${ROLE} and Technical Lead based in Buraydah, Saudi Arabia. Six years building and operating production systems — Flutter apps, Django backends, Next.js web, payments and real-time platforms.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://ardev.dev"),
  title: {
    default: `${NAME} — ${ROLE}`,
    template: `%s — ${profile.brand}`,
  },
  description,
  keywords: [
    "Abdulrahman Morshed", "AR Dev", "ardev.dev", "Senior Software Engineer",
    "Software Engineer", "Django", "Flutter", "Next.js", "TypeScript",
    "Python", "WebRTC", "Full lifecycle", "Saudi Arabia",
  ],
  authors: [{ name: NAME, url: "https://ardev.dev" }],
  creator: NAME,
  applicationName: profile.brand,
  category: "technology",
  // نسخة عربية حقيقية على معامل قابل للفهرسة — Googlebot يُصيّر JS فيقرأها.
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/?lang=ar", "x-default": "/" },
  },
  // max-image-preview:large يفتح معاينة الصورة الكبيرة في النتائج،
  // وmax-snippet:-1 يرفع سقف المقتطف — كلاهما شرط للنتائج الغنيّة.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "https://ardev.dev/",
    title: `${NAME} — ${ROLE}`,
    description,
    siteName: profile.brand,
    locale: "en_US",
    alternateLocale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${ROLE}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const SITE = "https://ardev.dev";

/**
 * رسم بياني واحد بدل كيان معزول: الشخص، والموقع، وصفحة الملف، والتطبيقات
 * المنشورة. الربط بـ @id يجعل محرّك البحث يفهمها كيانات مترابطة لا مقاطع مستقلّة.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: NAME,
      alternateName: [profile.brand, "عبدالرحمن مرشد"],
      jobTitle: ROLE,
      description,
      url: SITE,
      email: profile.email,
      image: `${SITE}/logo-mark.png`,
      knowsLanguage: ["ar", "en"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buraydah",
        addressRegion: "Al-Qassim",
        addressCountry: "SA",
      },
      worksFor: {
        "@type": "Organization",
        "@id": "https://somow.sa/#organization",
        name: "Somow",
        url: "https://somow.sa",
      },
      sameAs: [socials.github, socials.pubdev, socials.linkedin],
      knowsAbout: [
        "Software Engineering", "System Architecture", "Flutter", "Dart", "Django", "Python",
        "Next.js", "TypeScript", "REST APIs", "WebRTC", "WebSocket", "Payment Integration",
        "Firebase", "Docker", "Clean Architecture",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: `${NAME} — ${ROLE}`,
      description,
      inLanguage: ["en", "ar"],
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: SITE,
      name: `${NAME} — ${ROLE}`,
      isPartOf: { "@id": `${SITE}/#website` },
      mainEntity: { "@id": `${SITE}/#person` },
      inLanguage: "en",
    },
    ...storeApps.map((a) => ({
      "@type": "MobileApplication",
      name: a.name,
      applicationCategory: a.category,
      operatingSystem: "iOS, Android",
      author: { "@id": `${SITE}/#person` },
      url: a.url,
      sameAs: a.stores,
    })),
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${sans.variable} ${serif.variable} ${mono.variable} ${cairo.variable}`}
    >
      <body className="font-sans antialiased">
        {/* قبل الرسم: نُعلم CSS أن JS يعمل، فيُسمح بإخفاء عناصر الكشف. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
