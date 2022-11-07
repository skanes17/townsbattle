import React, { useState } from "react";
import Villager from "./Villager";
import DisplayResources from "./DisplayResources";
import Upgrades from "./Upgrades";
import DisplayUnits from "./DisplayUnits";

// @ts-ignore
export default function Planning(props) {
  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">Planning</h2>
      <div className="freeworkers" style={{ fontWeight: "bold" }}>
        Free Workers: {props.freeworkers}
      </div>
      <br></br>
      <div className="villagers">
        <div style={{ fontWeight: "bold" }}>Villagers</div>
        <Villager
          type="Woodworkers"
          workers={props.woodworkers}
          setWorkers={props.setWoodworkers}
          freeworkers={props.freeworkers}
          setFreeworkers={props.setFreeworkers}
        />
        <Villager
          type="Stoneworkers"
          workers={props.stoneworkers}
          setWorkers={props.setStoneworkers}
          freeworkers={props.freeworkers}
          setFreeworkers={props.setFreeworkers}
        />
        <Villager
          type="Ironworkers"
          workers={props.ironworkers}
          setWorkers={props.setIronworkers}
          freeworkers={props.freeworkers}
          setFreeworkers={props.setFreeworkers}
        />
      </div>
      <br></br>

      <div className="displayResources">
        <DisplayResources
          wood={props.woodCollected}
          stone={props.stoneCollected}
          iron={props.ironCollected}
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
