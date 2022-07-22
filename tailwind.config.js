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
            transform: "translate(0)",
          },
          "100%": {
            transform: "translate(90vw)",
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
