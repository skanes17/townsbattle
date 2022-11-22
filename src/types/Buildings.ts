export interface Building {
  name: string;
  /* enabled: boolean; */
  underConstruction: boolean;
  constructed: boolean;
  tier: number;
  attackBonus: number;
  healthBonus: number;
  armorBonus?: number;
  effect?: string;
  bonus?: string;
  health: number;
  woodCost: number;
  stoneCost: number;
  metalCost: number;
  freeworkerCost: number;
}

export interface Buildings {
  [index: string]: Building;
}
