/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    m:{
      'auto': '0px auto',
    },
    w:{
     'form': '600px',   
     '33':'33%',
    },
    extend: {},
  },
  plugins: [],
}

