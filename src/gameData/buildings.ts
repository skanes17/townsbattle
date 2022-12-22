export const buildingsData = {
  // for melee
  swordsmithy: {
    name: "Swordsmithy",
    nameSymbol: "🗡️",
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 2,
    healthBonus: 2,
    description: "Melee units gain +2 to attack, +2 to health.",
    health: 2,
    woodCost: 10,
    stoneCost: 10,
    metalCost: 0,
    freeworkerCost: 5,
  },
  // for pewpew
  archeryRange: {
    name: "Archery Range",
    nameSymbol: "🎯",
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 3,
    healthBonus: 1,
    description: "Pewpew units gain +3 to attack, +1 to health.",
    health: 2,
    woodCost: 10,
    stoneCost: 0,
    metalCost: 10,
    freeworkerCost: 5,
  },
  // for tanky
  armorsmithy: {
    name: "Armorsmithy",
    nameSymbol: "🛡️",
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 1,
    healthBonus: 3,
    description: "Tanky units gain +1 to attack, +3 to health.",
    health: 2,
    woodCost: 0,
    stoneCost: 10,
    metalCost: 10,
    freeworkerCost: 5,
  },
  // for all units
  mealHall: {
    name: "Meal Hall",
    nameSymbol: "🍖",
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 0,
    healthBonus: 2,
    armorBonus: 0,
    description: "All units gain +2 to health, +2 to armor.",
    health: 2,
    woodCost: 10,
    stoneCost: 10,
    metalCost: 10,
    freeworkerCost: 5,
  },
  // for all units
  townCenter: {
    name: "Town Center",
    nameSymbol: "🏙️",
    /* FIXME: Path not working */
    imageSrc: "../images/town-center.png",
    underConstruction: false,
    constructed: true,
    tier: 1,
    attackBonus: 0,
    description: "If this building is destroyed it's game over!",
    healthBonus: 0,
    health: 3,
    woodCost: 0,
    stoneCost: 0,
    metalCost: 0,
    freeworkerCost: 0,
  },
  scoutingPost: {
    name: "Scouting Post",
    nameSymbol: "🔍",
    underConstruction: false,
    constructed: false,
    tier: 1,
    attackBonus: 0,
    description: "Upgrade intel on the enemy army.",
    healthBonus: 0,
    health: 2,
    woodCost: 15,
    stoneCost: 15,
    metalCost: 15,
    freeworkerCost: 10,
  },
};

export const buildingCostsData = {
  swordsmithy: {
    freeworkers: 5,
    wood: 10,
    stone: 10,
    metal: 0,
  },
  // for pewpew
  archeryRange: {
    freeworkers: 5,
    wood: 10,
    stone: 0,
    metal: 10,
  },
  // for tanky
  armorsmithy: {
    freeworkers: 5,
    wood: 0,
    stone: 10,
    metal: 10,
  },
  // for all units
  mealHall: {
    freeworkers: 5,
    wood: 10,
    stone: 10,
    metal: 10,
  },
  // for all units
  townCenter: {
    freeworkers: 0,
    wood: 0,
    stone: 0,
    metal: 0,
  },
  scoutingPost: {
    freeworkers: 10,
    wood: 15,
    stone: 15,
    metal: 15,
  },
};
