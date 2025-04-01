/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors : {
        gold: '#C5A357',
        earth: '#4A3B2A',
        accent: '#E94F2E',
        darkBg: '#0A0A0A'
      },
    },
  },
  plugins: [],
}