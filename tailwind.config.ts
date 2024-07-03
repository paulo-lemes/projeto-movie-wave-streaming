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
      fadeSlideUp: "fadeSlideUp 0.4s ease-out",
      fadeSlideDown: "fadeSlideDown 0.4s ease-out",
      fadeSlideLeft: "fadeSlideLeft 0.4s ease-out",
      fadeSlideRight: "fadeSlideRight 0.4s ease-out",
    },
    keyframes: {
      fadeSlideUp: {
        "0%": { transform: "translateY(50%)", opacity: "0" },
        "70%": { opacity: "50%" },
        "100%": { transform: "translateY(0))", opacity: "100%" },
      },
      fadeSlideDown: {
        "0%": { transform: "translateY(-50%)", opacity: "0" },
        "70%": { opacity: "50%" },
        "100%": { transform: "translateY(0))", opacity: "100%" },
      },
      fadeSlideRight: {
        "0%": { transform: "translateX(-10%)", opacity: "0" },
        "50%": { opacity: "50%" },
        "100%": { transform: "translateX(0))", opacity: "100%" },
      },
      fadeSlideLeft: {
        "0%": { transform: "translateX(10%)", opacity: "0" },
        "50%": { opacity: "50%" },
        "100%": { transform: "translateX(0))", opacity: "100%" },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["forest"],
  },
};
export default config;
