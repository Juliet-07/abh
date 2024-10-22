/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryThin: ["Thin"],
        primaryRegular: ["Regular"],
        primaryMedium: ["Medium"],
        primarySemibold: ["SemiBold"],
        primaryBold: ["Bold"],
      },
    },
  },
  plugins: [],
};
