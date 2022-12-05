import React from "react";
import { BaseUnit } from "../types/BaseUnit";
import Button from "./buttons/Button";
import AddUnitButton from "./buttons/AddUnitButton";

interface DevToolsProps {
  BASE_UNIT_DATA: BaseUnit;
  addUnit: any;
  unitBattler: () => void;
}

export default function DevTools({
  BASE_UNIT_DATA,
  addUnit,
  unitBattler,
}: DevToolsProps) {
  return (
    <div className="border-t-2 border-amber-500">
      <h2 className="font-extrabold text-amber-500 dark:text-white">
        Dev Tools
      </h2>{" "}
      <div className="flex items-center justify-evenly">
        {/* Get all base unit types, dyanmically create a button for each */}
        {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
          <AddUnitButton
            addUnit={addUnit}
            unitType={unitType}
            name={BASE_UNIT_DATA[unitType].name}
            // choose true for friendly units
            friendly={true}
            className="rounded border border-gray-400 bg-white py-1 px-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          />
        ))}

        <Button buttonColor="red" onClick={unitBattler}>
          Fight!
        </Button>

        {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
          <AddUnitButton
            addUnit={addUnit}
            unitType={unitType}
            name={BASE_UNIT_DATA[unitType].name}
            // choose true for enemy units
            friendly={false}
            className="rounded border border-gray-400 bg-white py-1 px-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}
