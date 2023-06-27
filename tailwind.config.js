/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Bungee'],
      'body': ['Bungee Shade']
    },
    extend: {
      animation: {
        'slide-right': 'slide 10s infinite ease-in-out'
      },
      keyframes: {
        slide: {
          '0%': { opacity: '0'},
          '20%, 100%': { opacity: '0', left: '3600px' },
          '10%': { opacity: '0.1'}
        }
      }
    }
  },
  plugins: [],
}