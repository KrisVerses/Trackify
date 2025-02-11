module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        softGreen: "#9DD0B2", // Light green shade
        mediumGreen: "#88c7a8", // Medium green shade
        darkGreen: "#597263", // Dark green shade
        darkerGreen: "#43584D", // Dark green shade
        accentGreen: "#3b6f4e", // Accent dark green shade
        veryDarkGreen: "#1F3028",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
