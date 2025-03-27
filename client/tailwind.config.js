/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#0EA8F4",
        "secondary-color": "#AF2BBF",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(+30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-30px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
