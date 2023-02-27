export const baseUnitData = {
  melee: {
    unitType: "melee",
    name: "Melee",
    symbol: "⚔️",
    description: "Simple. Effective.",
    attack: 6,
    maxHealth: 10,
    resourceCosts: { workers: 1, wood: 2, stone: 2 },
    buildScore: 10,
    hitsFirst: false,
    armor: 0,
    fullHealthAttackBonus: 0,
    timesSelectedForCombat: 0,
  },
  pewpew: {
    unitType: "pewpew",
    name: "Pewpew",
    symbol: "🏹",
    description: "Attacks first against most unit types.",
    // decrease the attack but it attacks first
    attack: 5,
    maxHealth: 7,
    resourceCosts: { workers: 1, wood: 2, metal: 2 },
    buildScore: 15,
    hitsFirst: true,
    fullHealthAttackBonus: 0,
    armor: 0,
    timesSelectedForCombat: 0,
  },
  tanky: {
    unitType: "tanky",
    name: "Tanky",
    symbol: "🛡️",
    description: "Uses armor to reduce incoming damage.",
    attack: 4,
    maxHealth: 15,
    resourceCosts: { workers: 1, stone: 2, metal: 2 },
    buildScore: 15,
    hitsFirst: false,
    fullHealthAttackBonus: 0,
    armor: 1,
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
