export const baseUnitData = {
  melee: {
    unitType: "melee",
    name: "Melee",
    nameSymbol: "⚔️",
    description: "Attack and health are roughly balanced.",
    attack: 6,
    maxHealth: 10,
  },
  pewpew: {
    unitType: "pewpew",
    name: "Pewpew",
    nameSymbol: "🏹",
    description: "Great attack but not much health.",
    attack: 9,
    maxHealth: 7,
  },
  tanky: {
    unitType: "tanky",
    name: "Tanky",
    nameSymbol: "🛡️",
    description: "Low attack but lots of health.",
    attack: 4,
    maxHealth: 15,
  },
};

export const unitCostsData = {
  melee: {
    freeworkers: 1,
    wood: 2,
    stone: 2,
    metal: 0,
  },
  pewpew: {
    freeworkers: 1,
    wood: 2,
    stone: 0,
    metal: 2,
  },
  tanky: {
    freeworkers: 1,
    wood: 0,
    stone: 2,
    metal: 2,
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
