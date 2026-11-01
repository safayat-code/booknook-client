/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "booknookdark",
    themes: [
      {
        booknook: {
          primary: "#17484A",
          "primary-content": "#F2F7F5",
          secondary: "#B8892B",
          "secondary-content": "#241800",
          accent: "#7A2E3A",
          "accent-content": "#FBF1F2",
          neutral: "#12292B",
          "neutral-content": "#E6EFEC",
          "base-100": "#F8FAF9",
          "base-200": "#EAF0EE",
          "base-300": "#D5E0DD",
          "base-content": "#12292B",
          info: "#2F6F9F",
          success: "#2F7D5B",
          warning: "#B8892B",
          error: "#B23A48",
        },
        booknookdark: {
          primary: "#74BDB4",
          "primary-content": "#06201F",
          secondary: "#D8A94A",
          "secondary-content": "#2A1C00",
          accent: "#D9808C",
          "accent-content": "#2B0A10",
          neutral: "#0B1617",
          "neutral-content": "#E3EDEA",
          "base-100": "#0F1D1F",
          "base-200": "#142628",
          "base-300": "#1F3639",
          "base-content": "#E3EDEA",
          info: "#6AA8D6",
          success: "#5FBF95",
          warning: "#D8A94A",
          error: "#E0707C",
        },
      },
    ],
  },
};
