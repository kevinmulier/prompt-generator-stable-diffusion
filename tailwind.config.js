/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    colors: {
      fublu: {
        50: "#eff1fe",
        100: "#e2e4fd",
        200: "#cacdfb",
        300: "#aaadf7",
        400: "#8d88f1",
        500: "#796be9",
        600: "#6a4fdc",
        700: "#644ac5",
        800: "#4b369d",
        900: "#3f337c",
      },
      thunderbird: {
        50: "#fff1f1",
        100: "#ffe1e1",
        200: "#ffc8c8",
        300: "#ffa1a1",
        400: "#fe6b6b",
        500: "#f73c3c",
        600: "#e41e1e",
        700: "#d31717",
        800: "#9f1515",
        900: "#831919",
      },
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
    },
    extend: {},
  },
  plugins: [],
};
