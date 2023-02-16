import React, { Dispatch, SetStateAction } from "react";
import {
  BaseUnit,
  Buildings,
  ResourcePool,
  Resources,
  UnitCounts,
} from "../../types";
import TrainUnitCard from "./TrainUnitCard";

import { UnitType } from "../../types";
import { AddRemoveUnitFn, MaxTrainingUnitsFn } from "../../types/FunctionTypes";

export interface TrainingCardContainerProps {
  unlockedUnits: (UnitType | undefined)[];
  buildings: Buildings;
  resources: Resources;
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
  unitsInTraining: UnitCounts;
  BASE_UNIT_DATA: BaseUnit;
  addTrainingUnit: AddRemoveUnitFn;
  maxTrainingUnits: MaxTrainingUnitsFn;
  removeTrainingUnit: AddRemoveUnitFn;
  removeAllTrainingUnits: AddRemoveUnitFn;
}

export default function TrainingCardContainer({
  unlockedUnits,
  buildings,
  resources,
  resourcePool,
  setResourcePool,
  unitsInTraining,
  BASE_UNIT_DATA,
  addTrainingUnit,
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
}: TrainingCardContainerProps) {
  return (
    <>
      {unlockedUnits.map((unitType) => (
        <TrainUnitCard
          unitType={unitType as UnitType}
          resources={resources}
          resourcePool={resourcePool}
          setResourcePool={setResourcePool}
          unitsInTraining={unitsInTraining}
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          addTrainingUnit={addTrainingUnit}
          maxTrainingUnits={maxTrainingUnits}
          removeTrainingUnit={removeTrainingUnit}
          removeAllTrainingUnits={removeAllTrainingUnits}
          friendly={true}
        />
      ))}
    </>
  );
}
