// TODO: Add in effect description? eg "Extra damage when unharmed"

export const baseUnitData = {
  farmer: {
    unitType: "farmer",
    name: "Farmer",
    symbol: "🧑🏻‍🌾",
    description: "Great at farming! Terrible at fighting.",
    bgImage: "bg-farmer",
    threatLevel: 0.5,
    attack: 2,
    maxHealth: 1,
    armor: 0,
    resourceCosts: { workers: 1, wood: 1, stone: 1, metal: 1 },
    buildScore: 2,
    hitsFirst: false,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
  melee: {
    unitType: "melee",
    name: "Melee",
    symbol: "⚔️",
    description: "Simple. Effective.",
    bgImage: "bg-knight",
    threatLevel: 1,
    attack: 6,
    maxHealth: 10,
    armor: 0,
    resourceCosts: { workers: 1, wood: 2, stone: 2 },
    buildScore: 10,
    hitsFirst: false,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
  pewpew: {
    unitType: "pewpew",
    name: "Pewpew",
    symbol: "🏹",
    description: "Attacks first against most unit types.",
    bgImage: "bg-archer",
    threatLevel: 1.5,
    // decrease the attack but it attacks first
    attack: 4,
    maxHealth: 7,
    armor: 0,
    resourceCosts: { workers: 1, wood: 3, metal: 2 },
    buildScore: 15,
    hitsFirst: true,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
  tanky: {
    unitType: "tanky",
    name: "Tanky",
    symbol: "🛡️",
    description: "Uses armor to reduce incoming damage.",
    bgImage: "bg-knight",
    threatLevel: 1.5,
    attack: 4,
    maxHealth: 15,
    armor: 1,
    resourceCosts: { workers: 1, stone: 3, metal: 3 },
    buildScore: 15,
    hitsFirst: false,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
  // TODO: Consider allowing an armor buff for first hit, eg no damage when first hit
  mage: {
    unitType: "mage",
    name: "Mage",
    symbol: "🪄",
    description: "A fragile ward makes them fearsome while unharmed.",
    bgImage: "bg-mage",
    threatLevel: 2,
    attack: 6,
    maxHealth: 7,
    armor: 0,
    resourceCosts: { workers: 1, stone: 3, metal: 2, crystal: 3 },
    buildScore: 20,
    hitsFirst: false,
    fullHealthAttackBonus: 10,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
  bombird: {
    unitType: "bombird",
    name: "Bombird",
    symbol: "💣",
    description: "Huge damage but self-destructs!",
    bgImage: "bg-bomber",
    threatLevel: 3,
    attack: 20,
    maxHealth: 1,
    armor: 0,
    resourceCosts: { workers: 1, wood: 3, stone: 3, metal: 2, crystal: 2 },
    buildScore: 25,
    hitsFirst: false,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
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
