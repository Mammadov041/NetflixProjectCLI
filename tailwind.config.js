/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        montSerrat: 'Montserrat-Regular',
        montSerratBold: 'Montserrat-Bold',
        montSerratBoldItalic: 'Montserrat-BoldItalic',
        montSerratItalic: 'Montserrat-Italic',
        montSerratLight: 'Montserrat-Light',
        montSerratLightItalic: 'Montserrat-LightItalic',
        montSerratSemiBold: 'Montserrat-SemiBold',
        montSerratSemiBoldItalic: 'Montserrat-SemiBoldItalic',
      },
    },
  },
  plugins: [],
};
