/* TODO: Add a building which adds to number of workers per turn */

export const buildingsData = {
  // for melee
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
    description: "Craft swords. Unlock Fighters.",
    bgImage: "bg-swordsmithy",
    health: 2,
    resourceCosts: { workers: 5, wood: 10, stone: 10 },
    buildScore: 50,
    unlockedUnit: "melee",
  },
  // for pewpew
  archeryHut: {
    name: "Archery Hut",
    symbol: "🎯",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 3,
    healthBonus: -1, */
    description: "Learn ranged combat. Unlock Archers.",
    bgImage: "bg-archeryHut",
    health: 2,
    resourceCosts: { workers: 5, wood: 10, metal: 10 },
    buildScore: 50,
    unlockedUnit: "pewpew",
  },
  // for tanky
  smelter: {
    name: "Smelter",
    symbol: "🛡️",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 1,
    healthBonus: 3, */
    description: "Learn to smelt metals. Unlock Tanks.",
    bgImage: "bg-smelter",
    health: 2,
    resourceCosts: { workers: 5, stone: 10, metal: 10 },
    buildScore: 50,
    unlockedUnit: "tanky",
  },
  // add workers
  betterHousing: {
    name: "Better Housing",
    symbol: "🏘️",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 0,
    healthBonus: 2, */
    description: "More workers available every turn.",
    bgImage: "bg-betterHousing",
    health: 2,
    resourceCosts: { workers: 5, wood: 10, stone: 10, metal: 10 },
    buildScore: 50,
    // how many extra workers it provides once constructed
    workerBonus: 1,
  },
  // for all units
  mealHall: {
    name: "Meal Hall",
    symbol: "🍖",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 0,
    healthBonus: 2, */
    description: "All units gain +2 to health, +2 to armor.",
    bgImage: "bg-mealHall",
    health: 2,
    resourceCosts: { workers: 5, wood: 10, stone: 10, metal: 10 },
    buildScore: 50,
  },
  healingChamber: {
    name: "Healing Chamber",
    symbol: "🩸",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    /* attackBonus: 0,
    healthBonus: 0, */
    description: "Heals units after combat.",
    bgImage: "bg-healingChamber",
    health: 2,
    resourceCosts: { workers: 5, wood: 20, stone: 10, metal: 5 },
    buildScore: 75,
  },
  // for all units
  townCenter: {
    name: "Town Center",
    symbol: "🏙️",
    /* FIXME: Path not working */
    imageSrc: "/images/town-center-01.png",
    enabled: false,
    underConstruction: false,
    constructed: true,
    tier: 1,
    /* attackBonus: 0,
    healthBonus: 0, */
    description: "Losing this building means game over!",
    buildScore: 0,
    bgImage: "bg-townCenter",
    health: 3,
    resourceCosts: {},
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
    description: "Upgrade intel on the enemy army.",
    bgImage: "bg-scoutUnit",
    health: 2,
    resourceCosts: { workers: 10, wood: 15, stone: 15, metal: 15 },
    buildScore: 100,
  },
};

/* export const buildingCostsData = {
  swordsmithy: {
    workers: 5,
    wood: 10,
    stone: 10,
    metal: 0,
  },
  // for pewpew
  archeryHut: {
    workers: 5,
    wood: 10,
    stone: 0,
    metal: 10,
  },
  // for tanky
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
