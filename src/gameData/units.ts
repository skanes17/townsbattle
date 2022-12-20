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
    wood: 2,
    stone: 2,
    metal: 0,
    freeworkers: 1,
  },
  pewpew: {
    wood: 2,
    stone: 0,
    metal: 2,
    freeworkers: 1,
  },
  tanky: {
    wood: 0,
    stone: 2,
    metal: 2,
    freeworkers: 1,
  },
};
