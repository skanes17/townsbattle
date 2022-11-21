export interface UnitCost {
  woodCost: number;
  stoneCost: number;
  metalCost: number;
  freeworkerCost: number;
}

export interface UnitCosts {
  [index: string]: UnitCost;
}
