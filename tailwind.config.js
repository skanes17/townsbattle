/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        archeryHut: "url('/src/assets/images/archeryHut-01.png')",
        army: "url('/src/assets/images/homeBackground-01.png')",
        qualityHousing: "url('/src/assets/images/qualityHousing-01.png')",
        /* enemyArmy: "url('/src/assets/images/enemyArmy-02.png')",
        friendlyArmy: "url('/src/assets/images/friendlyArmy-01.png')", */
        healingChamber: "url('/src/assets/images/healingChamber-01.png')",
        mealHall: "url('/src/assets/images/mealHall-01.png')",
        scoutUnit: "url('/src/assets/images/scoutUnit-02.png')",
        smelter: "url('/src/assets/images/smelter-01.png')",
        swordsmithy: "url('/src/assets/images/swordsmithy-01.png')",
        townCenter: "url('/src/assets/images/townCenter-01.png')",
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
