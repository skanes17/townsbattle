import React, { useState } from "react";
import MakeBuilding from "./MakeBuilding";

interface BuildingsUIProps {
  buildings: any[];
  setBuildings: any;
  freeworkers: number;
  setFreeworkers: any;
  woodCollected: number;
  setWoodCollected: any;
  stoneCollected: number;
  setStoneCollected: any;
  metalCollected: number;
  setMetalCollected: any;
}

export default function BuildingsUI({
  buildings,
  setBuildings,
  freeworkers,
  setFreeworkers,
  woodCollected,
  setWoodCollected,
  stoneCollected,
  setStoneCollected,
  metalCollected,
  setMetalCollected,
}: BuildingsUIProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Building Creation
      </h2>
      <MakeBuilding
        index={0}
        freeworkerName="villagers"
        resource1Name="wood"
        resource2Name="stone"
        buildings={buildings}
        buildingName={buildings[0].name}
        setBuildings={setBuildings}
        freeworkers={freeworkers}
        setFreeworkers={setFreeworkers}
        freeworkerCost={buildings[0].freeworkerCost}
        resource1={woodCollected}
        setResource1={setWoodCollected}
        resource1Cost={buildings[0].woodCost}
        resource2={stoneCollected}
        setResource2={setStoneCollected}
        resource2Cost={buildings[0].stoneCost}
        underConstruction={buildings[0].underConstruction}
      />
      <MakeBuilding
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
