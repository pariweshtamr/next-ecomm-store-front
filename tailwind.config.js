/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["montserrat", ...fontFamily.sans],
      },
      keyframes: {
        fly: {
          "100%": { top: "0", left: "100%", opacity: "0", display: "none" },
        },
      },
      animation: {
        fly: "fly 1s  ease-in-out",
      },
      colors: {
        alt: "#f2f2f2",
        textColor: "#0c0c0c",
        secondary: "#FCD3BC",
        primary: "#B8E0FF",
        success: "#AEFFBE",
      },
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        "min-3xl": { min: "1800px" },

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1024px" },
        // => @media (max-width: 1023px) { ... }

        "min-xl": { min: "1278px" },
        "min-lg": { min: "1023px" },
        "min-md": { min: "821px" },

        md: { max: "820px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        xs: { max: "479px" },
        // => @media (max-width: 479px) { ... }
      },
    },
  },

  plugins: [],
}
