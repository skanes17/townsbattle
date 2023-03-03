/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        archeryHut: "url('/src/assets/images/archeryHut-01.png')",
        crystal: "url('/src/assets/images/crystalQuarry-01.png')",
        /* enemyArmy: "url('/src/assets/images/enemyArmy-02.png')",
        friendlyArmy: "url('/src/assets/images/friendlyArmy-01.png')", */
        explosivesResearch:
          "url('/src/assets/images/explosivesResearch-01.png')",
        gold: "url('/src/assets/images/goldHoard-01.png')",
        healingChamber: "url('/src/assets/images/healingChamber-01.png')",
        mageSchool: "url('/src/assets/images/mageSchool-01.png')",
        mainMenu: "url('/src/assets/images/mainMenu-01.png')",
        mealHall: "url('/src/assets/images/mealHall-01.png')",
        metal: "url('/src/assets/images/metal-01.png')",
        qualityHousing: "url('/src/assets/images/qualityHousing-01.png')",
        resources: "url('/src/assets/images/resources-01.png')",
        scoutUnit: "url('/src/assets/images/scoutUnit-02.png')",
        smelter: "url('/src/assets/images/smelter-01.png')",
        stone: "url('/src/assets/images/stone-01.png')",
        swordsmithy: "url('/src/assets/images/swordsmithy-01.png')",
        townCenter: "url('/src/assets/images/townCenter-01.png')",
        wood: "url('/src/assets/images/wood-01.png')",
      },
      colors: {
        buildingsColor: "#2f3e66",
        resourcesColor: "#482110",
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
