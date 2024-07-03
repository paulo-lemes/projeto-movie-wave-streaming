import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    animation: {
      fadeSlideUp: "fadeSlideUp 0.8s ease-out",
      fadeSlideUpShorter: "fadeSlideUpShorter 0.7s ease-out",
    },
    keyframes: {
      fadeSlideUp: {
        "0%": { transform: "translateY(15%)", opacity: "0" },
        "50%": { transform: "translateY(15%)", opacity: "0" },
        "100%": { transform: "translateY(0))", opacity: "100%" },
      },
      fadeSlideUpShorter: {
        "0%": { transform: "translateY(5%)", opacity: "0" },
        "50%": { transform: "translateY(5%)", opacity: "0" },
        "100%": { transform: "translateY(0))", opacity: "100%" },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["forest"],
  },
};
export default config;
