import React, { useState } from "react";
import Planning from "./Planning";
import Combat from "./Combat";
import MakeUnits from "./MakeUnits";
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

  // ids for tracking units
  const [unitId, setUnitId] = useState(0);

  // @ts-ignore
  const [myUnits, setMyUnits] = useState([
    { type: "melee", name: "Melee", attack: 5, defense: 5 },
    { type: "pewpew", name: "Pewpew", attack: 7, defense: 3 },
  ]);

  const [newMelee, setNewMelee] = useState({
    type: "melee",
    name: "Melee",
    attack: 5,
    defense: 5,
  });

  const [newTanky, setNewTanky] = useState({
    type: "tanky",
    name: "Tanky",
    attack: 3,
    defense: 7,
  });

  const [newPewpew, setNewPewpew] = useState({
    type: "pewpew",
    name: "Pewpew",
    attack: 7,
    defense: 3,
  });

  // @ts-ignore
  const addMelee = () => {
    setMyUnits((myUnits) => {
      // Object.assign would also work
      return [...myUnits, newMelee];
    });
    console.log(myUnits);
  };

  // @ts-ignore
  const addPewpew = () => {
    setMyUnits((myUnits) => {
      // Object.assign would also work
      return [...myUnits, newPewpew];
    });
    console.log(myUnits);
  };

  // @ts-ignore
  const addTanky = () => {
    setMyUnits((myUnits) => {
      // Object.assign would also work
      return [...myUnits, newTanky];
    });
    console.log(myUnits);
  };

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

      {/* <MakeUnits myUnits={myUnits} setMyUnits={setMyUnits} /> */}
      <button
        onClick={addMelee}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
      >
        Train Melee
      </button>
      <button
        onClick={addPewpew}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
      >
        Train Pewpew
      </button>
      <button
        onClick={addTanky}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
      >
        Train Tanky
      </button>
      {/*       <AddUnitButton onClick={addUnit}>
        CLICK THIS TO ADD NEW UNIT
      </AddUnitButton> */}
    </div>
  );
}
