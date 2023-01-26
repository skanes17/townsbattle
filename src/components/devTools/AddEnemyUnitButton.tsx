import React from "react";
import { AddRemoveUnitFn, UnitType } from "../../types";

// TODO: Consolidate this component with AddResourceButton, AddUnitButton

interface AddUnitButtonProps {
  addEnemyUnit: AddRemoveUnitFn;
  unitType: UnitType;
  name: string;
  className: string;
}

export default function AddEnemyUnitButton({
  addEnemyUnit,
  unitType,
  name,
  className,
}: AddUnitButtonProps) {
  return (
    <>
      <button
        onClick={() => addEnemyUnit(unitType, false)}
        className={className}
      >
        +1 enemy {name} (DevTool)
      </button>
    </>
  );
}
