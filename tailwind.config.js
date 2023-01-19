/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { max: '639px' },
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
};

