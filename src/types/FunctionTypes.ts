import { BaseResource } from "./Resources";
import { UnitType } from "./Unit";

export type PlaceholderUpdaterFn = any;

export type AddRemoveTrainingUnitFn = (
  unitType: UnitType,
  friendly: boolean
) => void;

export type MaxTrainingUnitsFn = (
  unitType: UnitType,
  friendly: boolean,
  maxTrainable: number
) => void;

export type AddRemoveWorkerFn = (resourceType: BaseResource) => void;
