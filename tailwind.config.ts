import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07070a",
          900: "#0b0b10",
          800: "#111118",
          700: "#1a1a24",
          600: "#242432",
          500: "#3a3a4c",
          400: "#565669",
          300: "#7a7a8f",
        },
        bone: {
          50: "#f7f5ef",
          100: "#efece2",
          200: "#d9d4c2",
          300: "#b7b0a0",
          400: "#8a8479",
        },
        accent: {
          music: "#ea6f3d",
          "music-dark": "#f5a97f",
          dev: "#4c6ef5",
          "dev-dark": "#8aadf4",
          writing: "#8b5cf6",
          "writing-dark": "#c6a0f6",
          research: "#3f9d6f",
          "research-dark": "#a6da95",
          startup: "#c48a2a",
          "startup-dark": "#eed49f",
          jmhs: "#dc4b6a",
          "jmhs-dark": "#ee99a0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
  plugins: [],
};

export default config;
