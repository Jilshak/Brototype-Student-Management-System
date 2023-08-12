/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      gridTemplateColumns: {
        'sidebar-main': '500px 1fr',
      }
    },
  },
  plugins: [],
}

