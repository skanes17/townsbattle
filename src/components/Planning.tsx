// @ts-nocheck

import React, { useState } from "react";
import Villager from "./Villager";
import DisplayResources from "./DisplayResources";
import Upgrades from "./Upgrades";
import DisplayUnits from "./DisplayUnits";
import DisplayBuildings from "./DisplayBuildings";
import { isPropertySignature } from "typescript";

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
      <div className="workers">
        <div style={{ fontWeight: "bold" }}>Workers</div>
        <Villager
          type="Woodcutters"
          workers={props.woodcutters}
          setWorkers={props.setWoodcutters}
          freeworkers={props.freeworkers}
          setFreeworkers={props.setFreeworkers}
        />
        <Villager
          type="Stonemasons"
          workers={props.stonemasons}
          setWorkers={props.setStonemasons}
          freeworkers={props.freeworkers}
          setFreeworkers={props.setFreeworkers}
        />
        <Villager
          type="Metalworkers"
          workers={props.metalworkers}
          setWorkers={props.setMetalworkers}
          freeworkers={props.freeworkers}
          setFreeworkers={props.setFreeworkers}
        />
      </div>
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
