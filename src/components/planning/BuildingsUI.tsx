import React, { Dispatch, SetStateAction, useState } from "react";
import { Buildings, Resources } from "../../types";
import { ConstructBuilding } from "../cards";

interface BuildingsUIProps {
  buildings: Buildings;
  setBuildings: Dispatch<SetStateAction<Buildings>>;
  /* setBuildings: (buildings: Buildings) => void; */
  buildingsToConstruct: string[];
  resources: Resources;
  setResources: Dispatch<SetStateAction<Resources>>;
  /* setResources: (resources: Resources) => void; */
}

export default function BuildingsUI({
  buildings,
  setBuildings,
  buildingsToConstruct,
  resources,
  setResources,
}: BuildingsUIProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Building Creation
      </h2>
      {buildingsToConstruct.map((buildingType: string) => (
        <ConstructBuilding
          buildings={buildings}
          setBuildings={setBuildings}
          buildingType={buildingType}
          resources={resources}
          setResources={setResources}
        />
      ))}
      <br></br>
    </div>
  );
}
