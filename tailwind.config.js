/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ed7000"
      },
      fontFamily: {
        body: ['Itau Text', 'ui-sans-serif'],
        display: ['Itau Display', 'ui-sans-serif'],
      }
    },
  },
  plugins: [],
}