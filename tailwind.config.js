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
        quicksand: ["Quicksand-regular"],
        "quicksand-bold": ["Quicksand-bold"],
        "quicksand-semibold": ["Quicksand-semibold"],
        "quicksand-light": ["Quicksand-light"],
        "quicksand-medium": ["Quicksand-medium"],
      },
    },
  },
  plugins: [],
};
