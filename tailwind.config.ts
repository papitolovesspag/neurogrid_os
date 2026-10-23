import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#07090E",
          950: "#07090E",
          900: "#0B111E",
          850: "#0F172A",
          800: "#162032",
          700: "#1E293B",
          600: "#334155",
        },
        grid: {
          cyan: "#06B6D4",
          electricCyan: "#00F0FF",
          emerald: "#10B981",
          neonEmerald: "#00FF9D",
          amber: "#F59E0B",
          slate: "#0B111E",
          surface: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-cyan": "glowCyan 3s ease-in-out infinite alternate",
      },
      keyframes: {
        glowCyan: {
          "0%": { boxShadow: "0 0 15px rgba(0, 240, 255, 0.2)" },
          "100%": { boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
