/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        walking: {
          "0%": {
            transform: "translate(-700px)",
          },
          "100%": {
            transform: "translate(calc(100vw + 200px))",
          },
        },
      },
      animation: {
        walking: "walking 10s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
