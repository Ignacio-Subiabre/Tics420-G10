/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          base: {
            DEFAULT: '#e6dcd3', // light beige background
          },
          dark: {
            DEFAULT: '#1f1f1f', // dark gray text and UI
          },
          gray: {
            100: '#f5f5f5',
            300: '#d1d1d1',
            500: '#999999',
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  