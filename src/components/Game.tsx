import React, { useState } from "react";
import Planning from "./Planning";
import Combat from "./Combat";
import AddUnitButton from "./AddUnitButton";
import { setConstantValue } from "typescript";

// @ts-ignore
export default function Game(props) {
  const [turn, setTurn] = useState(1);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);

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

  // TODO: optimize this using a AddUnitButton component and props!

  // @ts-ignore
  const addMelee = () => {
    // copy the current newMelee stats
    // TODO: Check if this process is always using the most current state
    // this copies the existing state to a fresh array
    const newMeleeCopy = { ...newMelee, id: unitId };

    setMyUnits((myUnits) => {
      return [...myUnits, newMeleeCopy];
    });

    console.log(myUnits);
    setUnitId(unitId + 1);
  };

  // @ts-ignore
  const addPewpew = () => {
    // make a COPY of the state array so we can append id to the end
    const newPewpewCopy = { ...newPewpew, id: unitId };

    // take existing myUnits and append newPewpewCopy to the end
    setMyUnits((myUnits) => {
      return [...myUnits, newPewpewCopy];
    });

    console.log(myUnits);
    // increment the ID counter to ensure elements are unique
    setUnitId(unitId + 1);
  };

  // @ts-ignore
  const addTanky = () => {
    const newTankyCopy = { ...newTanky, id: unitId };

    setMyUnits((myUnits) => {
      return [...myUnits, newTankyCopy];
    });

    console.log(myUnits);
    setUnitId(unitId + 1);
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

      {/* <AddUnitButton newMelee={newMelee} setNewMelee:{setNewMelee} type={newMelee.type} name:{newMelee.name} attack:{newMelee.attack} defense: {newMelee.defense}
    <AddUnitButton newPewpew={newPewpew} setNewPewpew:{setNewPewpew}  type={newPewpew.type} name:{newPewpew.name} attack:{newPewpew.attack} defense: {newPewpew.defense}
    <AddUnitButton newTanky={newTanky} setNewTanky:{setNewTanky}  type={newTanky.type} name:{newTanky.name} attack:{newTanky.attack} defense: {newTanky.defense} */}
    </div>
  );
}
