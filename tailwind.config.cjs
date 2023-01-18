/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './index.html',
  ],
  theme: {
    extend: {
      zIndex:{
        '-10':-10,
        '0': 0,
        '1':1,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        '100': 100,
        '1000': 1000,
        '10000': 10000,
        '100000': 100000,
        'auto': 'auto',
      }
    },
  },
  plugins: [],

}
