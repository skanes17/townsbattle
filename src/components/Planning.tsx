import React, { useState } from "react";
import Villager from "./Villager";
import DisplayResources from "./DisplayResources";
import Upgrades from "./Upgrades";
import DisplayUnits from "./DisplayUnits";
import DisplayBuildings from "./DisplayBuildings";
import DisplayVillagers from "./DisplayVillagers";

// @ts-ignore
export default function Planning(props) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Planning</h2>
      <div className="displayResources">
        <DisplayResources
          wood={props.woodCollected}
          stone={props.stoneCollected}
          metal={props.metalCollected}
        />
      </div>
      <br></br>

      <div className="freeworkers" style={{ fontWeight: "bold" }}>
        Free Workers: {props.freeworkers}
      </div>
      <br></br>

      <DisplayVillagers
        freeworkers={props.freeworkers}
        setFreeworkers={props.setFreeworkers}
        woodcutters={props.woodcutters}
        setWoodcutters={props.setWoodcutters}
        stonemasons={props.stonemasons}
        setStonemasons={props.setStonemasons}
        metalworkers={props.metalworkers}
        setMetalworkers={props.setMetalworkers}
      />

      <br></br>

      <div className="displayUnits">
        <DisplayUnits
          meleeCounter={props.meleeCounter}
          pewpewCounter={props.pewpewCounter}
          tankyCounter={props.tankyCounter}
        />
      </div>
      <br></br>

      <div className="displayBuildings">
        <DisplayBuildings buildings={props.buildings} />
      </div>

      <br></br>
      {/* upgrades would show conditionally when enough resources are gathered */}
      {/*       <Upgrades />
      <br></br>
      <br></br> */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={props.onClick}
      >
        End Turn
      </button>
    </div>
  );
}
