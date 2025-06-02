/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // Adicione esta linha para garantir que todos os arquivos JSX do seu projeto sejam escaneados
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-green': '#123524',
        'dark-green': '#0e2a1c',
        'darker-green': '#0a1e15',
        'light-bg': '#F8F8FF',
        'dark-text': '#333',
        'medium-text': '#555',
        'border-color': '#CCC',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};