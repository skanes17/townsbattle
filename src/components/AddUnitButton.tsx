import React from "react";

export interface AddUnitButtonProps {
  addUnitFunction: any;
  name: string;
  className: string;
}

export default function AddUnitButton({
  addUnitFunction,
  name,
  className,
}: AddUnitButtonProps) {
  return (
    <>
      <button onClick={addUnitFunction} className={className}>
        +1 {name} (DevTool)
      </button>
    </>
  );
}
