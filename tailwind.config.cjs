/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C5DFA',
          light: '#9277FF',
        },
        bg: {
          DEFAULT: '#F8F8FB',
          dark: '#141625',
        },
        typography: {
          DEFAULT: '#FFFFFF',
          dark: '#0C0E16',
          purple: '#858BB2',
          gray: '#DFE3FA',
        },
        menu: {
          DEFAULT: '#373B53',
          dark: '#1E2139',
        },
        border: {
          DEFAULT: '#494E6E',
        },
      },
    },
  },
  plugins: [],
};
