import React from "react";
import { BaseUnit, Resources, UnitCosts, UnitCounts } from "../../types";
import TrainUnitCard from "./TrainUnitCard";

import { UnitType } from "../../types";
import {
  AddRemoveTrainingUnitFn,
  MaxTrainingUnitsFn,
} from "../../types/FunctionTypes";

export interface TrainingCardContainerProps {
  resources: Resources;
  setResources: (resources: Resources) => void;
  unitCosts: UnitCosts;
  unitsInTraining: UnitCounts;
  BASE_UNIT_DATA: BaseUnit;
  // TODO: Use more Types like this
  addTrainingUnit: AddRemoveTrainingUnitFn;
  maxTrainingUnits: MaxTrainingUnitsFn;
  removeTrainingUnit: AddRemoveTrainingUnitFn;
  removeAllTrainingUnits: AddRemoveTrainingUnitFn;
}

export default function TrainingCardContainer({
  resources,
  setResources,
  unitCosts,
  unitsInTraining,
  BASE_UNIT_DATA,
  addTrainingUnit,
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
}: TrainingCardContainerProps) {
  return (
    <>
      {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
        <TrainUnitCard
          /* @ts-ignore */
          unitType={unitType}
          resources={resources}
          setResources={setResources}
          unitCosts={unitCosts}
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
