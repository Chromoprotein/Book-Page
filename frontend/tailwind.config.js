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
        playfair: ['"Playfair Display"', 'serif'],
        merriweather: ['Merriweather', 'serif'],
      },
    }
  },
  plugins: [],
}