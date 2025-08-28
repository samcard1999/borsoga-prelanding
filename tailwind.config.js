/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
      },
      borderWidth: {
        DEFAULT: '0.5px', // <- ahora border y border-t/-b/-l/-r serán de 1.5px
      },
    },
  },
  plugins: [],
}

