/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0a0a0b',
        'accent-green': '#39FF14',
        'card-olive': '#c7db2e',
        'card-mid': '#34b878',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'shield': '1.5rem 1.5rem 0.5rem 0.5rem',
      }
    },
  },
  plugins: [],
}
