import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        display: ["Arial", "Helvetica", "sans-serif"]
      },
      colors: {
        ink: "#080808",
        paper: "#e9e7e1",
        acid: "#d5ff3f"
      }
    }
  },
  plugins: []
};

export default config;