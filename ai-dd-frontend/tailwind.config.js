/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(59, 130, 246)",
        background: "rgb(15, 23, 42)",
        card: "rgb(30, 41, 59)",
      },
    },
  },
  plugins: [],
};
