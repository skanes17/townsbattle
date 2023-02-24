import { ResourceCosts } from "./ResourceCosts";
import { UnitType } from "./Unit";

export interface Building {
  name: string;
  symbol: string;
  imageSrc?: string;
  enabled: boolean;
  underConstruction: boolean;
  constructed: boolean;
  tier: number;
  /* attackBonus: number;
  healthBonus: number; */
  description: string;
  bgImage?: string;
  maxHealth: number;
  currentHealth: number;
  resourceCosts: ResourceCosts;
  buildScore: number;
  unlockedUnit?: UnitType;
  workerBonus?: number;
}

export interface Buildings {
  [index: string]: Building;
}

export type BuildingType = keyof Buildings;
