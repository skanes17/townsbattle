import { Difficulty } from "./Difficulty";
import { BaseResourceType, ResourceType } from "./Resources";
import { UnitType } from "./Unit";

// unused -- just a reference example
export type PlaceholderUpdaterFn = (param1: string, param2: boolean) => void;

export type AddRemoveUnitFn = (unitType: UnitType, friendly: boolean) => void;

export type MaxTrainingUnitsFn = (
  unitType: UnitType,
  friendly: boolean,
  maxTrainable: number
) => void;

export type AddRemoveWorkerFn = (
  amount: number,
  resourceType: BaseResourceType
) => void;

export type AddResourceFn = (resourceType: ResourceType) => void;

export type DifficultyUpdater = (difficulty: Difficulty) => void;

export type TutorialsUpdater = (tutorials: boolean) => void;
