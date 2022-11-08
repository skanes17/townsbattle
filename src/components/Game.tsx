import React, { useState } from "react";
import Planning from "./Planning";
import Combat from "./Combat";
import AddUnitButton from "./AddUnitButton";
import TrainUnits from "./TrainUnits";
import { setConstantValue, sortAndDeduplicateDiagnostics } from "typescript";

// TODO: Fix counter bugs (how to cause re-renders?)
// TODO: Have a pre-battle screen to summarize what you have?

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

  const [unitCosts, setUnitCosts] = useState({
    melee: {
      woodCost: 2,
      stoneCost: 2,
      ironCost: 0,
    },
    pewpew: {
      woodCost: 2,
      stoneCost: 0,
      ironCost: 2,
    },
    tanky: {
      woodCost: 0,
      stoneCost: 2,
      iron: 2,
    },
  });

  const [buildings, setBuildings] = useState({
    // for melee
    swordSmithy: {
      enabled: false,
      tier: 1,
      attackBonus: 2,
      healthBonus: 2,
      buildingHealth: 2,
    },
    // for ranged
    archeryRange: {
      enabled: false,
      tier: 1,
      attackBonus: 3,
      healthBonus: 1,
      buildingHealth: 2,
    },
    // for tanks
    armorSmithy: {
      enabled: false,
      tier: 1,
      attackBonus: 1,
      healthBonus: 3,
      buildingHealth: 2,
    },
    // for all units
    mealHall: {
      enabled: false,
      tier: 1,
      healthBonus: 2,
      buildingHealth: 2,
    },
    // for all units
    townCenter: {
      enabled: false,
      tier: 1,
      healthBonus: 1,
      buildingHealth: 3,
    },
  });

  const [upgrades, setUpgrades] = useState({
    axes: {
      woodCost: 20,
      stoneCost: 20,
      ironCost: 0,
    },
    pickaxes: {
      woodCost: 20,
      stoneCost: 0,
      ironCost: 20,
    },
    surveying: {
      woodCost: 0,
      stoneCost: 20,
      iron: 20,
    },
  });

  // ids for tracking units
  const [unitId, setUnitId] = useState(0);

  // TODO: Why don't it let me use useState([])?
  // @ts-ignore
  const [myUnits, setMyUnits] = useState([
    { type: "melee", name: "Melee", attack: 5, health: 5, id: -2 },
    { type: "pewpew", name: "Pewpew", attack: 7, health: 3, id: -1 },
  ]);

  const [newMelee, setNewMelee] = useState({
    type: "melee",
    name: "Melee",
    attack: 5,
    health: 5,
  });

  const [meleeInTraining, setMeleeInTraining] = useState(0);
  const [meleeCounter, setMeleeCounter] = useState(0);

  const [newPewpew, setNewPewpew] = useState({
    type: "pewpew",
    name: "Pewpew",
    attack: 7,
    health: 3,
  });

  const [pewpewInTraining, setPewpewInTraining] = useState(0);
  const [pewpewCounter, setPewpewCounter] = useState(0);

  const [newTanky, setNewTanky] = useState({
    type: "tanky",
    name: "Tanky",
    attack: 3,
    health: 7,
  });

  const [tankyInTraining, setTankyInTraining] = useState(0);
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

  // placeholder enemy array for testing
  const [enemyUnits, setEnemyUnits] = useState([
    { type: "melee", name: "Melee", attack: 5, health: 5, id: -2 },
    { type: "pewpew", name: "Pewpew", attack: 7, health: 3, id: -1 },
    { type: "tanky", name: "Tanky", attack: 3, health: 7, id: -3 },
  ]);

  // to be used in UnitBattler
  const [activeUnit, setActiveUnit] = useState();

  // TODO: Consider if copy of array should use state
  // TODO: Figure out why arrays don't seem to be new upon click
  const unitBattler = () => {
    // @ts-ignore
    const myUnitsCopy = [...myUnits];

    // @ts-ignore
    const enemyUnitsCopy = [...enemyUnits];

    // select a random unit from the arrays
    const friendlyUnit =
      myUnitsCopy[Math.floor(Math.random() * myUnitsCopy.length)];
    console.log("--Selected friendly unit is... " + friendlyUnit.type);
    const enemyUnit =
      enemyUnitsCopy[Math.floor(Math.random() * enemyUnitsCopy.length)];
    console.log("--Selected enemy unit is... " + enemyUnit.type);

    const enemyHealthRemaining = enemyUnit.health - friendlyUnit.attack;
    const friendlyHealthRemaining = friendlyUnit.health - enemyUnit.attack;

    // start a log to display what's happening
    // this coud exist in its own side div eventually, and show:
    // which units were selected...
    // atk/def stats
    // state friendly and enemy damage taken and remaining health
    // ideally UI would show both healths reduced at once
    // when damage is taken should be, at minimum, a little red text animation
    if (enemyHealthRemaining > 0) {
      console.log(
        "The enemy takes " +
          friendlyUnit.attack +
          " damage but survives with " +
          enemyHealthRemaining +
          " health."
      );
      setEnemyUnits(
        // copy the array
        enemyUnitsCopy.map((unit) => {
          // check if id matches the currently selected unit
          if (unit.id === enemyUnit.id) {
            return {
              // if so, change that unit's health/health accordingly
              ...unit,
              health: enemyHealthRemaining,
            };
          } else {
            // if not, don't change anything
            return unit;
          }
        })
      );
    } else {
      console.log(
        "Enemy " +
          enemyUnit.name +
          " takes " +
          friendlyUnit.attack +
          " damage and dies."
      );
      // remove enemy from their pool
      setEnemyUnits(enemyUnitsCopy.filter((unit) => unit.id !== enemyUnit.id));
    }

    if (friendlyHealthRemaining > 0) {
      console.log(
        "Friendly " +
          friendlyUnit.name +
          " takes " +
          enemyUnit.attack +
          " damage but survives with " +
          friendlyHealthRemaining +
          " health."
      );
      // code to return friendly to pool with current health
      setMyUnits(
        // copy the array
        myUnitsCopy.map((unit) => {
          // check if id matches the currently selected unit
          if (unit.id === friendlyUnit.id) {
            return {
              // if so, change that unit's health/health accordingly
              ...unit,
              health: friendlyHealthRemaining,
            };
          } else {
            // if not, don't change anything
            return unit;
          }
        })
      );
    } else {
      console.log(
        friendlyUnit.name + " takes " + enemyUnit.attack + " damage and dies."
      );
      // remove friendly from pool
      // TODO: Make sure this setState works properly
      setMyUnits(myUnitsCopy.filter((unit) => unit.id !== friendlyUnit.id));
    }
    console.log("The new enemy array is...");
    console.log(enemyUnits);
    console.log("The new friendly array is...");
    console.log(myUnits);
  };

  // ===END OF COMBAT MECHANICS===

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

    // TODO: Insert function calls to add units to friendly pool
    // TODO: Fix functions not working as expected when called this way
    for (let i = 0; i < meleeInTraining; i++) {
      addMelee();
    }
    for (let i = 0; i < pewpewInTraining; i++) {
      addPewpew();
    }
    for (let i = 0; i < tankyInTraining; i++) {
      addTanky();
    }

    setMeleeInTraining(0);
    setPewpewInTraining(0);
    setTankyInTraining(0);
    // TODO: Reset units in training
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Welcome to the game.
      </h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>
      <Planning
        onClick={endTurn}
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
        meleeCounter={meleeCounter}
        pewpewCounter={pewpewCounter}
        tankyCounter={tankyCounter}
      />

      <br></br>

      <div>
        <h2 className="text-4xl font-extrabold dark:text-white">
          Building Creation
        </h2>
        <div>Insert building creation here.</div>
      </div>
      <br></br>

      <div>
        <h2 className="text-4xl font-extrabold dark:text-white">
          Unit Creation
        </h2>
        <TrainUnits
          name="Melee"
          resource1Name="wood"
          resource1={woodCollected}
          setResource1={setWoodCollected}
          resource2Name="stone"
          resource2={stoneCollected}
          setResource2={setStoneCollected}
          unitInTraining={meleeInTraining}
          setUnitInTraining={setMeleeInTraining}
        />
        <TrainUnits
          name="Pewpew"
          resource1Name="wood"
          resource1={woodCollected}
          setResource1={setWoodCollected}
          resource2Name="iron"
          resource2={ironCollected}
          setResource2={setIronCollected}
          unitInTraining={pewpewInTraining}
          setUnitInTraining={setPewpewInTraining}
        />
        <TrainUnits
          name="Tanky"
          resource1Name="stone"
          resource1={stoneCollected}
          setResource1={setStoneCollected}
          resource2Name="iron"
          resource2={ironCollected}
          setResource2={setIronCollected}
          unitInTraining={tankyInTraining}
          setUnitInTraining={setTankyInTraining}
        />
      </div>
      <br></br>

      {/* TODO: Encapsulate combat      
      <Combat
        turn={turn}
        setTurn={setTurn}
        setCombatTurn={setCombatTurn}
        meleeCounter={meleeCounter}
        pewpewCounter={pewpewCounter}
        tankyCounter={tankyCounter}
        onClick={unitBattler}
      /> */}

      <div>
        <h2 className="text-4xl font-extrabold dark:text-white">
          Combat Mechanics
        </h2>
        <button
          onClick={unitBattler}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Fight!
        </button>
        <div>
          <p>
            Your army size is {meleeCounter + pewpewCounter + tankyCounter}.
          </p>
          <p>
            {meleeCounter} melee, {pewpewCounter} pewpew, {tankyCounter} tanky.
          </p>
          <AddUnitButton
            addUnitFunction={addMelee}
            name="Melee"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          />
          <AddUnitButton
            addUnitFunction={addPewpew}
            name="Pewpew"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          />
          <AddUnitButton
            addUnitFunction={addTanky}
            name="Tanky"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
          />
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
