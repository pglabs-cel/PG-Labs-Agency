import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#09090B",
          secondary: "#111113",
          surface: "#18181B",
        },
        foreground: {
          DEFAULT: "#FAFAFA",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
        border: {
          DEFAULT: "#27272A",
          muted: "#18181B",
          accent: "rgba(139, 92, 246, 0.3)",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          hover: "#A78BFA",
          glow: "rgba(139, 92, 246, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      maxWidth: {
        container: "1280px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        "float-slower": "float 10s ease-in-out 2s infinite",
        shimmer: "shimmer 0.65s ease-out forwards",
        marquee: "marquee 28s linear infinite",
        "blink-cursor": "blink-cursor 1s step-end infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) skewX(-15deg)" },
          "100%": { transform: "translateX(250%) skewX(-15deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.08)" },
        },
      },
      boxShadow: {
        "glow-accent": "0 0 20px rgba(139,92,246,0.25), 0 0 60px rgba(139,92,246,0.08)",
        "glow-accent-lg": "0 0 40px rgba(139,92,246,0.35), 0 0 80px rgba(139,92,246,0.12)",
        "card-elevated": "0 20px 50px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04) inset",
      },
    },
  },
  plugins: [],
};
export default config;

