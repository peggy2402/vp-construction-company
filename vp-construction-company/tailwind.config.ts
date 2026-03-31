import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Ghi đè class "font-sans" bằng biến "--font-inter"
        sans: ['var(--font-inter)', 'sans-serif'],
        // Ghi đè class "font-serif" bằng biến "--font-lora"
        serif: ['var(--font-lora)', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
