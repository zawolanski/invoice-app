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
      // -------------- SHADOWS --------------
      boxShadow: {
        select: '0 8px 20px 0 rgba(72, 84, 159, 0.25)',
        formBar: '0 20px 100px 0 rgba(0, 0, 0, 0.25)',

        // ------ DARK ------
        'dark-select': '0 8px 20px 0 rgba(0, 0, 0, 0.25)',
      },

      colors: {
        // -------------- COMMON --------------
        primary: {
          DEFAULT: '#7C5DFA',
          active: '#9277FF',
        },
        danger: {
          DEFAULT: '#EC5757',
          active: '#FF9797',
        },
        success: '#33D69F',
        warning: '#FF8F00',

        // -------------- TYPOGRAPHY --------------
        typography: {
          DEFAULT: '#0C0E16',
          secondary: '#7E88C3',
          gray: '#888EB0',

          // ------ DARK TYPOGRAPHY ------
          dark: {
            DEFAULT: '#FFFFFF',
            secondary: '#DFE3FA',
            gray: '#888EB0',
          },
        },

        // -------------- BACKGROUNDS --------------
        bg: {
          DEFAULT: '#F8F8FB',
          secondary: {
            DEFAULT: '#F9FAFE',
            active: '#DFE3FA',
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
            secondary: {
              DEFAULT: '#252945',
              active: '#FFFFFF',
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
          input: {
            DEFAULT: '#DFE3FA',
            active: '#9277FF',
          },

          // ------ DARK BORDERS ------
          dark: {
            DEFAULT: '#494E6E',
            input: {
              DEFAULT: '#252945',
              active: '#7C5DFA',
            },
          },
        },
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
};
