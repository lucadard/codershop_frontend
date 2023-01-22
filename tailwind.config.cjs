/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1f2023',
        secondary: '#f9f9f9'
      },
      fontFamily: {
        logo: 'Kanit'
      },
      animation: {
        twinkle: 'pulse 5s ease-in-out infinite'
      },
      keyframes: {
        twinkle: {
          '20%': { opacity: 0 },
          '30%': { opacity: 10 },
          '60%': { opacity: 10 },
          '100%': { opacity: 0 }
        }
      }
    }
  },
  plugins: []
}
