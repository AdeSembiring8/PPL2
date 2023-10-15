/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'C2AF00': '#C2AF00',
          'E4E4E4': '#E4E4E4',
          'F2F2F2': '#F2F2F2',
          '7C7C7C': '#7C7C7C',
          'C2AF00': '#C2AF00',
          'E2DDDD': '#E2DDDD',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'fredoka': ['Fredoka One'],
      },
    },
  },
  plugins: [],
}
