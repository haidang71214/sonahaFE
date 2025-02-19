import { heroui } from "@heroui/theme";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

module.exports = {
   content: [
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
      flowbite.content(),
   ],
   theme: {
      extend: {
         fontFamily: {
            sans: ["var(--font-sans)"],
            mono: ["var(--font-mono)"],
         },
      },
   },
   darkMode: "class",
   plugins: [heroui(), flowbite.plugin()],
};
