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
        // -------------- TYPOGRAPHY --------------
        typography: {
          DEFAULT: '#0C0E16',
          primary: '#7C5DFA',
          secondary: '#7E88C3',
          success: '#33D69F',
          warning: '#FF8F00',
          danger: {
            DEFAULT: '#EC5757',
            active: '#FF9797',
          },
          gray: '#888EB0',

          // ------ DARK TYPOGRAPHY ------
          dark: {
            DEFAULT: '#FFFFFF',
            primary: '#7C5DFA',
            secondary: '#DFE3FA',
            success: '#33D69F',
            warning: '#FF8F00',
            danger: {
              DEFAULT: '#EC5757',
              active: '#FF9797',
            },
            gray: '#888EB0',
          },
        },

        // -------------- BACKGROUNDS --------------
        bg: {
          DEFAULT: '#F8F8FB',
          primary: {
            DEFAULT: '#7C5DFA',
            active: '#9277FF',
          },
          secondary: {
            DEFAULT: '#F9FAFE',
            active: '#DFE3FA',
          },
          success: '#33D69F',
          warning: '#FF8F00',
          danger: {
            DEFAULT: '#EC5757',
            active: '#FF9797',
          },
          black: {
            DEFAULT: '#373B53',
            active: '#0C0E16',
          },
          overlay: 'rgba(0,0,0,0.5)',
          icon: {
            DEFAULT: '#7E88C3',
            active: '#DFE3FA',
          },

          // ------ DARK BACKGROUNDS ------
          dark: {
            DEFAULT: '#141625',
            primary: {
              DEFAULT: '#7C5DFA',
              active: '#9277FF',
            },
            secondary: {
              DEFAULT: '#252945',
              active: '#FFFFFF',
            },
            success: '#33D69F',
            warning: '#FF8F00',
            danger: {
              DEFAULT: '#EC5757',
              active: '#FF9797',
            },
            black: {
              DEFAULT: '#373B53',
              active: '#1E2139',
            },
            overlay: 'rgba(0,0,0,0.5)',
            icon: {
              DEFAULt: '#7E88C3',
              active: '#DFE3FA',
            },
          },
        },

        // -------------- BORDERS --------------
        border: {
          DEFAULT: '#494E6E',

          // ------ DARK BORDERS ------
          dark: {
            DEFAULT: '#494E6E',
          },
        },
      },
    },
  },
  plugins: [],
};
