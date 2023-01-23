import React from "react";
import { Buildings } from "../../types";

interface DisplayUnderConstructionProps {
  buildings: Buildings;
  buildingsUnderConstruction: string[];
}

export default function DisplayUnderConstruction({
  buildings,
  buildingsUnderConstruction,
}: DisplayUnderConstructionProps) {
  return (
    <div className="m-1">
      <div className="text-center font-bold sm:text-sm md:text-base lg:text-lg">
        Under Construction
      </div>
      <div className="grid auto-cols-max grid-flow-col justify-center gap-4 transition duration-75 ease-in-out hover:text-yellow-300 md:text-lg lg:text-2xl">
        {buildingsUnderConstruction.map((building) => (
          <div>{buildings[building].nameSymbol}</div>
        ))}
      </div>
    </div>
  );
}

/* TODO: Consider implementing a conditional like this:
<div className="m-1">
{buildingsUnderConstruction.length !== 0 && (
  <>
    <div className="font-bold sm:text-sm md:text-base lg:text-lg">
      Under Construction
    </div>
    <div className="grid auto-cols-max grid-flow-col gap-4 transition duration-75 ease-in-out hover:text-yellow-300 md:text-lg lg:text-2xl">
      {buildingsUnderConstruction.map((building) => (
        <div>{buildings[building].nameSymbol}</div>
      ))}
    </div>
  </>
)}
</div> */
