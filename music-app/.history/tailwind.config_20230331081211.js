/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        
      }
      colors: {
        "startUi-black": {
          50: "#D4D4D4",
          100: "#ABABAB",
          200: "#808080",
          300: "#545454",
          400: "#2B2B2B",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
          950: "#000000"
        },
        "willow-grove": {
          50: "#f6f7f6",
          100: "#e4e5e2",
          200: "#c7cac5",
          300: "#a4a8a0",
          400: "#7f857c",
          500: "#62675f",
          600: "#50544d",
          700: "#414540",
          800: "#373936",
          900: "#30322f",
          950: "#191b18",
        },
      }
    },
  },
  plugins: [],
}