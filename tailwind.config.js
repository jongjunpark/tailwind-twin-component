/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [require('./src/styles/plugin/absolute-center')],
}
