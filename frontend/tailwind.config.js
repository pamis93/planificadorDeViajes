import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#42486A', // color azul-moradito
      }
    },
  },
  plugins: [flowbite.plugin()],
};
