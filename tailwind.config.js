/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.tsx",
    "./lib/**/*.tsx",
  ],
  theme: {
    extend: {
        screens: {
            'mobile': '400px'
        },
    },
  },
  plugins: [],
}

