/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Default body text
        heading: ["Poppins", "sans-serif"], // Section headings
        mono: ["Roboto Mono", "monospace"], // Numbers / data
      },
      colors: {
        neutral: {
          bg: "#0F1115",     // page background
          card: "#1A1D23",   // card background
          hover: "#262A33",  // hover
          text: "#E5E7EB",   // main text
          subtext: "#9CA3AF" // secondary text
        },
        accent: {
          green: "#22C55E",  // neon green
          purple: "#8B5CF6", // soft purple
          cyan: "#06B6D4"    // optional cyan
        },
        status: {
          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444"
        }
      }
    }
  },
  plugins: [],
}

