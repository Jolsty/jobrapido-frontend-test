/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/js/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlack: '#1d1d1f',
        flavor: '#72296d',
        customBg: '#ecf0f3'
      }
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
    }
  },
  plugins: []
}
