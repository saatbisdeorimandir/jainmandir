/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'jain-orange': '#FF9933',
        'jain-yellow': '#FFCC00',
        'jain-red': '#D32F2F',
        'peace-white': '#F9FAFB',
        'stone-gray': '#4D4D4D',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'devanagari': ['Poppins', 'sans-serif'], // Fallback for now, can add specific Hindi font
      }
    },
  },
  plugins: [],
}
