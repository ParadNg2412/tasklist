import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height:{
        '600': '37.5rem',
        '640': '40rem',
        '645': '40.313rem',
        '649': '40.563rem',
        '650': '40.625rem',
        '660': '41.25rem',
        '680': '42.5rem',
        '700': '43.75rem',
      },
    },
  },
  plugins: [],
};
export default config;
