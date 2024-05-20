/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/src/assets/hero.webp')",
        'book-texture': "url('/src/assets/texture.webp')",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      gridAutoRows: {
        'fr': 'minmax(0, 1fr)',
      },
    }
  },
  plugins: [],
}