/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  fontFamily: {
    primary: "Poppins",
  },
  container: {
    padding: {
      DEFAULT: "1rem",
      lg: "2rem",
    },
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1234px",
  },
  extend: {
    colors: {
      primary: "#101828",
      secondary: "#7F56D9",
    },
    backgroundImage: {
      "common-background": "url('./src/assets/images/background.jpg')",
    },
    boxShadow: {
      1: "0px 4px 30px rgba(0, 0, 0, 0.08)",
    },
    animation: {
      "bounce-slow": "bounce 3s infinite",
      blob: "blob 7s infinite",
      fadeIn: "fadeIn 0.5s ease-in-out",
    },
    keyframes: {
      blob: {
        "0%, 100%": {
          transform: "translate(0, 0) scale(1)",
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
        },
      },
      fadeIn: {
        "0%": {
          opacity: "0",
          transform: "translateY(10px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
  },
};
export const plugins = [];
