import React, { useState } from "react";
import Combat from "./Combat";
import Villager from "./Villager";
import DisplayResources from "./DisplayResources";
import Upgrades from "./Upgrades";

// @ts-ignore
export default function Game(props) {
  const [turn, setTurn] = useState(1);
  // number of new workers per turn can increase over time
  // TODO: Add food? And/or some resource common to all unit building?
  const [woodworkers, setWoodworkers] = useState(0);
  const [woodCollected, setWoodCollected] = useState(0);
  const [stoneworkers, setStoneworkers] = useState(0);
  const [stoneCollected, setStoneCollected] = useState(0);
  const [ironworkers, setIronworkers] = useState(0);
  const [ironCollected, setIronCollected] = useState(0);
  const [newWorkers, setNewWorkers] = useState(1);
  const [freeworkers, setFreeworkers] = useState(5);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);
  // multipliers determine # of resources harvested per worker
  const [woodMultiplier, setWoodMultipler] = useState(1);
  const [stoneMultiplier, setStoneMultipler] = useState(1);
  const [ironMultiplier, setIronMultipler] = useState(1);

  function endTurn() {
    if (freeworkers > 0) {
      alert("You have not assigned all free workers!");
      return;
    }
    setWoodCollected(woodCollected + woodworkers * woodMultiplier);
    setStoneCollected(stoneCollected + stoneworkers * stoneMultiplier);
    setIronCollected(ironCollected + ironworkers * ironMultiplier);
    setFreeworkers(
      freeworkers + woodworkers + stoneworkers + ironworkers + newWorkers
    );
    // TODO: Optimize this
    setWoodworkers(0);
    setStoneworkers(0);
    setIronworkers(0);
    setTurn(turn + 1);
  }

  return (
    <div>
      <h1>Welcome to the game.</h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>
      <br></br>
      {/* TODO: Hide this during combat */}
      <div className="freeworkers" style={{ fontWeight: "bold" }}>
        Free Workers: {freeworkers}
      </div>
      <br></br>
      <div className="villagers">
        <div style={{ fontWeight: "bold" }}>Villagers</div>
        <Villager
          type="Woodworkers"
          workers={woodworkers}
          setWorkers={setWoodworkers}
          freeworkers={freeworkers}
          setFreeworkers={setFreeworkers}
        />
        <Villager
          type="Stoneworkers"
          workers={stoneworkers}
          setWorkers={setStoneworkers}
          freeworkers={freeworkers}
          setFreeworkers={setFreeworkers}
        />
        <Villager
          type="Ironworkers"
          workers={ironworkers}
          setWorkers={setIronworkers}
          freeworkers={freeworkers}
          setFreeworkers={setFreeworkers}
        />
      </div>
      <br></br>

      <div className="displayResources">
        <DisplayResources
          wood={woodCollected}
          stone={stoneCollected}
          iron={ironCollected}
        />
      </div>

      <br></br>
      {/* TODO: Have resources gathered from buildings at end of turn */}
      <button onClick={endTurn}>End Turn</button>

      <div>
        {turn === combatTurn ? (
          <Combat />
        ) : (
          <div>Turns until combat: {combatTurn - turn}</div>
        )}
      </div>

      <br></br>

      {/* upgrades would show conditionally when enough resources are gathered */}
      <Upgrades />
    </div>
  );
}
