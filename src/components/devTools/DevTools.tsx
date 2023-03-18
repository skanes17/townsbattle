import React from "react";
import { BaseUnitData } from "../../types";
import AddUnitButton from "./AddUnitButton";
import { ResourceType, Resources } from "../../types/Resources";
import AddResourceButton from "./AddResourceButton";
import { AddRemoveUnitFn, AddResourceFn, Unit, UnitType } from "../../types";
import { Button } from "../buttons";

interface DevToolsProps {
  BASE_UNIT_DATA: BaseUnitData;
  resources: Resources;
  resourceTypes: ResourceType[];
  addResource: AddResourceFn;
  addUnit: AddRemoveUnitFn;
  switchPhase: () => void;
  friendlyUnits: Unit[];
  trainEnemyUnits: (numberOfFriendlyUnits: number) => void;
}

export default function DevTools({
  BASE_UNIT_DATA,
  resources,
  resourceTypes,
  addResource,
  addUnit,
  switchPhase,
  friendlyUnits,
  trainEnemyUnits,
}: DevToolsProps) {
  return (
    <div className="flex flex-wrap border-t-2 border-amber-500 transition duration-150 ease-in-out hover:filter-none">
      <h2 className="font-extrabold text-amber-500 dark:text-white">
        Dev Tools
      </h2>{" "}
      <div className="flex flex-wrap items-center justify-evenly">
        {/* Get all base unit types, dynamically create a button for each */}
        {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
          <AddUnitButton
            addUnit={addUnit}
            unitType={unitType as UnitType}
            name={BASE_UNIT_DATA[unitType].name}
            // choose true for friendly units
            friendly={true}
            className="rounded border border-gray-400 bg-white py-1 px-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          />
        ))}

        {/* FIXME: Avoid passing empty function */}
        <Button buttonColor="red" onClick={() => {}}>
          Fight!
        </Button>
        <Button
          buttonColor="red"
          onClick={() => trainEnemyUnits(friendlyUnits.length)}
        >
          Generate Enemy Army
        </Button>

        {Object.keys(BASE_UNIT_DATA).map((unitType: string) => (
          <AddUnitButton
            addUnit={addUnit}
            unitType={unitType as UnitType}
            name={BASE_UNIT_DATA[unitType].name}
            // choose false for enemy units
            friendly={false}
            className="rounded border border-gray-400 bg-white py-1 px-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          />
        ))}
      </div>
      <div>
        {resourceTypes.map((resourceType) => (
          <AddResourceButton
            addResource={addResource}
            resourceType={resourceType}
            name={resources[resourceType].name}
            className="rounded border border-gray-400 bg-white py-1 px-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          />
        ))}
      </div>
      <Button buttonColor="red" onClick={switchPhase}>
        Planning/Combat
      </Button>
    </div>
  );
}

/*
const resourceTypes = Object.keys(resources).filter(
  (key) => key != "workers"
);
*/
