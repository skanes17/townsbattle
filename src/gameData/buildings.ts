/* TODO: Add a building which adds to number of workers per turn */

import { Buildings } from "../types";

export const buildingsData: Buildings = {
  // for all units
  townCenter: {
    name: "Town Center",
    symbol: "🏙️",
    /* FIXME: Path not working */
    imageSrc: "/images/town-center-01.jpg",
    enabled: false,
    underConstruction: false,
    constructed: true,
    tier: 1,
    /* attackBonus: 0,
    healthBonus: 0, */
    description: "Losing this building means game over!",
    buildScore: 0,
    bgImage: "bg-townCenter",
    bgImageSm: "bg-townCenterSm",
    bgImageMd: "bg-townCenterMd",
    bgImageLg: "bg-townCenterLg",
    maxHealth: 21,
    currentHealth: 21,
    damage: 0,
    resourceCosts: {},
    unlockedUnit: "villager",
  },
  // for fighter
  swordsmithy: {
    name: "Swordsmithy",
    symbol: "🗡️",
    // "enabled" means it can be seen in the game. This feature is not yet active.
    // Maybe all additional buildings become available to unlock after their first combat?
    enabled: true,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 2,
    healthBonus: 2, */
    description: "Craft swords! Unlock Fighters.",
    bgImage: "bg-swordsmithy",
    bgImageSm: "bg-swordsmithySm",
    bgImageMd: "bg-swordsmithyMd",
    bgImageLg: "bg-swordsmithyLg",
    maxHealth: 2,
    currentHealth: 2,
    damage: 0,
    resourceCosts: { workers: 5, wood: 10, stone: 10 },
    buildScore: 250,
    unlockedUnit: "fighter",
  },
  // for archer
  archeryHut: {
    name: "Archery Hut",
    symbol: "🎯",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 3,
    healthBonus: -1, */
    description: "Learn ranged combat! Unlock Archers.",
    bgImage: "bg-archeryHut",
    bgImageSm: "bg-archeryHutSm",
    bgImageMd: "bg-archeryHutMd",
    bgImageLg: "bg-archeryHutLg",
    maxHealth: 3,
    currentHealth: 3,
    damage: 0,
    resourceCosts: { workers: 5, wood: 15, metal: 10 },
    buildScore: 300,
    unlockedUnit: "archer",
  },
  scoutUnit: {
    name: "Scout Unit",
    symbol: "🔍",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 0,
      healthBonus: 0, */
    description: "Get Scout Reports on the enemy army before each Combat.",
    bgImage: "bg-scoutUnit",
    bgImageSm: "bg-scoutUnitSm",
    bgImageMd: "bg-scoutUnitMd",
    bgImageLg: "bg-scoutUnitLg",
    maxHealth: 3,
    currentHealth: 3,
    damage: 0,
    resourceCosts: { workers: 5, wood: 10, stone: 10, metal: 10 },
    buildScore: 350,
  },
  // add workers
  qualityHousing: {
    name: "Quality Housing",
    symbol: "🏘️",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 2,
    /* attackBonus: 0,
        healthBonus: 2, */
    description: "Greatly the number of workers available per turn.",
    bgImage: "bg-qualityHousing",
    bgImageSm: "bg-qualityHousingSm",
    bgImageMd: "bg-qualityHousingMd",
    bgImageLg: "bg-qualityHousingLg",
    maxHealth: 7,
    currentHealth: 7,
    damage: 0,
    resourceCosts: { workers: 5, wood: 10, stone: 10, metal: 15 },
    buildScore: 400,
    // how many extra workers it provides once constructed -- tweak as necessary
    workerBonus: 10,
  },
  // for knight
  smelter: {
    name: "Smelter",
    symbol: "🛡️",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 2,
    /* attackBonus: 1,
    healthBonus: 3, */
    description: "Learn to smelt metals! Unlock Knights.",
    bgImage: "bg-smelter",
    bgImageSm: "bg-smelterSm",
    bgImageMd: "bg-smelterMd",
    bgImageLg: "bg-smelterLg",
    maxHealth: 4,
    currentHealth: 4,
    damage: 0,
    resourceCosts: { workers: 10, stone: 30, metal: 30 },
    buildScore: 700,
    unlockedUnit: "knight",
  },
  healingChamber: {
    name: "Healing Chamber",
    symbol: "🩸",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 2,
    /* attackBonus: 0,
    healthBonus: 0, */
    description: "Heal all surviving units when combats ends.",
    bgImage: "bg-healingChamber",
    bgImageSm: "bg-healingChamberSm",
    bgImageMd: "bg-healingChamberMd",
    bgImageLg: "bg-healingChamberLg",
    maxHealth: 3,
    currentHealth: 3,
    damage: 0,
    resourceCosts: { workers: 10, wood: 10, stone: 20, metal: 10 },
    buildScore: 500,
  },
  crystalQuarry: {
    name: "Crystal Quarry",
    symbol: "⛏️",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 3,
    /* attackBonus: 0,
    healthBonus: 0, */
    description: "Find a new resource! Unlock new buildings and units.",
    bgImage: "bg-crystal",
    bgImageSm: "bg-crystalSm",
    bgImageMd: "bg-crystalMd",
    bgImageLg: "bg-crystalLg",
    maxHealth: 5,
    currentHealth: 5,
    damage: 0,
    resourceCosts: { workers: 15, wood: 20, stone: 40, metal: 45 },
    buildScore: 1200,
    unlockedResource: "crystal",
  },
  // for mages
  mageSchool: {
    name: "Mage School",
    symbol: "🔮",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 3,
    /* attackBonus: 1,
    healthBonus: 3, */
    description: "Learn magic! Unlock Mages.",
    bgImage: "bg-mageSchool",
    bgImageSm: "bg-mageSchoolSm",
    bgImageMd: "bg-mageSchoolMd",
    bgImageLg: "bg-mageSchoolLg",
    maxHealth: 4,
    currentHealth: 4,
    damage: 0,
    resourceCosts: { workers: 15, stone: 15, metal: 10, crystal: 20 },
    buildScore: 600,
    unlockedUnit: "mage",
  },
  // for bombirds
  explosivesResearch: {
    name: "Explosives Research",
    symbol: "🔥",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 3,
    /* attackBonus: 1,
    healthBonus: 3, */
    description: "Explosives go boom! Unlock Bombirds.",
    bgImage: "bg-explosivesResearch",
    bgImageSm: "bg-explosivesResearchSm",
    bgImageMd: "bg-explosivesResearchMd",
    bgImageLg: "bg-explosivesResearchLg",
    maxHealth: 5,
    currentHealth: 5,
    damage: 0,
    resourceCosts: { workers: 15, wood: 15, stone: 15, metal: 15, crystal: 15 },
    buildScore: 750,
    unlockedUnit: "bombird",
  },
  // for all units
  mealHall: {
    name: "Meal Hall",
    symbol: "🍖",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 3,
    /* attackBonus: 0,
        healthBonus: 2, */
    description: "+2 to all unit stats.",
    bgImage: "bg-mealHall",
    bgImageSm: "bg-mealHallSm",
    bgImageMd: "bg-mealHallMd",
    bgImageLg: "bg-mealHallLg",
    maxHealth: 3,
    currentHealth: 3,
    damage: 0,
    resourceCosts: { workers: 15, wood: 20, stone: 20, metal: 20, crystal: 10 },
    buildScore: 850,
  },
  goldHoard: {
    name: "Gold Hoard",
    symbol: "🐉",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 0,
    healthBonus: 0, */
    description: "Unlocks gold as a resource, +100 score per gold.",
    bgImage: "bg-gold",
    bgImageSm: "bg-goldSm",
    bgImageMd: "bg-goldMd",
    bgImageLg: "bg-goldLg",
    maxHealth: 2,
    currentHealth: 2,
    damage: 0,
    resourceCosts: {
      workers: 15,
      wood: 30,
      stone: 30,
      metal: 30,
      crystal: 30,
    },
    buildScore: 10000,
    unlockedResource: "gold",
  },
};

/* export const buildingCostsData = {
  swordsmithy: {
    workers: 5,
    wood: 10,
    stone: 10,
    metal: 0,
  },
  // for archer
  archeryHut: {
    workers: 5,
    wood: 10,
    stone: 0,
    metal: 10,
  },
  // for knight
  armorsmithy: {
    workers: 5,
    wood: 0,
    stone: 10,
    metal: 10,
  },
  // for all units
  mealHall: {
    workers: 5,
    wood: 10,
    stone: 10,
    metal: 10,
  },
  healingChamber: {
    workers: 5,
    wood: 10,
    stone: 10,
    metal: 10,
  },
  // for all units
  townCenter: {
    workers: 0,
    wood: 0,
    stone: 0,
    metal: 0,
  },
  scoutUnit: {
    workers: 10,
    wood: 15,
    stone: 15,
    metal: 15,
  },
};
 */
