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
    heroui({
      themes: {
        light: {
            colors: {
                default: {
                  50: "#e9f2ff",
                  100: "#cedfee",
                  200: "#b5c8dc",
                  300: "#99b1c9",
                  400: "#849fb9",
                  500: "#6f8daa",
                  600: "#617e98",
                  700: "#506980",
                  800: "#41566a",
                  900: "#2e4051",
                  foreground: "#000",
                  DEFAULT: "#cedfee",
                },
                primary: {
                  50: "#e2f4f7",
                  100: "#b7e5ea",
                  200: "#8dd4dc",
                  300: "#67c2ce",
                  400: "#4db7c5",
                  500: "#3fabbd",
                  600: "#3b9cab",
                  700: "#358893",
                  800: "#2f747c",
                  900: "#235254",
                  foreground: "#fff",
                  DEFAULT: "#4db7c5",
                }
              }
            }
          }

    }),
  ],
};
