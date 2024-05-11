/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile': {'max': '524px'},
      'tablet': {'min': '525px', 'max': '750px'},
    },
  },
  plugins: [],
}

