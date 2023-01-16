export type EventType = PreCombatEvent | CombatEvent | PostCombatEvent;

export interface Event {
  event: EventType;
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

export interface CombatEvent {
  type: "combat";
  data: {
    friendly: {
      name: string;
      attack: number;
      maxHealth: number;
      currentHealth: number;
      id?: number;
    };
    enemy: {
      name: string;
      attack: number;
      maxHealth: number;
      currentHealth: number;
      id?: number;
    };
  };
}

export interface PostCombatEvent {
  type: "postCombat";
  data: {
    friendly: {
      name: string;
      attack: number;
      maxHealth: number;
      currentHealth: number;
      id?: number;
    };
    enemy: {
      name: string;
      attack: number;
      maxHealth: number;
      currentHealth: number;
      id?: number;
    };
  };
}
