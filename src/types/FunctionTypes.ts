import { Difficulty } from "./Difficulty";
import { BaseResource, Resource } from "./Resources";
import { UnitType } from "./Unit";

export type PlaceholderUpdaterFn = (param1: string, param2: boolean) => void;

export type AddRemoveUnitFn = (unitType: UnitType, friendly: boolean) => void;

export type MaxTrainingUnitsFn = (
  unitType: UnitType,
  friendly: boolean,
  maxTrainable: number
) => void;

export type AddRemoveWorkerFn = (resourceType: BaseResource) => void;

export type AddResourceFn = (resourceType: Resource) => void;

export type DifficultyUpdater = (difficulty: Difficulty) => void;

export type TutorialsUpdater = (tutorials: boolean) => void;
