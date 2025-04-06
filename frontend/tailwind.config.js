import { heroui } from "@heroui/react";

// Theme customization for NextUI is described in
// https://nextui.org/docs/customization/create-theme
// Find theme colors using https://colors.eva.design/
// and https://nextui-themegen.netlify.app/#

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    heroui(),
  ],
};
