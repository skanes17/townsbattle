import { UnitType } from "./Unit";

export interface CombatEvent {
  event: PreCombatEvent | MainCombatEvent | PostCombatEvent;
  idx: number;
}

export interface PreCombatEvent {
  type: "preCombat";
  data: {
    friendly: { name: string; id?: number };
    enemy: {
      name: string;
      id?: number;
    };
  };
}

/* TODO: Add in buffs/bonuses into the list! */

export interface MainCombatEvent {
  type: "combat";
  data: {
    friendly: {
      name: string;
      unitType: UnitType;
      attack: number;
      maxHealth: number;
      currentHealth: number;
      /* attackBonus: number;
      incomingDmgReduction: number; */
      id?: number;
    };
    enemy: {
      name: string;
      unitType: UnitType;
      attack: number;
      maxHealth: number;
      currentHealth: number;
      /* attackBonus: number;
      incomingDmgReduction: number; */
      id?: number;
    };
  };
}

export interface PostCombatEvent {
  type: "postCombat";
  data: {
    friendly: {
      name: string;
      maxHealth: number;
      currentHealth: number;
      id?: number;
    };
    enemy: {
      name: string;
      maxHealth: number;
      currentHealth: number;
      id?: number;
    };
  };
}
