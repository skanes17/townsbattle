import { ResourceCosts } from "./ResourceCosts";
import { UnitType } from "./Unit";

export interface Building {
  name: string;
  nameSymbol: string;
  imageSrc?: string;
  enabled: boolean;
  underConstruction: boolean;
  constructed: boolean;
  tier: number;
  attackBonus: number;
  healthBonus: number;
  description: string;
  bgImage?: string;
  health: number;
  resourceCosts: ResourceCosts;
  unlockedUnit?: UnitType;
}

export interface Buildings {
  [index: string]: Building;
}

export type BuildingType = keyof Buildings;
