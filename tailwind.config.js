/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'var(--font-inter)',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          'var(--font-jetbrains-mono)',
          'monospace',
        ],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains-mono)', 'monospace'],
        bubbles: ['var(--font-rubik-bubbles)', 'cursive'],
      },
    },
  },
  plugins: [],
};
