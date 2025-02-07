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
    },
  },
  plugins: [],
};
