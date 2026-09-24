import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-family-serif)"],
        sans: ["var(--font-family-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
