import { BaseUnit } from "../../types/BaseUnit";
import { Resources } from "../../types/Resources";
import { UnitCosts } from "../../types/UnitCosts";
import { UnitCounts } from "../../types/UnitCounts";
import TrainUnitCard from "../cards/TrainUnitCard";

interface UnitCreationProps {
  unitCosts: UnitCosts;
  setUnitCosts: any;
  unitsInTraining: UnitCounts;
  resources: Resources;
  setResources: any;
  BASE_UNIT_DATA: BaseUnit;
  addTrainingUnit: any;
  maxTrainingUnits: any;
  removeTrainingUnit: any;
  removeAllTrainingUnits: any;
}

export default function UnitCreation({
  unitCosts,
  unitsInTraining,
  resources,
  setResources,
  BASE_UNIT_DATA,
  addTrainingUnit,
  maxTrainingUnits,
  removeTrainingUnit,
  removeAllTrainingUnits,
}: UnitCreationProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Unit Creation</h2>
      {/* TODO: Add defense against bugs (e.g. non-existant units) */}

      {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
        <TrainUnitCard
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
      <br></br>
    </div>
  );
}
