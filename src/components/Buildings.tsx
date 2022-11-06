import React, { useState } from "react";

const [building, setBuildings] = useState({
  // for melee
  swordSmithy: {
    enabled: false,
    tier: 1,
    attackBonus: 2,
    healthBonus: 2,
    buildingHealth: 2,
  },
  // for ranged
  archeryRange: {
    enabled: false,
    tier: 1,
    attackBonus: 3,
    healthBonus: 1,
    buildingHealth: 2,
  },
  // for tanks
  armorSmithy: {
    enabled: false,
    tier: 1,
    attackBonus: 1,
    healthBonus: 3,
    buildingHealth: 2,
  },
  // for all units
  mealHall: {
    enabled: false,
    tier: 1,
    healthBonus: 2,
    buildingHealth: 2,
  },
  // for all units
  townCenter: {
    enabled: false,
    tier: 1,
    healthBonus: 1,
    buildingHealth: 3,
  },
});
