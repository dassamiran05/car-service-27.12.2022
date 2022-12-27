/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // colors:{
      //   primary:'#FF3811',
      // }
    },
  },
  plugins: [require("daisyui")],
}
