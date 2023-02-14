import React from "react";
import { BaseUnit, Resources, /* UnitCosts,  */ UnitCounts } from "../../types";
import TrainUnitCard from "./TrainUnitCard";

import { UnitType } from "../../types";
import { AddRemoveUnitFn, MaxTrainingUnitsFn } from "../../types/FunctionTypes";

export interface TrainingCardContainerProps {
  resources: Resources;
  setResources: (resources: Resources) => void;
  /* unitCosts: UnitCosts; */
  unitsInTraining: UnitCounts;
  BASE_UNIT_DATA: BaseUnit;
  addTrainingUnit: AddRemoveUnitFn;
  maxTrainingUnits: MaxTrainingUnitsFn;
  removeTrainingUnit: AddRemoveUnitFn;
  removeAllTrainingUnits: AddRemoveUnitFn;
}

export default function TrainingCardContainer({
  resources,
  setResources,
  /* unitCosts, */
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
          unitType={unitType as UnitType}
          resources={resources}
          setResources={setResources}
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
