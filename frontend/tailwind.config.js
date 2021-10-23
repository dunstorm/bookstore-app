const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-in-out': {
          '0%': {
            opacity: '0',
            transform: 'translateY(0%)'
          },
          '5%': {
            opacity: '1',
            transform: 'translateY(20px)'
          },
          '90%': {
            opacity: '1',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(0%)'
          }, 
        },
      },
      animation: {
        'fade-in-out': 'fade-in-out 2.5s ease-in-out',
        'fade-in': 'fade-in .3s ease-out',
        'fade-out': 'fade-out .3s ease-out'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
