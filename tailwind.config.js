/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      container: {
        padding: "1rem",
        center: true,
        screens: {
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
        },
      },
      textUnderlineOffset: {
        6: "6px",
      },
    },
  },
  corePlugins: {
    // preflight: false,
  },
  plugins: [require("tailwindcss-primeui")],
};
