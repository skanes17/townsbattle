import { UnitType } from "./Unit";

export interface CombatEvent {
  event:
    | PreCombatEvent
    | MainCombatEvent
    | PostCombatEvent
    | SummaryEvent
    | NoArmyEvent;
  idx: number;
}

export interface PreCombatEvent {
  type: "preCombat";
  data: {
    friendly: { name: string; randomName: string; id?: number };
    enemy: {
      name: string;
      randomName: string;
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
      randomName: string;
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
      randomName: string;
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
      randomName: string;
      maxHealth: number;
      currentHealth: number;
      id?: number;
    };
    enemy: {
      name: string;
      randomName: string;
      maxHealth: number;
      currentHealth: number;
      id?: number;
    };
  };
}

export interface SummaryEvent {
  type: "summary";
  data: {
    friendly: {
      unitCount: number;
      /* TODO: Add in buildings info? */
    };
    enemy: {
      unitCount: number;
    };
  };
}

export interface NoArmyEvent {
  type: "noArmy";
  data: {
    friendly: {
      unitCount: number;
    };
  };
}
