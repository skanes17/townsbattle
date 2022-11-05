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

  // current number of new workers per turn can increase over time
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

  // TODO: Why don't it let me use useState([])?
  // @ts-ignore
  const [myUnits, setMyUnits] = useState([
    { type: "melee", name: "Melee", attack: 5, defense: 5, id: -2 },
    { type: "pewpew", name: "Pewpew", attack: 7, defense: 3, id: -1 },
  ]);

  const [newMelee, setNewMelee] = useState({
    type: "melee",
    name: "Melee",
    attack: 5,
    defense: 5,
  });

  const [meleeCounter, setMeleeCounter] = useState(0);

  const [newPewpew, setNewPewpew] = useState({
    type: "pewpew",
    name: "Pewpew",
    attack: 7,
    defense: 3,
  });

  const [pewpewCounter, setPewpewCounter] = useState(0);

  const [newTanky, setNewTanky] = useState({
    type: "tanky",
    name: "Tanky",
    attack: 3,
    defense: 7,
  });

  const [tankyCounter, setTankyCounter] = useState(0);

  // @ts-ignore
  const addMelee = () => {
    // TODO: Check if this process is always using the most current state
    // copy the current newMelee stats

    // copy current newMelee stats, append an ID to the end
    const newMeleeCopy = { ...newMelee, id: unitId };

    // update myUnits state accordingly
    setMyUnits((myUnits) => {
      return [...myUnits, newMeleeCopy];
    });

    console.log(myUnits);

    setUnitId(unitId + 1);
    // filter to check type, count matches, use it to update current unit number
    setMeleeCounter(
      myUnits.filter((element) => element.type === "melee").length
    );
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
    setPewpewCounter(
      myUnits.filter((element) => element.type === "pewpew").length
    );
  };

  // @ts-ignore
  const addTanky = () => {
    const newTankyCopy = { ...newTanky, id: unitId };

    setMyUnits((myUnits) => {
      return [...myUnits, newTankyCopy];
    });

    console.log(myUnits);
    setUnitId(unitId + 1);
    setTankyCounter(
      myUnits.filter((element) => element.type === "tanky").length
    );
  };

  // to be used in UnitBattler
  const [activeUnit, setActiveUnit] = useState();

  // TODO: Consider if copy of array should use ststae
  const unitBattler = () => {
    // @ts-ignore
    const myUnitsCopy = [...myUnits];
    // select a random unit from the array
    const friendlyUnit =
      myUnitsCopy[Math.floor(Math.random() * myUnitsCopy.length)];
    console.log("--Selected friendly unit is... " + friendlyUnit.type);
    console.log(
      "Attack: " + friendlyUnit.attack + " Health: " + friendlyUnit.defense
    );

    // will take a unit at random from enemy array (when it exists)
    // placeholder object here -- would follow same process as friendly
    const enemyUnit = {
      type: "melee",
      name: "Melee",
      attack: 5,
      defense: 5,
    };

    // start a log to display what's happening
    // this coud exist in its own side div eventualy, and show:
    // which units were selected...
    // atk/def stats
    // state friendly and enemy damage taken and remaining health
    // ideally UI would show both healths reduced at once
    // when damage is taken should be, at minimum, a little red text animation
    if (enemyUnit.defense - friendlyUnit.attack > 0) {
      console.log(
        "The enemy takes " +
          friendlyUnit.attack +
          " damage but survives with " +
          (enemyUnit.defense - friendlyUnit.attack) +
          " health."
      );
      // TODO: code to return enemy to their pool with current health
    } else {
      console.log(
        "The enemy takes " + friendlyUnit.attack + " damage and dies."
        // TODO: code to remove enemy from their pool
      );
    }

    if (friendlyUnit.defense - enemyUnit.attack > 0) {
      console.log(
        friendlyUnit.name +
          " takes " +
          enemyUnit.attack +
          " damage but survives with " +
          (friendlyUnit.defense - enemyUnit.attack) +
          " health."
      );
      // TODO: return friendly to pool with current health
    } else {
      console.log(
        friendlyUnit.name + " takes " + enemyUnit.attack + " damage and dies."
      );
      // remove friendly from pool
      // TODO: Make sure this setState works properly
      setMyUnits(myUnitsCopy.filter((a) => a.id !== friendlyUnit.id));
      console.log(myUnits);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Welcome to the game.
      </h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>
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

      {/*       <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600">>Combat</h2>
      <Combat turn={turn} setTurn={setTurn} setCombatTurn={setCombatTurn} /> */}
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
      <br></br>
      <div>
        <h2 className="text-4xl font-extrabold dark:text-white">
          Unit Creation
        </h2>
        <AddUnitButton
          addUnitFunction={addMelee}
          name="Melee"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <div>Current number of melee units is {meleeCounter}</div>
        <AddUnitButton
          addUnitFunction={addPewpew}
          name="Pewpew"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <div>Current number of pewpew units is {pewpewCounter}</div>
        <AddUnitButton
          addUnitFunction={addTanky}
          name="Tanky"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
        />
        <div>Current number of tanky units is {tankyCounter}</div>
      </div>
      <br></br>
      <div>
        <h2 className="text-4xl font-extrabold dark:text-white">
          Combat Mechanics
        </h2>
        <div>
          <p>
            Your army size is {meleeCounter + pewpewCounter + tankyCounter}.
          </p>
          <p>
            {meleeCounter} melee, {pewpewCounter} pewpew, {tankyCounter} tanky.
          </p>
          <button
            onClick={unitBattler}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          >
            Click to Select a Unit
          </button>
        </div>
      </div>

      {/*  TODO: Make this component work
           <Combat
        turn={turn}
        setTurn={setTurn}
        setCombatTurn={setCombatTurn}
        meleeCounter={meleeCounter}
        pewpewCounter={pewpewCounter}
        tankyCounter={tankyCounter}
      /> */}
    </div>
  );
}
