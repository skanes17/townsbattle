import React, { useState } from "react";
import Planning from "./Planning";
import Combat from "./Combat";
import { setConstantValue } from "typescript";

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

  // initialized an array, will practice adding units to this
  /*   const [myUnits, setMyUnits] = useState([
    {
      melee: {
        attack: 5,
        defense: 5,
        id: 0,
      },
    },
  ]); */

  // @ts-ignore
  /*   function unitObjectToAddToArray(type, attack, defense, id) {
    // template for a unit object
  } */

  // this should add new units to the old array
  // @ts-ignore
  /*   setMyUnits((myUnits) => {
    return [...myUnits, ...newUnit];
  }); */

  /*   const existingUnits = [
    {
      melee: {
        attack: 5,
        defense: 5,
        id: 0,
      },
    },
    {
      pewpew: {
        attack: 7,
        defense: 3,
        id: 1,
      },
    },
  ];
  console.log(existingUnits);

  const newUnit = [
    {
      tanky: {
        attack: 3,
        defense: 7,
        id: 2,
      },
    },
  ];

  const merged = [...existingUnits, ...newUnit];
  console.log("This is the merged array...");
  console.log(merged); */

  /* TODO: think on Functional updates for adding units
  setMyUnits(myUnits => {
    // Object.assign would also work
    return {...myUnits, ...updatedValues};
  }) */

  /* TEMPLATE
  const [friendlyUnits, setFriendlyUnits] = useState({
    melee: {
      attack: 5,
      defense: 5,
      name: "Melee",
      type: "balanced",
      quantity: 0,
      id: 0,
    },
  }); */

  return (
    <div>
      <h1>Welcome to the game.</h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>

      <Combat />
      {/* {turn === combatTurn ? (
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
      )} */}
    </div>
  );
}
