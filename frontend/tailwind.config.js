/** @type {import('tailwindcss').Config} */
export default {
  // Activa dark mode mediante la clase 'dark' en el elemento <html>
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
