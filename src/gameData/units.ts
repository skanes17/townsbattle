export const baseUnitData = {
  melee: {
    unitType: "melee",
    name: "Melee",
    nameSymbol: "⚔️",
    description: "Attack and health are roughly balanced.",
    attack: 6,
    maxHealth: 10,
    canBeTrained: true,
    resourceCosts: { workers: 1, wood: 2, stone: 2 },
  },
  pewpew: {
    unitType: "pewpew",
    name: "Pewpew",
    nameSymbol: "🏹",
    description: "Great attack but not much health.",
    attack: 9,
    maxHealth: 7,
    canBeTrained: true,
    resourceCosts: { workers: 1, wood: 2, metal: 2 },
  },
  tanky: {
    unitType: "tanky",
    name: "Tanky",
    nameSymbol: "🛡️",
    description: "Low attack but lots of health.",
    attack: 4,
    maxHealth: 15,
    canBeTrained: true,
    resourceCosts: { workers: 1, stone: 2, metal: 2 },
  },
};

/* export const unitCostsData = {
  melee: {
    workers: 1,
    wood: 2,
    stone: 2,
    metal: 0,
  },
  pewpew: {
    workers: 1,
    wood: 2,
    stone: 0,
    metal: 2,
  },
  tanky: {
    workers: 1,
    wood: 0,
    stone: 2,
    metal: 2,
  },
}; */
