import type { Config } from "tailwindcss";

/**
 * نظام تصميم ardev.dev — داكن أولاً، بلمسة "فضائية".
 * القاعدة: خلفية شبه سوداء عميقة، لمسات بنفسجي كهربائي → سماوي، وزجاجية (glass).
 * السُلّم الطباعي والحركات معرّفة هنا ليكون مصدراً واحداً للحقيقة.
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
        ink: {
          DEFAULT: "#08090d", // الخلفية الأعمق
          900: "#0b0d12",
          800: "#0f1117", // سطح
          700: "#141821",
          600: "#1b202b", // حدود قوية
          500: "#252b38",
        },
        line: "#1c2029",
        fg: {
          DEFAULT: "#e8eaf0",
          muted: "#9aa1b2",
          faint: "#616776",
        },
        // الأكسنت المتدرّج: بنفسجي → سماوي، مع وردي للنبضات
        violet: {
          DEFAULT: "#8b5cff",
          soft: "#8b5cff1a",
          400: "#a78bff",
          600: "#6d3cf0",
        },
        cyan: {
          DEFAULT: "#22d3ee",
          soft: "#22d3ee1a",
        },
        pink: "#f472b6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        mega: ["clamp(2.75rem, 8vw, 6.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "700" }],
        display: ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        h2: ["clamp(1.6rem, 3.5vw, 2.4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      borderRadius: {
        "2xl": "1.15rem",
        "3xl": "1.6rem",
        "4xl": "2.2rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139,92,255,0.15), 0 20px 60px -20px rgba(139,92,255,0.45)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.15), 0 20px 60px -20px rgba(34,211,238,0.4)",
        card: "0 1px 2px rgba(0,0,0,0.4), 0 12px 40px -12px rgba(0,0,0,0.6)",
        lift: "0 2px 4px rgba(0,0,0,0.4), 0 24px 70px -20px rgba(139,92,255,0.35)",
      },
      backgroundImage: {
        "grid-line":
          "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
        "accent-gradient": "linear-gradient(120deg, #8b5cff 0%, #22d3ee 100%)",
        "accent-gradient-soft": "linear-gradient(120deg, #8b5cff33 0%, #22d3ee22 100%)",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate(0,0) scale(1)", opacity: "0.55" },
          "33%": { transform: "translate(6%, -8%) scale(1.15)", opacity: "0.75" },
          "66%": { transform: "translate(-6%, 6%) scale(0.95)", opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        aurora: "aurora 18s ease-in-out infinite",
        "aurora-slow": "aurora 26s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
