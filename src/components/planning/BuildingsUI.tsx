import React, { Dispatch, SetStateAction, useState } from "react";
import { Buildings, ResourcePool, Resources } from "../../types";
import { ConstructBuilding } from "../cards";

interface BuildingsUIProps {
  buildings: Buildings;
  setBuildings: Dispatch<SetStateAction<Buildings>>;
  /* setBuildings: (buildings: Buildings) => void; */
  buildingsLeftToConstruct: string[];
  resources: Resources;
  setResources: Dispatch<SetStateAction<Resources>>;
  /* setResources: (resources: Resources) => void; */
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
}

export default function BuildingsUI({
  buildings,
  setBuildings,
  buildingsLeftToConstruct,
  resources,
  setResources,
  resourcePool,
  setResourcePool,
}: BuildingsUIProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Building Creation
      </h2>
      {buildingsLeftToConstruct.map((buildingType: string) => (
        <ConstructBuilding
          buildings={buildings}
          setBuildings={setBuildings}
          buildingType={buildingType}
          resources={resources}
          setResources={setResources}
          resourcePool={resourcePool}
          setResourcePool={setResourcePool}
        />
      ))}
      <br></br>
    </div>
  );
}
