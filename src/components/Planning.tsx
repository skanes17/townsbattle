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
        <DisplayResources resources={props.resources} />{" "}
        {/* started refactoring resources here */}
      </div>
      <br></br>

      <div className="freeworkers" style={{ fontWeight: "bold" }}>
        Free Workers: {props.resources.freeworkers}
      </div>
      <br></br>

      <DisplayVillagers
        resources={props.resources}
        setResources={props.setResources}
        // should be able to remove everything below, soon
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
          meleeCount={props.meleeCount}
          pewpewCount={props.pewpewCount}
          tankyCount={props.tankyCount}
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
