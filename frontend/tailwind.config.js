/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/src/assets/hero.webp')",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        merriweather: ['Merriweather', 'serif'],
      },
    }
  },
  plugins: [],
}