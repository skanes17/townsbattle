// TODO: Add in effect description? eg "Extra damage when unharmed"

import { BaseUnit } from "../types";

export const baseUnitData: BaseUnit = {
  villager: {
    unitType: "villager",
    name: "Villager",
    symbol: "🧑🏻‍🌾",
    description: "Untrained, but courageous! Terrible at fighting.",
    lockedText: "Unlocked by Town Center",
    bgImage: "bg-villager",
    bgImageSm: "bg-villagerSm",
    bgImageMd: "bg-villagerMd",
    bgImageLg: "bg-villagerLg",
    threatLevel: 0.5,
    attack: 2,
    maxHealth: 1,
    armor: 0,
    resourceCosts: { workers: 1, wood: 1, stone: 1, metal: 1 },
    buildScore: 40,
    hitsFirst: false,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
  fighter: {
    unitType: "fighter",
    name: "Fighter",
    symbol: "⚔️",
    description: "Simple. Effective.",
    lockedText: "Unlocked by Swordsmithy",
    bgImage: "bg-fighter",
    bgImageSm: "bg-fighterSm",
    bgImageMd: "bg-fighterMd",
    bgImageLg: "bg-fighterLg",
    threatLevel: 1,
    attack: 6,
    maxHealth: 10,
    armor: 0,
    resourceCosts: { workers: 1, wood: 2, stone: 2 },
    buildScore: 50,
    hitsFirst: false,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
  archer: {
    unitType: "archer",
    name: "Archer",
    symbol: "🏹",
    description: "Attacks first against most unit types.",
    lockedText: "Unlocked by Archery Hut",
    bgImage: "bg-archer",
    bgImageSm: "bg-archerSm",
    bgImageMd: "bg-archerMd",
    bgImageLg: "bg-archerLg",
    threatLevel: 1.5,
    // decrease the attack but it attacks first
    attack: 4,
    maxHealth: 7,
    armor: 0,
    resourceCosts: { workers: 1, wood: 3, metal: 2 },
    buildScore: 60,
    hitsFirst: true,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
  knight: {
    unitType: "knight",
    name: "Knight",
    symbol: "🛡️",
    description: "Uses armor to reduce incoming damage.",
    lockedText: "Unlocked by Smelter",
    bgImage: "bg-knight",
    bgImageSm: "bg-knightSm",
    bgImageMd: "bg-knightMd",
    bgImageLg: "bg-knightLg",
    threatLevel: 1.5,
    attack: 4,
    maxHealth: 11,
    armor: 1,
    resourceCosts: { workers: 2, stone: 3, metal: 3 },
    buildScore: 80,
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
    description: "Magic increases their attack power while unharmed.",
    lockedText: "Unlocked by Mage School",
    bgImage: "bg-mage",
    bgImageSm: "bg-mageSm",
    bgImageMd: "bg-mageMd",
    bgImageLg: "bg-mageLg",
    threatLevel: 2,
    attack: 7,
    maxHealth: 10,
    armor: 0,
    resourceCosts: { workers: 3, stone: 3, metal: 2, crystal: 4 },
    buildScore: 120,
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
    lockedText: "Unlocked by Explosives Research",
    bgImage: "bg-bomber",
    bgImageSm: "bg-bomberSm",
    bgImageMd: "bg-bomberMd",
    bgImageLg: "bg-bomberLg",
    threatLevel: 3,
    attack: 20,
    maxHealth: 1,
    armor: 0,
    resourceCosts: { workers: 3, wood: 3, stone: 3, metal: 3, crystal: 4 },
    buildScore: 160,
    hitsFirst: false,
    fullHealthAttackBonus: 0,
    chargesBeforeSelection: false,
    chargingMultiplier: 1,
  },
};

/* export const unitCostsData = {
  fighter: {
    workers: 1,
    wood: 2,
    stone: 2,
    metal: 0,
  },
  archer: {
    workers: 1,
    wood: 2,
    stone: 0,
    metal: 2,
  },
  knight: {
    workers: 1,
    wood: 0,
    stone: 2,
    metal: 2,
  },
}; */
