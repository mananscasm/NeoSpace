import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#052e1a",
        pine: "#0c4a2f",
        leaf: "#1fb56d",
        limeglow: "#c8f24a",
        mint: "#e8fff3",
        graphite: "#111815"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 80px rgba(5, 46, 26, 0.18)",
        glass: "0 18px 60px rgba(0, 0, 0, 0.22)"
      },
      backgroundImage: {
        "mesh-green":
          "radial-gradient(circle at 10% 10%, rgba(200,242,74,0.28), transparent 28%), radial-gradient(circle at 90% 20%, rgba(31,181,109,0.24), transparent 32%), linear-gradient(135deg, #052e1a 0%, #0c4a2f 48%, #ffffff 160%)"
      }
    }
  },
  plugins: []
};

export default config;
