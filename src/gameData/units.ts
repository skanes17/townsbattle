export const baseUnitData = {
  melee: {
    unitType: "melee",
    name: "Melee",
    nameSymbol: "⚔️",
    description: "Attack and health are roughly balanced.",
    attack: 6,
    maxHealth: 10,
    resourceCosts: { workers: 1, wood: 2, stone: 2 },
    hitsFirst: false,
    amountToReduceIncomingDamage: 0,
    timesSelectedForCombat: 0,
  },
  pewpew: {
    unitType: "pewpew",
    name: "Pewpew",
    nameSymbol: "🏹",
    description:
      "Low attack, but attacks first if matched against a different unit type.",
    // decrease the attack but it attacks first
    attack: 3,
    maxHealth: 7,
    resourceCosts: { workers: 1, wood: 2, metal: 2 },
    hitsFirst: true,
    amountToReduceIncomingDamage: 0,
    timesSelectedForCombat: 0,
  },
  tanky: {
    unitType: "tanky",
    name: "Tanky",
    nameSymbol: "🛡️",
    description: "Low attack but lots of health.",
    attack: 4,
    maxHealth: 15,
    resourceCosts: { workers: 1, stone: 2, metal: 2 },
    hitsFirst: false,
    amountToReduceIncomingDamage: 1,
    timesSelectedForCombat: 0,
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
