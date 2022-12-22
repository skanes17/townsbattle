import React, { useState } from "react";
import { BuildingCosts } from "../../types/BuildingCosts";
import { Resources } from "../../types/Resources";
import ConstructBuilding from "../cards/ConstructBuilding";

interface BuildingsUIProps {
  buildings: any;
  setBuildings: any;
  buildingCosts: BuildingCosts;
  buildingsToConstruct: string[];
  resources: Resources;
  setResources: any;
}

export default function BuildingsUI({
  buildings,
  setBuildings,
  buildingCosts,
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
          buildingCosts={buildingCosts}
          buildingType={buildingType}
          resources={resources}
          setResources={setResources}
        />
      ))}
      <br></br>
    </div>
  );
}
