import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        text: "var(--text)",
        "text-dim": "var(--text-dim)",
        line: "var(--line)",

        // Primary accent — soft eucalyptus/sage
        sage: "var(--sage)",
        "sage-soft": "var(--sage-soft)",
        "sage-hover": "var(--sage-hover)",
        "sage-text": "var(--sage-text)",

        warn: "var(--warn)",
        "warn-soft": "var(--warn-soft)",
        indigo: "var(--indigo)",
        "indigo-soft": "var(--indigo-soft)",
        clay: "var(--clay)",
        "clay-soft": "var(--clay-soft)",

        // Task priority / energy pastel spectrum (red -> yellow -> green)
        "pri-must": "var(--pri-must-bg)",
        "pri-must-border": "var(--pri-must-border)",
        "pri-should": "var(--pri-should-bg)",
        "pri-should-border": "var(--pri-should-border)",
        "pri-nice": "var(--pri-nice-bg)",
        "pri-nice-border": "var(--pri-nice-border)",
        "pri-text": "var(--pri-text)",

        // Neutral dropdown/menu tokens — always light, never colored text
        "menu-bg": "var(--menu-bg)",
        "menu-text": "var(--menu-text)",
        "menu-text-dim": "var(--menu-text-dim)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "var(--radius-sm)",
      },
      keyframes: {
        checkPop: {
          "0%": { transform: "scale(0.7)" },
          "55%": { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        checkPop: "checkPop 0.3s ease",
      },
    },
  },
  plugins: [],
};
export default config;
