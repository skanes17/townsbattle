import React, { useState } from "react";
import Villager from "./Villager";
import DisplayResources from "./DisplayResources";
import Upgrades from "./Upgrades";
import DisplayUnits from "./DisplayUnits";
import DisplayBuildings from "./DisplayBuildings";
import DisplayVillagers from "./DisplayVillagers";
import { Resources } from "../types/Resources";
import { Buildings } from "../types/Buildings";
import { UnitCounts } from "../types/UnitCounts";

interface PlanningProps {
  onClick: () => void;
  resources: Resources;
  setResources: any;
  unitCounts: UnitCounts;
  buildings: Buildings;
}

export default function Planning({
  onClick,
  resources,
  setResources,
  unitCounts,
  buildings,
}: PlanningProps) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Planning</h2>
      <div className="displayResources">
        <DisplayResources resources={resources} />
      </div>
      <br></br>

      <DisplayVillagers resources={resources} setResources={setResources} />

      <br></br>

      <div className="displayUnits">
        <DisplayUnits unitCounts={unitCounts} />
      </div>
      <br></br>

      <div className="displayBuildings">
        <DisplayBuildings buildings={buildings} />
      </div>

      <br></br>
      {/* upgrades could show conditionally when enough resources are gathered */}
      {/*       <Upgrades />
      <br></br>
      <br></br> */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        End Turn
      </button>
    </div>
  );
}
