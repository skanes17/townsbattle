/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        archer: "url('/src/assets/images/archer-01.jpg')",
        archeryHut: "url('/src/assets/images/archeryHut-01.jpg')",
        army: "url('/src/assets/images/army-01.jpg')",
        bomber: "url('/src/assets/images/bomber-01.jpg')",
        brown: "url('/src/assets/images/brown.png')",
        buildings: "url('/src/assets/images/buildings-01.jpg')",
        dirt: "url('/src/assets/images/dirt.jpg')",
        crystal: "url('/src/assets/images/crystalQuarry-01.jpg')",
        /* enemyArmy: "url('/src/assets/images/enemyArmy-02.jpg')",
        friendlyArmy: "url('/src/assets/images/friendlyArmy-01.jpg')", */
        explosivesResearch:
          "url('/src/assets/images/explosivesResearch-01.jpg')",
        farmer: "url('/src/assets/images/farmer-01.jpg')",
        fighter: "url('/src/assets/images/fighter-01.jpg')",
        gold: "url('/src/assets/images/goldHoard-01.jpg')",
        healingChamber: "url('/src/assets/images/healingChamber-01.jpg')",
        knight: "url('/src/assets/images/knight-01.jpg')",
        mage: "url('/src/assets/images/mage-01.jpg')",
        mageSchool: "url('/src/assets/images/mageSchool-01.jpg')",
        mainMenu: "url('/src/assets/images/mainMenu-01.jpg')",
        mealHall: "url('/src/assets/images/mealHall-01.jpg')",
        metal: "url('/src/assets/images/metal-01.jpg')",
        planning: "url('/src/assets/images/planning-01.jpg')",
        qualityHousing: "url('/src/assets/images/qualityHousing-01.jpg')",
        resources: "url('/src/assets/images/resources-01.jpg')",
        scoutUnit: "url('/src/assets/images/scoutUnit-02.jpg')",
        smelter: "url('/src/assets/images/smelter-01.jpg')",
        stone: "url('/src/assets/images/stone-02.jpg')",
        swordsmithy: "url('/src/assets/images/swordsmithy-01.jpg')",
        tips: "url('/src/assets/images/tips-01.jpg')",
        townCenter: "url('/src/assets/images/townCenter-01.jpg')",
        training: "url('/src/assets/images/training-01.jpg')",
        wood: "url('/src/assets/images/wood-01.jpg')",
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
      saturate: {
        25: ".25",
        75: ".75",
        125: "1.25",
        175: "1.75",
      },
    },
  },
  plugins: [],
};
