export const buildingsData = {
  // for melee
  swordsmithy: {
    name: "Swordsmithy",
    nameSymbol: "🗡️",
    // "enabled" means it can be seen in the game. This feature is not yet active.
    // Maybe all additional buildings become available to unlock after their first combat?
    enabled: true,
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 2,
    healthBonus: 2,
    description: "Craft swords. Unlock Fighters.",
    bgImage: "bg-swordsmithy",
    health: 2,
    resourceCosts: { workers: 5, wood: 10, stone: 10 },
    unlockedUnit: "melee",
  },
  // for pewpew
  archeryHut: {
    name: "Archery Hut",
    nameSymbol: "🎯",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 3,
    healthBonus: -1,
    description: "Recover ancient knowledge, for a price! Unlock Archers.",
    bgImage: "bg-archeryHut",
    health: 2,
    resourceCosts: { workers: 5, wood: 10, metal: 10 },
    unlockedUnit: "pewpew",
  },
  // for tanky
  smelter: {
    name: "Smelter",
    nameSymbol: "🛡️",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 1,
    healthBonus: 3,
    description: "Learn to smelt metals. Unlock Tanks.",
    bgImage: "bg-smelter",
    health: 2,
    resourceCosts: { workers: 5, stone: 10, metal: 10 },
    unlockedUnit: "tanky",
  },
  // for all units
  mealHall: {
    name: "Meal Hall",
    nameSymbol: "🍖",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 0,
    healthBonus: 2,
    armorBonus: 0,
    description: "All units gain +2 to health, +2 to armor.",
    bgImage: "bg-mealHall",
    health: 2,
    resourceCosts: { workers: 5, wood: 10, stone: 10, metal: 10 },
  },
  healingChamber: {
    name: "Healing Chamber",
    nameSymbol: "🩸",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 0,
    healthBonus: 0,
    armorBonus: 0,
    description: "Heals units after combat.",
    bgImage: "bg-healingChamber",
    health: 2,
    resourceCosts: { workers: 5, wood: 20, stone: 10, metal: 5 },
  },
  // for all units
  townCenter: {
    name: "Town Center",
    nameSymbol: "🏙️",
    /* FIXME: Path not working */
    imageSrc: "/images/town-center-01.png",
    enabled: false,
    underConstruction: false,
    constructed: true,
    tier: 1,
    attackBonus: 0,
    description: "Losing this building means game over!",
    bgImage: "bg-townCenter",
    healthBonus: 0,
    health: 3,
    resourceCosts: {},
  },
  scoutUnit: {
    name: "Scout Unit",
    nameSymbol: "🔍",
    enabled: false,
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 0,
    description: "Upgrade intel on the enemy army.",
    bgImage: "bg-scoutUnit",
    healthBonus: 0,
    health: 2,
    resourceCosts: { workers: 10, wood: 15, stone: 15, metal: 15 },
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
