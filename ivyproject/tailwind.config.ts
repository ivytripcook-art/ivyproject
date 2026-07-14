import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F0E17",
        surface: "#1B1A26",
        border: "#2E2C3D",
        primary: "#B08BEF",
        "primary-light": "#E9D8FD",
        muted: "#6E6A80",
        subtle: "#9D97AF",
      },
      backgroundImage: {
        "ivy-gradient": "linear-gradient(135deg, #B08BEF, #BE9AF2, #D0B4F7)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
