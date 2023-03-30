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
      colors: {
        "startUi-blue": {
          50: "#DDE9FD",
          100: "#C0D7FC",
          200: "#9DC1FB",
          300: "#7BABF9",
          400: "#5E99F8",
          500: "#3B82F6",
          600: "#0B64F4",
          700: "#0950C3",
          800: "#073C92",
          900: "#042862",
          950: "#021431"
        }
      }
    },
  },
  plugins: [],
}