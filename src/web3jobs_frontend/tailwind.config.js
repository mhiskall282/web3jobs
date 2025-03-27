/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD700', // Gold
          dark: '#B8860B',    // Dark Gold
          light: '#FFF2CC',   // Light Gold
        },
        secondary: {
          DEFAULT: '#1A1A1A', // Rich Black
          light: '#2D2D2D',   // Light Black
          dark: '#000000',    // Pure Black
        },
        accent: {
          purple: '#8B4513',  // Purple accent
          green: '#228B22',   // Success Green
          red: '#CD5C5C',     // Error Red
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};