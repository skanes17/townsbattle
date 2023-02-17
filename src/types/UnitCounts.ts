export interface UnitCounts {
  [unitType: string]: number;
}

export interface CombatUnitCounts {
  [unitType: string]: number;
  total: number;
}

/* TODO: Make this more efficient by using a union? Extends? */
