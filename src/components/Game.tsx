import React, { useState } from "react";
import Planning from "./Planning";
import Combat from "./Combat";

// @ts-ignore
export default function Game(props) {
  const [turn, setTurn] = useState(1);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);

  // TODO: Fix game getting reset after combat phase

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
  // multipliers determine # of resources harvested per worker
  const [woodMultiplier, setWoodMultipler] = useState(1);
  const [stoneMultiplier, setStoneMultipler] = useState(1);
  const [ironMultiplier, setIronMultipler] = useState(1);

  return (
    <div>
      <h1>Welcome to the game.</h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>

      {/*  <Combat /> */}
      {turn === combatTurn ? (
        <Combat turn={turn} setTurn={setTurn} setCombatTurn={setCombatTurn} />
      ) : (
        <Planning
          turn={turn}
          setTurn={setTurn}
          woodworkers={woodworkers}
          setWoodworkers={setWoodworkers}
          woodCollected={woodCollected}
          setWoodCollected={setWoodCollected}
          stoneworkers={stoneworkers}
          setStoneworkers={setStoneworkers}
          stoneCollected={stoneCollected}
          setStoneCollected={setStoneCollected}
          ironworkers={ironworkers}
          setIronworkers={setIronworkers}
          ironCollected={ironCollected}
          setIronCollected={setIronCollected}
          newWorkers={newWorkers}
          setNewWorkers={setNewWorkers}
          freeworkers={freeworkers}
          setFreeworkers={setFreeworkers}
          woodMultiplier={woodMultiplier}
          setWoodMultipler={setWoodMultipler}
          stoneMultiplier={stoneMultiplier}
          setStoneMultipler={setStoneMultipler}
          ironMultiplier={ironMultiplier}
          setIronMultipler={setIronMultipler}
        />
      )}
    </div>
  );
}
