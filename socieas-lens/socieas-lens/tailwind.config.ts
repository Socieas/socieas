import type { Config } from "tailwindcss";

/**
 * Design tokens inherited from socieas.com.
 * Violet is the single hero accent. Green/red are semantic only (deltas, status).
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        brand: {
          DEFAULT: "#7C3AED",
          soft: "var(--brand-soft)",
          dark: "#6D28D9",
          light: "#8B5CF6",
        },
        positive: "#16A34A",
        negative: "#DC2626",
      },
      borderRadius: {
        card: "24px",
        hero: "40px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,17,17,0.04), 0 8px 24px rgba(17,17,17,0.04)",
        glow: "0 20px 60px rgba(124,58,237,0.10)",
      },
      letterSpacing: {
        display: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
