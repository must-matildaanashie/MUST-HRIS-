import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a2420",
        muted: "#667c72",
        line: "#e7ecea",
        wash: "#f4f7f5",
        brand: {
          DEFAULT: "#018038",
          dark: "#016a2d",
          soft: "#e6f4ec",
        },
        sidebar: "#0d0f0e",
        amber: "#b9770e",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 20px rgba(6,21,16,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
