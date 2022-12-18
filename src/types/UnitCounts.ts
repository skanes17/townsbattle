export interface UnitCounts {
  melee: number;
  pewpew: number;
  tanky: number;
  total?: number;
}

export interface CombatUnitCounts {
  melee: number;
  pewpew: number;
  tanky: number;
  total: number;
}

/* TODO: Make this more efficient by using a union or similar */
