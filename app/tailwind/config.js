/*global module*/
module.exports = {
  theme: {
    extend: {
      colors: {
        'purple-light': '#7d777d',
        'purple': '#4d394b',
        'purple-dark': '#271d26',
        'dark-mode-primary-color': '#1b1d21'
      },
      inset: {
        '0': 0,
        auto: 'auto',
        '1/2': '50%',
        '50': '50px',
        '100': '100px'
      },
      fontSize: {
        'xs': '.8125rem'
      },
      margin: {
        '-13': '-3.25rem',
      },
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' }
      }
    },
  },
  variants: {
    scale: ['responsive', 'hover', 'focus', 'active', 'group-hover']
  },
  plugins: [],
}
