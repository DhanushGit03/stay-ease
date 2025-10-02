/** @type {import('tailwindcss').Config} */
export default {
  // the below specifies the files we want to apply tailwind css to
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        md:"10rem"
      }
    },
    animate: "pulse 5s",
},
  plugins: [],
}

