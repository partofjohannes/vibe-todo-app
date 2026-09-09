/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FBF9F6',
          100: '#F4EFE8',
          200: '#E7DED1',
          300: '#D5C7B3',
        },
        ink: {
          900: '#1F2421',
          700: '#3D4642',
          500: '#6B7772',
        },
        moos: {
          50: '#EDF5F0',
          100: '#D6E9DE',
          400: '#5AA47E',
          600: '#3B7A5A',
          800: '#25503B',
        },
        mohn: {
          50: '#FDF0EC',
          200: '#F6CDC0',
          500: '#D9613F',
          700: '#A64327',
        },
      },
    },
  },
  plugins: [],
}
