/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#f7f1e3',
        sand: '#ede4d3',
        'sand-deep': '#e1d4ba',
        olive: '#3d4a2a',
        'olive-soft': '#6b7553',
        'olive-mute': '#a4b18b',
        amber: '#d97a3c',
        ember: '#b85829',
        rule: '#cdbfa3',
        'rule-dark': '#4a5832',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: { none: '0' },
    },
  },
  plugins: [],
};
