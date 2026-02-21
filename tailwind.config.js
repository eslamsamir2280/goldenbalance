/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'sans-serif'],
        latin: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        gold: {
          400: '#D4AF37',
          500: '#B8960C',
          600: '#9A7D0A',
        },
        dark: {
          900: '#0A0A0A',
          800: '#111111',
          700: '#1A1A1A',
          600: '#222222',
        }
      },
    },
  },
  plugins: [],
}
