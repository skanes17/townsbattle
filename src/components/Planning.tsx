import React, { useState } from "react";
import Villager from "./Villager";
import DisplayResources from "./DisplayResources";
import Upgrades from "./Upgrades";

// @ts-ignore
export default function Planning(props) {
  function endTurn() {
    if (props.freeworkers > 0) {
      alert("You have not assigned all free workers!");
      return;
    }
    props.setWoodCollected(
      props.woodCollected + props.woodworkers * props.woodMultiplier
    );
    props.setStoneCollected(
      props.stoneCollected + props.stoneworkers * props.stoneMultiplier
    );
    props.setIronCollected(
      props.ironCollected + props.ironworkers * props.ironMultiplier
    );
    props.setFreeworkers(
      props.freeworkers +
        props.woodworkers +
        props.stoneworkers +
        props.ironworkers +
        props.newWorkers
    );
    // TODO: Optimize this
    props.setWoodworkers(0);
    props.setStoneworkers(0);
    props.setIronworkers(0);
    props.setTurn(props.turn + 1);
  }

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
      {/* upgrades would show conditionally when enough resources are gathered */}
      <Upgrades />
      <br></br>
      <br></br>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={endTurn}
      >
        End Turn
      </button>
    </div>
  );
}
