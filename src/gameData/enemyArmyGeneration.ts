// these are decimal percentages - each group must add to 1.0
export const enemyArmyCompositions = {
  stronglyBalanced: [{ melee: 0.333, pewpew: 0.333, tanky: 0.334 }],
  roughlyBalanced: [
    { melee: 0.4, pewpew: 0.3, tanky: 0.3 },
    { melee: 0.3, pewpew: 0.4, tanky: 0.3 },
    { melee: 0.3, pewpew: 0.3, tanky: 0.4 },
  ],
  halfMelee: [
    { melee: 0.5, pewpew: 0.25, tanky: 0.25 },
    { melee: 0.5, pewpew: 0.2, tanky: 0.3 },
    { melee: 0.5, pewpew: 0.3, tanky: 0.2 },
    { melee: 0.5, pewpew: 0.1, tanky: 0.4 },
    { melee: 0.5, pewpew: 0.4, tanky: 0.1 },
  ],
  allMelee: [{ melee: 1.0, pewpew: 0, tanky: 0 }],
  mostlyMelee: [
    { melee: 0.7, pewpew: 0.1, tanky: 0.2 },
    { melee: 0.7, pewpew: 0.2, tanky: 0.1 },
    { melee: 0.6, pewpew: 0.2, tanky: 0.2 },
    { melee: 0.8, pewpew: 0.1, tanky: 0.1 },
  ],
  allPewpew: [{ melee: 0, pewpew: 1.0, tanky: 0 }],
  halfPewpew: [
    { melee: 0.25, pewpew: 0.5, tanky: 0.25 },
    { melee: 0.2, pewpew: 0.5, tanky: 0.3 },
    { melee: 0.3, pewpew: 0.5, tanky: 0.2 },
    { melee: 0.1, pewpew: 0.5, tanky: 0.4 },
    { melee: 0.4, pewpew: 0.5, tanky: 0.1 },
  ],
  mostlyPewpew: [
    { melee: 0.1, pewpew: 0.7, tanky: 0.2 },
    { melee: 0.2, pewpew: 0.7, tanky: 0.1 },
    { melee: 0.2, pewpew: 0.6, tanky: 0.2 },
    { melee: 0.1, pewpew: 0.8, tanky: 0.1 },
  ],
  allTanky: [{ melee: 0, pewpew: 0, tanky: 1.0 }],
  halfTanky: [
    { melee: 0.25, pewpew: 0.25, tanky: 0.5 },
    { melee: 0.2, pewpew: 0.3, tanky: 0.5 },
    { melee: 0.3, pewpew: 0.2, tanky: 0.5 },
    { melee: 0.1, pewpew: 0.4, tanky: 0.5 },
    { melee: 0.4, pewpew: 0.1, tanky: 0.5 },
  ],
  mostlyTanky: [
    { melee: 0.2, pewpew: 0.1, tanky: 0.7 },
    { melee: 0.1, pewpew: 0.2, tanky: 0.7 },
    { melee: 0.2, pewpew: 0.2, tanky: 0.6 },
    { melee: 0.1, pewpew: 0.1, tanky: 0.8 },
  ],
};
