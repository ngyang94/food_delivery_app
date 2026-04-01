/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF6E4E",
        secondary: "#F5F5F5",
        textPrimary: "#333333",
        textSecondary: "#777777",
        background: "#FFFFFF",
      },
      fontFamily: {
        quicksand: ["Quicksand-regular", "san-serif"],
        "quicksand-bold": ["Quicksand-bold", "san-serif"],
        "quicksand-semibold": ["Quicksand-semibold", "san-serif"],
        "quicksand-light": ["Quicksand-light", "san-serif"],
        "quicksand-medium": ["Quicksand-medium", "san-serif"],
      },
    },
  },
  plugins: [],
};
