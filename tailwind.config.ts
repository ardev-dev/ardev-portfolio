import type { Config } from "tailwindcss";

/**
 * نظام تصميم ardev.dev — "Editorial Dark".
 * أحادي دافئ قريب من الأسود، بلا ألوان صارخة: التباين والطباعة يحملان التصميم،
 * والمعدن (تدرّج أبيض→رمادي) هو اللمسة الوحيدة. أسماء الرموز محفوظة كما كانت
 * حتى تستمرّ لوحة التحكّم بالعمل دون تعديل.
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
        bg: { DEFAULT: "#0a0a0a", 900: "#0a0a0a", 800: "#101010", 700: "#161616", 600: "#1e1e1e" },
        ink: "#f5f4f2",
        fg: { DEFAULT: "#a8a6a2", muted: "#7a7873", faint: "#4f4d49" },
        accent: {
          DEFAULT: "#e8e6e1",
          soft: "rgba(255,255,255,0.07)",
          warm: "#c9c3b6",
          dim: "#8f8b83",
        },
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        arabic: ["var(--font-cairo)", "Cairo", "Tajawal", "sans-serif"],
      },
      fontSize: {
        mega: ["clamp(2.5rem, 7.2vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.042em", fontWeight: "600" }],
        display: ["clamp(1.9rem, 4.6vw, 3.4rem)", { lineHeight: "1.06", letterSpacing: "-0.034em", fontWeight: "600" }],
        h2: ["clamp(1.4rem, 3vw, 2rem)", { lineHeight: "1.14", letterSpacing: "-0.024em", fontWeight: "600" }],
      },
      borderRadius: { xl: "0.85rem", "2xl": "1.1rem", "3xl": "1.6rem", "4xl": "2rem" },
      boxShadow: {
        card: "inset 0 1px 0 0 rgba(255,255,255,0.045), 0 12px 40px -18px rgba(0,0,0,0.9)",
        lift: "inset 0 1px 0 0 rgba(255,255,255,0.09), 0 30px 70px -24px rgba(0,0,0,0.95)",
        glow: "0 0 90px -20px rgba(255,255,255,0.22)",
        btn: "inset 0 1px 0 0 rgba(255,255,255,0.22), 0 10px 30px -12px rgba(0,0,0,0.9)",
        window: "0 60px 140px -40px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "accent-grad": "linear-gradient(135deg, #ffffff 0%, #d9d6d0 48%, #8b8781 100%)",
        "accent-grad-soft": "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))",
        "card-grad": "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012))",
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shine: { from: { backgroundPosition: "200% center" }, to: { backgroundPosition: "-200% center" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "scroll-cue": {
          "0%": { transform: "translateY(-6px)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        shine: "shine 7s linear infinite",
        float: "float 6s ease-in-out infinite",
        "scroll-cue": "scroll-cue 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
