import React, { useState } from "react";
import { Resources } from "../types/Resources";
import ConstructBuilding from "./ConstructBuilding";

interface BuildingsUIProps {
  buildings: any;
  setBuildings: any;
  buildingsToConstruct: string[];
  resources: Resources;
  setResources: any;
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
      {buildingsToConstruct.map((buildingType) => (
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
