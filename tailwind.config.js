/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        archer: "url('/src/assets/images/archer-01.jpg')",
        archerSm: "url('/src/assets/images/archer-01-128px.jpg')",
        archerMd: "url('/src/assets/images/archer-01-256px.jpg')",
        archerLg: "url('/src/assets/images/archer-01-512px.jpg')",
        archeryHut: "url('/src/assets/images/archeryHut-01.jpg')",
        archeryHutSm: "url('/src/assets/images/archeryHut-01-128px.jpg')",
        archeryHutMd: "url('/src/assets/images/archeryHut-01-256px.jpg')",
        archeryHutLg: "url('/src/assets/images/archeryHut-01-512px.jpg')",
        army: "url('/src/assets/images/army-01.jpg')",
        armySm: "url('/src/assets/images/army-01-128px.jpg')",
        armyMd: "url('/src/assets/images/army-01-256px.jpg')",
        armyLg: "url('/src/assets/images/army-01-512px.jpg')",
        bomber: "url('/src/assets/images/bomber-01.jpg')",
        bomberSm: "url('/src/assets/images/bomber-01-128px.jpg')",
        bomberMd: "url('/src/assets/images/bomber-01-256px.jpg')",
        bomberLg: "url('/src/assets/images/bomber-01-512px.jpg')",
        brown: "url('/src/assets/images/brown-01.png')",
        buildings: "url('/src/assets/images/buildings-01.jpg')",
        buildingsSm: "url('/src/assets/images/buildings-01-128px.jpg')",
        buildingsMd: "url('/src/assets/images/buildings-01-256px.jpg')",
        buildingsLg: "url('/src/assets/images/buildings-01-512px.jpg')",
        dirt: "url('/src/assets/images/dirt.jpg')",
        crystal: "url('/src/assets/images/crystal-01.jpg')",
        crystalSm: "url('/src/assets/images/crystal-01-128px.jpg')",
        crystalMd: "url('/src/assets/images/crystal-01-256px.jpg')",
        crystalLg: "url('/src/assets/images/crystal-01-512px.jpg')",
        /* enemyArmy: "url('/src/assets/images/enemyArmy-02.jpg')",
        friendlyArmy: "url('/src/assets/images/friendlyArmy-01.jpg')", */
        explosivesResearch:
          "url('/src/assets/images/explosivesResearch-01.jpg')",
        explosivesResearchSm:
          "url('/src/assets/images/explosivesResearch-01-128px.jpg')",
        explosivesResearchMd:
          "url('/src/assets/images/explosivesResearch-01-256px.jpg')",
        explosivesResearchLg:
          "url('/src/assets/images/explosivesResearch-01-512px.jpg')",
        fighter: "url('/src/assets/images/fighter-01.jpg')",
        fighterSm: "url('/src/assets/images/fighter-01-128px.jpg')",
        fighterMd: "url('/src/assets/images/fighter-01-256px.jpg')",
        fighterLg: "url('/src/assets/images/fighter-01-512px.jpg')",
        gold: "url('/src/assets/images/gold-01.jpg')",
        goldSm: "url('/src/assets/images/gold-01-128px.jpg')",
        goldMd: "url('/src/assets/images/gold-01-256px.jpg')",
        goldLg: "url('/src/assets/images/gold-01-512px.jpg')",
        healingChamber: "url('/src/assets/images/healingChamber-01.jpg')",
        healingChamberSm:
          "url('/src/assets/images/healingChamber-01-128px.jpg')",
        healingChamberMd:
          "url('/src/assets/images/healingChamber-01-256px.jpg')",
        healingChamberLg:
          "url('/src/assets/images/healingChamber-01-512px.jpg')",
        knight: "url('/src/assets/images/knight-01.jpg')",
        knightSm: "url('/src/assets/images/knight-01-128px.jpg')",
        knightMd: "url('/src/assets/images/knight-01-256px.jpg')",
        knightLg: "url('/src/assets/images/knight-01-512px.jpg')",
        mage: "url('/src/assets/images/mage-01.jpg')",
        mageSm: "url('/src/assets/images/mage-01-128px.jpg')",
        mageMd: "url('/src/assets/images/mage-01-256px.jpg')",
        mageLg: "url('/src/assets/images/mage-01-512px.jpg')",
        mageSchool: "url('/src/assets/images/mageSchool-01.jpg')",
        mageSchoolSm: "url('/src/assets/images/mageSchool-01-128px.jpg')",
        mageSchoolMd: "url('/src/assets/images/mageSchool-01-256px.jpg')",
        mageSchoolLg: "url('/src/assets/images/mageSchool-01-512px.jpg')",
        mainMenu: "url('/src/assets/images/mainMenu-01.jpg')",
        mainMenuSm: "url('/src/assets/images/mainMenu-01-128px.jpg')",
        mainMenuMd: "url('/src/assets/images/mainMenu-01-256px.jpg')",
        mainMenuLg: "url('/src/assets/images/mainMenu-01-512px.jpg')",
        mealHall: "url('/src/assets/images/mealHall-01.jpg')",
        mealHallSm: "url('/src/assets/images/mealHall-01-128px.jpg')",
        mealHallMd: "url('/src/assets/images/mealHall-01-256px.jpg')",
        mealHallLg: "url('/src/assets/images/mealHall-01-512px.jpg')",
        metal: "url('/src/assets/images/metal-01.jpg')",
        metalSm: "url('/src/assets/images/metal-01-128px.jpg')",
        metalMd: "url('/src/assets/images/metal-01-256px.jpg')",
        metalLg: "url('/src/assets/images/metal-01-512px.jpg')",
        planning: "url('/src/assets/images/planning-01.jpg')",
        planningSm: "url('/src/assets/images/planning-01-128px.jpg')",
        planningMd: "url('/src/assets/images/planning-01-256px.jpg')",
        planningLg: "url('/src/assets/images/planning-01-512px.jpg')",
        qualityHousing: "url('/src/assets/images/qualityHousing-01.jpg')",
        qualityHousingSm:
          "url('/src/assets/images/qualityHousing-01-128px.jpg')",
        qualityHousingMd:
          "url('/src/assets/images/qualityHousing-01-256px.jpg')",
        qualityHousingLg:
          "url('/src/assets/images/qualityHousing-01-512px.jpg')",
        resources: "url('/src/assets/images/resources-01.jpg')",
        resourcesSm: "url('/src/assets/images/resources-01-128px.jpg')",
        resourcesMd: "url('/src/assets/images/resources-01-256px.jpg')",
        resourcesLg: "url('/src/assets/images/resources-01-512px.jpg')",
        scoutUnit: "url('/src/assets/images/scoutUnit-01.jpg')",
        scoutUnitSm: "url('/src/assets/images/scoutUnit-01-128px.jpg')",
        scoutUnitMd: "url('/src/assets/images/scoutUnit-01-256px.jpg')",
        scoutUnitLg: "url('/src/assets/images/scoutUnit-01-512px.jpg')",
        smelter: "url('/src/assets/images/smelter-01.jpg')",
        smelterSm: "url('/src/assets/images/smelter-01-128px.jpg')",
        smelterMd: "url('/src/assets/images/smelter-01-256px.jpg')",
        smelterLg: "url('/src/assets/images/smelter-01-512px.jpg')",
        stone: "url('/src/assets/images/stone-02.jpg')",
        stoneSm: "url('/src/assets/images/stone-02-128px.jpg')",
        stoneMd: "url('/src/assets/images/stone-02-256px.jpg')",
        stoneLg: "url('/src/assets/images/stone-02-512px.jpg')",
        swordsmithy: "url('/src/assets/images/swordsmithy-01.jpg')",
        swordsmithySm: "url('/src/assets/images/swordsmithy-01-128px.jpg')",
        swordsmithyMd: "url('/src/assets/images/swordsmithy-01-256px.jpg')",
        swordsmithyLg: "url('/src/assets/images/swordsmithy-01-512px.jpg')",
        archerSm: "url('/src/assets/images/archer-01-128px.jpg')",
        archerMd: "url('/src/assets/images/archer-01-256px.jpg')",
        archerLg: "url('/src/assets/images/archer-01-512px.jpg')",
        tips: "url('/src/assets/images/tips-01.jpg')",
        tipsSm: "url('/src/assets/images/tips-01-128px.jpg')",
        tipsMd: "url('/src/assets/images/tips-01-256px.jpg')",
        tipsLg: "url('/src/assets/images/tips-01-512px.jpg')",
        townCenter: "url('/src/assets/images/townCenter-01.jpg')",
        townCenterSm: "url('/src/assets/images/townCenter-01-128px.jpg')",
        townCenterMd: "url('/src/assets/images/townCenter-01-256px.jpg')",
        townCenterLg: "url('/src/assets/images/townCenter-01-512px.jpg')",
        training: "url('/src/assets/images/training-01.jpg')",
        trainingSm: "url('/src/assets/images/training-01-128px.jpg')",
        trainingMd: "url('/src/assets/images/training-01-256px.jpg')",
        trainingLg: "url('/src/assets/images/training-01-512px.jpg')",
        uwuu: "url('/src/assets/images/uwuu-01.jpg')",
        uwuuSm: "url('/src/assets/images/uwuu-01-128px.jpg')",
        uwuuMd: "url('/src/assets/images/uwuu-01-256px.jpg')",
        uwuuLg: "url('/src/assets/images/uwuu-01-512px.jpg')",
        villager: "url('/src/assets/images/villager-01.jpg')",
        villagerSm: "url('/src/assets/images/villager-01-128px.jpg')",
        villagerMd: "url('/src/assets/images/villager-01-256px.jpg')",
        villagerLg: "url('/src/assets/images/villager-01-512px.jpg')",
        wood: "url('/src/assets/images/wood-01.jpg')",
        woodSm: "url('/src/assets/images/wood-01-128px.jpg')",
        woodMd: "url('/src/assets/images/wood-01-256px.jpg')",
        woodLg: "url('/src/assets/images/wood-01-512px.jpg')",
        worker: "url('/src/assets/images/worker-01.jpg')",
        workerSm: "url('/src/assets/images/worker-01-128px.jpg')",
        workerMd: "url('/src/assets/images/worker-01-256px.jpg')",
        workerLg: "url('/src/assets/images/worker-01-512px.jpg')",
      },
      colors: {
        buildingsColor: "#2f3e66",
        lightResourcesColor: "#32170B",
        darkResourcesColor: "#210F07",
        deepRed: "#9E1A1A",
        deepRedLighter: "#D32222",
        deepRedDarker: "#7B1414",
      },
      fontFamily: {
        emoji: ['"Noto Color Emoji"'],
        math: ['"Noto Sans Math"'],
        roboto: ['"Open Sans"'],
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
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
