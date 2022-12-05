import React from "react";

export interface AddUnitButtonProps {
  addUnit: any;
  unitType: string;
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
