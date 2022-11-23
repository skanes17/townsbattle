import { BaseUnit } from "../types/BaseUnit";
import { Resources } from "../types/Resources";
import { Unit } from "../types/Unit";
import { UnitCosts } from "../types/UnitCosts";
import { UnitsInTraining } from "../types/UnitInTraining";
import TrainUnits from "./TrainUnits";

interface UnitCreationProps {
  unitCosts: UnitCosts;
  setUnitCosts: any;
  unitsInTraining: UnitsInTraining;
  setUnitsInTraining: any;
  resources: Resources;
  setResources: any;
  BASE_UNIT_DATA: BaseUnit;
  addUnit: any;
  removeUnit: any;
}

export default function UnitCreation({
  unitCosts,
  unitsInTraining,
  setUnitsInTraining,
  resources,
  setResources,
  BASE_UNIT_DATA,
  addUnit,
  removeUnit,
}: UnitCreationProps) {
  /* const unitTypes = Object.keys(unitsInTraining); */

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Unit Creation</h2>
      {/* TODO: Add defense against bugs (e.g. non-existant units) */}

      {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
        <TrainUnits
          unitType={unitType}
          resources={resources}
          setResources={setResources}
          unitCosts={unitCosts}
          unitsInTraining={unitsInTraining}
          setUnitsInTraining={setUnitsInTraining}
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          addUnit={addUnit}
          removeUnit={removeUnit}
          friendly={true}
        />
      ))}
      <br></br>
    </div>
  );
}
