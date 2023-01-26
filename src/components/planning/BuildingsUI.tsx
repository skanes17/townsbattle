import React, { useState } from "react";
import { BuildingCosts, Buildings, Resources } from "../../types";
import { ConstructBuilding } from "../cards";

interface BuildingsUIProps {
  buildings: Buildings;
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
      {buildingsToConstruct.map((buildingType: string) => (
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
