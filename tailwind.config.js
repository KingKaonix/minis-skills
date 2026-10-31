/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        primary: "#ee7b11",
        "primary-soft": "#fff4e8",
        secondary: "#effbff",
        warning: "#ee7b11",
        grey: "#f9f9fb",
        dark: "#141414",
        "Dark-primary": "#0d1117",
        cream: "#fff4ce",
        darkcream: "#ffdfaf",
        success: "#37a05b",
        "Snowy-sky": "#2753c9",
        lightyellow: "#ffd44d",
        Smoke: "#f1f1f5",
        darkmode: "#0b1220",
        darklight: "#0f172a",
        midnight_text: "#102d47",
        "Sky-mist-blue": "#aec8df",
        darkborder: "#1e293b",
        border_color: "#224767",
        blue: "#1642b9",
      },
      boxShadow: {
        "card-shadow":
          "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
        glow: "0 0 0 1px rgba(238, 123, 17, 0.15), 0 18px 60px -20px rgba(238, 123, 17, 0.45)",
      },
      fontSize: {
        22: ["1.375rem", { lineHeight: "2rem" }],
        28: ["1.75rem", { lineHeight: "2.25rem" }],
        32: ["2rem", { lineHeight: "2.5rem" }],
        36: ["2.25rem", { lineHeight: "2.625rem" }],
        40: ["2.5rem", { lineHeight: "3rem" }],
        65: ["4.063rem", { lineHeight: "4.875rem" }],
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};
