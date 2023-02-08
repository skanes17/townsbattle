/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        army: "url('/src/images/homeBackground-01.png')",
        townCenter: "url('/src/images/townCenter-01.png')",
        archeryHut: "url('/src/images/archeryHut-01.png')",
        healingChamber: "url('/src/images/healingChamber-01.png')",
        mealHall: "url('/src/images/mealHall-01.png')",
        swordsmithy: "url('/src/images/swordsmithy-01.png')",
        townCenter: "url('/src/images/townCenter-01.png')",
      },
      keyframes: {
        jiggleRight: {
          "50%": { transform: "translate(10px,0)" },
        },
        jiggleLeft: {
          "50%": { transform: "translate(10px,0)" },
        },
      },
      animation: {
        "attack-right": "jiggleRight 0.25s linear 1",
        "attack-left": "jiggleLeft 0.25s linear 1",
      },
    },
  },
  plugins: [],
};
