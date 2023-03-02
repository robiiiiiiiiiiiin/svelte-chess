/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
      }
    },
  },
  safelist: [
    {
      pattern: /^(bg|border|text)-(black|white)$/,
    },
  ],
  plugins: [],
}
