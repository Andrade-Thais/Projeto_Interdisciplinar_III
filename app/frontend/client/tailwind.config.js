/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const flowbite = require('flowbite-react/tailwind')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        backgroundImage: "url('./src/assets/backgroundImage.jpg')",
      },
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "primary": "#B1A5CA",
        "secondary": "#64734D",
        "accent": "#D9D9D9",
        "neutral": "#f2f2f2",
        "info": "#b9b9b9",
        "success": "#AFBF9F",
        "warning": "#FFFEC8",
        "error": "#FF7F7F",
        "galeria": "#f7cae4",
        "sidebar": "#dcd9f8",
        "prospecção": "#bdbfbf"
      },
      screens: {
        xxs: "320px",
        xs: "375px",
        xl: "1440px",
        xxl: "1920px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("tailwindcss-radix")({
      variantPrefix: "radix",
    }),
    flowbite.plugin(),
  ],
};