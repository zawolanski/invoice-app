// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['League Spartan', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#7C5DFA',
          light: '#9277FF',
        },
        secondary: {
          DEFAULT: '#F9FAFE',
          dark: '#252945',
          light: '#DFE3FA',
        },
        bg: {
          DEFAULT: '#F8F8FB',
          dark: '#141625',
        },
        typography: {
          DEFAULT: '#FFFFFF',
          dark: '#0C0E16',
          purple: '#858BB2',
          secondary: '#7E88C3',
          secondaryDark: '#888EB0',
        },
        menu: {
          DEFAULT: '#373B53',
          dark: '#1E2139',
        },
        border: {
          DEFAULT: '#494E6E',
        },
        danger: {
          DEFAULT: '#EC5757',
          light: '#FF9797',
        },
      },
    },
  },
  plugins: [],
};
