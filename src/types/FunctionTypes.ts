import { BaseResource, Resource } from "./Resources";
import { UnitType } from "./Unit";

export type PlaceholderUpdaterFn = any;

export type AddRemoveUnitFn = (unitType: UnitType, friendly: boolean) => void;

export type MaxTrainingUnitsFn = (
  unitType: UnitType,
  friendly: boolean,
  maxTrainable: number
) => void;

export type AddRemoveWorkerFn = (resourceType: BaseResource) => void;

export type AddResourceFn = (resourceType: Resource) => void;
