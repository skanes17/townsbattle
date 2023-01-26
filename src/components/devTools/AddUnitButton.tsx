import React from "react";
import { AddRemoveUnitFn, UnitType } from "../../types";

export interface AddUnitButtonProps {
  addUnit: AddRemoveUnitFn;
  unitType: UnitType;
  name: string;
  friendly: boolean;
  className: string;
}

export default function AddUnitButton({
  addUnit,
  unitType,
  name,
  friendly,
  className,
}: AddUnitButtonProps) {
  return (
    <>
      <button onClick={() => addUnit(unitType, friendly)} className={className}>
        +1 {friendly ? "" : "enemy "}
        {name} (DevTool)
      </button>
    </>
  );
}
