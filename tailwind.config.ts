import type { Config } from "tailwindcss";

/**
 * نظام تصميم ardev.dev — "Polished Product" (SaaS-grade، بروح Linear/Vercel/Stripe).
 * قاعدة داكنة عميقة، لمسة تدرّج نيلي→بنفسجي، بطاقات بعمق وحدود دقيقة، توهّجات ذوقية.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#08090c", 900: "#08090c", 800: "#0d0e13", 700: "#14151c", 600: "#1b1d26" },
        ink: "#f4f4f6", // العناوين
        fg: { DEFAULT: "#a2a2ad", muted: "#77777f", faint: "#54545c" },
        accent: {
          DEFAULT: "#818cf8",
          indigo: "#6366f1",
          violet: "#a78bfa",
          fuchsia: "#e879f9",
          soft: "rgba(129,140,248,0.14)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        arabic: ["var(--font-cairo)", "Cairo", "Tajawal", "sans-serif"],
      },
      fontSize: {
        mega: ["clamp(2.75rem, 6.5vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.035em", fontWeight: "700" }],
        display: ["clamp(2rem, 4.5vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "700" }],
        h2: ["clamp(1.5rem, 3vw, 2.1rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      borderRadius: { xl: "0.9rem", "2xl": "1.15rem", "3xl": "1.6rem" },
      boxShadow: {
        card: "inset 0 1px 0 0 rgba(255,255,255,0.05), 0 10px 34px -14px rgba(0,0,0,0.7)",
        lift: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 20px 50px -18px rgba(0,0,0,0.75)",
        glow: "0 0 60px -12px rgba(129,140,248,0.5)",
        "btn": "inset 0 1px 0 0 rgba(255,255,255,0.18), 0 8px 24px -8px rgba(99,102,241,0.5)",
      },
      backgroundImage: {
        "accent-grad": "linear-gradient(120deg, #818cf8 0%, #a78bfa 45%, #e879f9 100%)",
        "accent-grad-soft": "linear-gradient(120deg, rgba(129,140,248,0.16), rgba(232,121,249,0.10))",
        "card-grad": "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008))",
        grid: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "pulse-glow": { "0%,100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
        shine: { from: { backgroundPosition: "200% center" }, to: { backgroundPosition: "-200% center" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shine: "shine 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
