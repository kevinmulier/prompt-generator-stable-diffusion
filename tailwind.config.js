/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        fublu: {
          50: "#f0f2ff",
          100: "#e5e7ff",
          200: "#d0d4ff",
          300: "#b5bcff",
          400: "#99a2ff",
          500: "#7c89ff",
          600: "#6977e6",
          700: "#5a68d0",
          800: "#4550a3",
          900: "#384185",
        },
        thunderbird: {
          50: "#fff0f0",
          100: "#ffe0e0",
          200: "#ffc9c9",
          300: "#ff9f9f",
          400: "#fe6b6b",
          500: "#f73c3c",
          600: "#e41e1e",
          700: "#d31717",
          800: "#9f1515",
          900: "#831919",
        },
        "dark-gray": "#333333",
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
      },
    },
  },
  plugins: [],
};
