import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { profile, socials } from "@/lib/data";
import { LanguageProvider } from "@/components/LanguageProvider";

/* خطوط ذاتيّة الاستضافة عبر next/font — غير حاجبة للعرض (LCP أفضل). */
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-grotesk",
});
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cairo",
});

const NAME = profile.name.en;
const ROLE = profile.role.en;
const description = `${ROLE} with 5+ years owning the full software-development lifecycle — architecture, development, integration, deployment, and production support across mobile, web, and Django backends.`;

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
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
  themeColor: "#0a0e14",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  alternateName: profile.brand,
  jobTitle: ROLE,
  url: "https://ardev.dev",
  email: profile.email,
  sameAs: [socials.github, socials.pubdev, socials.linkedin],
  knowsAbout: ["Software Engineering", "Django", "Flutter", "Next.js", "TypeScript", "Python", "System Architecture"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${grotesk.variable} ${mono.variable} ${cairo.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
