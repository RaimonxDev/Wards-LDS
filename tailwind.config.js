const { guessProductionMode } = require("@ngneat/tailwind");
const colors = require('tailwindcss/colors')

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      colors:{
        primary: {
          ...colors.sky,
          DEFAULT: colors.sky[600]
        },
        indigo: colors.indigo,
        transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.rose,
      yellow: colors.amber,
      },

      extend: {
        gridTemplateColumns: {
          // Complex site-specific column configuration
         'minuta': '1.25rem repeat(2, 1fr)',
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
