/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      linearBorderGradients: {
        colors: {
          'auth-container': ['rgba(34,240,0,0.47)', 'rgba(146,255,229,0.47)'],
        },
        background: {
          'auth-container-background': '#344F3E',
        },
      },
      dropShadow: {
        xs: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      transitionProperty: {
        stroke: 'stroke',
        fill: 'fill',
      },
      aspectRatio: {
        'video-preview': '251 / 165',
      },
      borderOpacity: {
        15: '0.15',
      },
      bgGradientDeg: {
        143: '143deg',
      },
      backgroundOpacity: {
        15: '0.15',
        2: '0.02',
      },
      transformOrigin: {
        '1/2': '50% 50%',
      },
      translate: {
        'negative-1/2': '-50%',
      },
      boxShadow: {
        'tag-scroll-button': '66px 0px 3px 0px rgba(43,42,44,0.9)',
        'tag-scroll-right-button': '-33px 0px 6px 0px rgba(45,43,46,0.79)',
        md: '0px 66px 110px 0px #0000000D',
        sm: '0px 7px 55px 0px #03294B1A;',
      },
    },
    colors: {
      black: '#111110',
      dark: '#2F2F2E',
      grey: '#939393',
      'grey-light': '#F2F2F4',
      white: '#FFF',
      blue: '#158FFF',
      'blue-light': '#D4DFFF',
      yellow: '#E3AD09',
      'yellow-light': '#F2C94C',
      'orange-red': '#FF5349',
      green: '#3DB613',
      'green-light': '#344F3E',
      'gradient-dark-start-color': '#302F32',
      'gradient-dark-end-color': '#242424',
      'gradient-dark-color-2': '#272728',
    },
    fontFamily: {
      serif: ['Lato', 'sans-serif'],
    },
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['18px', '27px'],
      xl: ['20px', '30px'],
      xl2: ['24px', '32px'],
      xl3: ['32px', '40px'],
      xl4: ['40px', '54px'],
      xl5: ['48px', '56px'],
    },
  },
  plugins: [],
};
