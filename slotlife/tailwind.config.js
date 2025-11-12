/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#3B82F6',
          green: '#10B981',
          light: '#EFF6FF',
        }
      }
    },
  },
  plugins: [],
}

