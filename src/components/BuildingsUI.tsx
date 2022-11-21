import React, { useState } from "react";
import { Resources } from "../types/Resources";
import ConstructBuilding from "./ConstructBuilding";

interface BuildingsUIProps {
  buildings: any;
  setBuildings: any;
  enabledBuildings: string[];
  resources: Resources;
  setResources: any;
  /*   freeworkers: number;
  setFreeworkers: any;
  woodCollected: number;
  setWoodCollected: any;
  stoneCollected: number;
  setStoneCollected: any;
  metalCollected: number;
  setMetalCollected: any; */
}

export default function BuildingsUI({
  buildings,
  setBuildings,
  enabledBuildings,
  resources,
  setResources,
}: /*   freeworkers,
  setFreeworkers,
  woodCollected,
  setWoodCollected,
  stoneCollected,
  setStoneCollected,
  metalCollected,
  setMetalCollected, */
BuildingsUIProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Building Creation
      </h2>
      {enabledBuildings.map((buildingType: string) => (
        <ConstructBuilding
          buildings={buildings}
          setBuildings={setBuildings}
          buildingType={buildingType}
          resources={resources}
          setResources={setResources}
          /* index={0}
        buildingName={buildings[0].name}
        freeworkerCost={buildings[0].freeworkerCost}
        resource1Cost={buildings[0].woodCost}
        resource2Cost={buildings[0].stoneCost}
        underConstruction={buildings[0].underConstruction}
        freeworkers={freeworkers}
        setFreeworkers={setFreeworkers}
        resource1={woodCollected}
        setResource1={setWoodCollected}
        resource2={stoneCollected}
        setResource2={setStoneCollected} */
        />
      ))}
      <ConstructBuilding
        buildings={buildings}
        setBuildings={setBuildings}
        enabledBuildings={enabledBuildings}
        resources={resources}
        setResources={setResources}
        /* index={0}
        buildingName={buildings[0].name}
        freeworkerCost={buildings[0].freeworkerCost}
        resource1Cost={buildings[0].woodCost}
        resource2Cost={buildings[0].stoneCost}
        underConstruction={buildings[0].underConstruction}
        freeworkers={freeworkers}
        setFreeworkers={setFreeworkers}
        resource1={woodCollected}
        setResource1={setWoodCollected}
        resource2={stoneCollected}
        setResource2={setStoneCollected} */
      />
      <ConstructBuilding
        index={1}
        freeworkerName="villagers"
        resource1Name="wood"
        resource2Name="metal"
        buildings={buildings}
        buildingName={buildings[1].name}
        setBuildings={setBuildings}
        freeworkers={freeworkers}
        setFreeworkers={setFreeworkers}
        freeworkerCost={buildings[1].freeworkerCost}
        resource1={woodCollected}
        setResource1={setWoodCollected}
        resource1Cost={buildings[1].woodCost}
        resource2={metalCollected}
        setResource2={setMetalCollected}
        resource2Cost={buildings[1].metalCost}
        underConstruction={buildings[1].underConstruction}
      />
      <br></br>
    </div>
  );
}
