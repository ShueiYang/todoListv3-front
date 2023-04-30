/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  darkMode: "class",

  theme: {
    container: {
      center: true,
      screens: {
        'sm': '640px', 
        'md': '768px', 
        'lg': '1024px',
      },
    },
    extend: {},
  },
  plugins: [],
}
