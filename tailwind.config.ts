import type { Config } from "tailwindcss";

/**
 * نظام تصميم ardev.dev — تحريري، داكن، بلون تمييز واحد (تيل) كخيط متّسق.
 * مستلهم من أرقى بورتفوليوهات المهندسين: تباين عالٍ، طباعة ضخمة، ضبط دقيق.
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
        bg: { DEFAULT: "#0a0e14", 900: "#0a0e14", 800: "#0d1219", 700: "#121a24" },
        line: { DEFAULT: "#1c2531", strong: "#2a3644" },
        heading: "#e7eef6",
        body: "#93a3b8",
        faint: "#5c6b7e",
        accent: { DEFAULT: "#5eead4", dim: "#2dd4bf", soft: "rgba(94,234,212,0.10)", faint: "rgba(94,234,212,0.05)" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        arabic: ["var(--font-cairo)", "Cairo", "Tajawal", "sans-serif"],
      },
      fontSize: {
        mega: ["clamp(2.8rem, 7vw, 4.75rem)", { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "700" }],
        display: ["clamp(1.9rem, 4vw, 2.75rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        h2: ["clamp(1.15rem, 2vw, 1.35rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
      },
      borderRadius: { xl: "0.85rem", "2xl": "1.1rem" },
      boxShadow: {
        card: "0 8px 30px -12px rgba(0,0,0,0.6)",
        accent: "0 0 0 1px rgba(94,234,212,0.25), 0 14px 40px -18px rgba(94,234,212,0.35)",
      },
      keyframes: {
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-5px)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
      },
      animation: { floaty: "floaty 5s ease-in-out infinite", blink: "blink 1.4s steps(1) infinite" },
    },
  },
  plugins: [],
};

export default config;
