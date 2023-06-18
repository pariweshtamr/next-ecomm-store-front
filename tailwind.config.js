/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["montserrat", ...fontFamily.sans],
      },
      colors: {
        alt: "#f2f2f2",
        textColor: "#0c0c0c",
        secondary: "#FCD3BC",
        primary: "#B8E0FF",
        success: "#AEFFBE",
      },
    },
  },

  plugins: [],
}
