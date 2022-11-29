import React from "react";
import { BaseUnit } from "../types/BaseUnit";
import { Resources } from "../types/Resources";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";
import TrainUnitCard from "./TrainUnitCard";

export interface TrainUnitsProps {
  resources: Resources;
  setResources: any;
  unitCosts: UnitCosts;
  unitsInTraining: UnitsInTraining;
  BASE_UNIT_DATA: BaseUnit;
  // TODO: Use more Types like this
  addTrainingUnit: (unitType: any, friendly: boolean) => void;
  removeTrainingUnit: any;
}

export default function TrainUnits({
  resources,
  setResources,
  unitCosts,
  unitsInTraining,
  BASE_UNIT_DATA,
  addTrainingUnit,
  removeTrainingUnit,
}: TrainUnitsProps) {
  return (
    <>
      {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
        <TrainUnitCard
          unitType={unitType}
          resources={resources}
          setResources={setResources}
          unitCosts={unitCosts}
          unitsInTraining={unitsInTraining}
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          addTrainingUnit={addTrainingUnit}
          removeTrainingUnit={removeTrainingUnit}
          friendly={true}
        />
      ))}
    </>
  );
}
