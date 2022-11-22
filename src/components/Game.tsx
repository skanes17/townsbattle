import React, { useState } from "react";
import { GameProps } from "../types/GameProps";
import Planning from "./Planning";
import BuildingsUI from "./BuildingsUI";
import { UnitCosts } from "../types/UnitCosts";
import { Buildings } from "../types/Buildings";
import { UpgradeCosts } from "../types/UpgradeCosts";
import { Unit } from "../types/Unit";
import DevTools from "./DevTools";
import UnitCreation from "./UnitCreation";
import { Resources } from "../types/Resources";
import { UnitsInTraining } from "../types/UnitInTraining";
import { UnitCounts } from "../types/UnitCounts";
import ArmyDetails from "./ArmyDetails";
import { BaseUnit } from "../types/BaseUnit";

// TODO: Have a pre-battle screen to summarize what you have?
// TODO: Rename workers to villagers
// TODO: Maybe if you choose not to use a freeworker you can get some gold (points)

// TODO: Call a function to add a set number of enemy units per turn
// -eg start with an army of 3, one of each
// After first wave, the number is increased by some amount each time
// -eg 7 units for second wave, enemy units randomly chosen
// Composition of army could be displayed to UI, for example 20% melee 30% pewpew 50% tanky

export default function GameCopy(props: GameProps) {
  const [turn, setTurn] = useState(1);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);

  const [resources, setResources] = useState<Resources>({
    freeworkers: 5,
    woodCollected: 0,
    stoneCollected: 0,
    metalCollected: 0,
    woodcutters: 0,
    stonemasons: 0,
    metalworkers: 0,
  });

  // current number of new workers per turn can increase over time
  // TODO: Add food? And/or some resource common to all unit building?

  const [newWorkers, setNewWorkers] = useState(1);

  // multipliers determine # of resources harvested per worker
  const [woodMultiplier, setWoodMultipler] = useState(1);
  const [stoneMultiplier, setStoneMultipler] = useState(1);
  const [metalMultiplier, setMetalMultipler] = useState(1);

  const [unitCosts, setUnitCosts] = useState<UnitCosts>({
    melee: {
      woodCost: 2,
      stoneCost: 2,
      metalCost: 0,
      freeworkerCost: 1,
    },
    pewpew: {
      woodCost: 2,
      stoneCost: 0,
      metalCost: 2,
      freeworkerCost: 1,
    },
    tanky: {
      woodCost: 0,
      stoneCost: 2,
      metalCost: 2,
      freeworkerCost: 1,
    },
  });

  const [buildings, setBuildings] = useState<Buildings>({
    // for melee
    swordsmithy: {
      name: "⚔️ Swordsmithy",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 2,
      healthBonus: 2,
      effect: "Melee units gain +2 to attack, +2 to health",
      health: 2,
      woodCost: 10,
      stoneCost: 10,
      metalCost: 0,
      freeworkerCost: 5,
    },
    // for pewpew
    archeryRange: {
      name: "🎯 Archery Range",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 3,
      healthBonus: 1,
      effect: "Pewpew units gain +3 to attack, +1 to health",
      health: 2,
      woodCost: 10,
      stoneCost: 0,
      metalCost: 10,
      freeworkerCost: 5,
    },
    // for tanky
    armorsmithy: {
      name: "🛡️ Armorsmithy",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 1,
      healthBonus: 3,
      effect: "Tanky units gain +1 to attack, +3 to health",
      health: 2,
      woodCost: 0,
      stoneCost: 10,
      metalCost: 10,
      freeworkerCost: 5,
    },
    // for all units
    mealHall: {
      name: "🍖 Meal Hall",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 0,
      healthBonus: 2,
      armorBonus: 0,
      effect: "All units gain +2 to health, +2 to armor",
      health: 2,
      woodCost: 10,
      stoneCost: 10,
      metalCost: 10,
      freeworkerCost: 5,
    },
    // for all units
    townCenter: {
      name: "🏙️ Town Center",
      underConstruction: false,
      constructed: true,
      tier: 1,
      attackBonus: 0,
      effect: "If this building is destroyed, it's game over!",
      healthBonus: 0,
      health: 3,
      woodCost: 0,
      stoneCost: 0,
      metalCost: 0,
      freeworkerCost: 0,
    },
  });

  const buildingsToConstruct = Object.keys(buildings).filter(
    (key) => !buildings[key].constructed
  );

  // Unused right now
  const [upgradeCosts, setUpgradeCosts] = useState<UpgradeCosts>({
    axes: {
      woodCost: 20,
      stoneCost: 20,
      metalCost: 0,
    },
    pickaxes: {
      woodCost: 20,
      stoneCost: 0,
      metalCost: 20,
    },
    surveying: {
      woodCost: 0,
      stoneCost: 20,
      metalCost: 20,
    },
  });

  // ids for tracking units
  const [unitId, setUnitId] = useState(0);

  const [myUnits, setMyUnits] = useState<Unit[]>([]);

  // placeholder enemy array for testing
  const [enemyUnits, setEnemyUnits] = useState<Unit[]>([
    {
      unitType: "melee",
      name: "Melee",
      attack: 5,
      health: 5,
      id: -2,
    },
    {
      unitType: "pewpew",
      name: "Pewpew",
      attack: 7,
      health: 3,
      id: -1,
    },
    {
      unitType: "tanky",
      name: "Tanky",
      attack: 3,
      health: 7,
      id: -3,
    },
  ]);

  // how many units you're going to train this turn
  const [unitsInTraining, setUnitsInTraining] = useState<UnitsInTraining>({
    melee: 0,
    pewpew: 0,
    tanky: 0,
  });

  // ===BASE STATS FOR NEW UNITS===
  // TODO: Will have dynamic update of attack and health stats based on building bonuses
  const BASE_UNIT_DATA: BaseUnit = {
    melee: {
      unitType: "melee",
      name: "Melee",
      attack: 5,
      health: 5,
    },
    pewpew: {
      unitType: "pewpew",
      name: "Pewpew",
      attack: 7,
      health: 3,
    },
    tanky: {
      unitType: "tanky",
      name: "Tanky",
      attack: 3,
      health: 7,
    },
  };

  // FUnction to add units to either army
  const addUnit = (unitType: string, friendly: boolean) => {
    // unitType determines which unit to add
    const baseUnit = BASE_UNIT_DATA[unitType];

    // TODO: Check that this works
    if (!baseUnit) {
      return;
    }

    const newUnit = { ...baseUnit, id: unitId };

    friendly
      ? // if friendly, update friendly army
        setMyUnits((myUnits) => {
          return [...myUnits, newUnit];
        })
      : // if not friendly, update enemy army
        setEnemyUnits((enemyUnits) => {
          return [...enemyUnits, newUnit];
        });
  };

  // TODO: Ideas for battle UI below...
  // • start a log to display what's happening
  // • this could exist in its own side div eventually, and show:
  // • which units were selected...
  // • atk/def stats
  // • state friendly and enemy damage taken and remaining health
  // • ideally UI would show both healths reduced at once
  // • when damage is taken should be, at minimum, a little red text animation

  const unitBattler = () => {
    const myUnitsCopy = [...myUnits];
    const enemyUnitsCopy = [...enemyUnits];

    // Check for end of combat
    if (myUnitsCopy.length === 0 && enemyUnitsCopy.length === 0) {
      alert(
        "Your units defeated each other at the last moment. Prepare for the next battle!"
      );
      return;
    }

    if (myUnitsCopy.length === 0) {
      alert("Your army was defeated. Your buildings took damage!");
      return;
      // TODO: Make this return to Planning mode
    }
    if (enemyUnitsCopy.length === 0) {
      alert("Enemy army defeated. You won the battle!");
      return;
      // TODO: Make this return to Planning mode
    }

    // select a random unit from the arrays
    const friendlyUnit =
      myUnitsCopy[Math.floor(Math.random() * myUnitsCopy.length)];
    console.log("--Selected friendly unit is... " + friendlyUnit.unitType);
    const enemyUnit =
      enemyUnitsCopy[Math.floor(Math.random() * enemyUnitsCopy.length)];
    console.log("--Selected enemy unit is... " + enemyUnit.unitType);

    const enemyHealthRemaining = enemyUnit.health - friendlyUnit.attack;
    const friendlyHealthRemaining = friendlyUnit.health - enemyUnit.attack;

    // if the enemy survives...
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
      // if the enemy dies...
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

    // if the friendly unit survives...
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
      // if the friendly dies...
      console.log(
        friendlyUnit.name + " takes " + enemyUnit.attack + " damage and dies."
      );
      // remove friendly from pool
      setMyUnits(myUnitsCopy.filter((unit) => unit.id !== friendlyUnit.id));
    }
    console.log("The new enemy array is...");
    console.log(enemyUnits);
    console.log("The new friendly array is...");
    console.log(myUnits);
  };

  // ===END OF COMBAT MECHANICS===

  function endTurn() {
    if (resources.freeworkers > 0) {
      alert("You have not assigned all free workers!");
      return;
    }

    const resourcesCopy = { ...resources };
    console.log(resourcesCopy);

    resourcesCopy.woodCollected =
      resources.woodCollected + resources.woodcutters * woodMultiplier;
    resourcesCopy.stoneCollected =
      resources.stoneCollected + resources.stonemasons * stoneMultiplier;
    resourcesCopy.metalCollected =
      resources.metalCollected + resources.metalworkers * metalMultiplier;

    const allWorkers =
      resources.freeworkers +
      resources.woodcutters +
      resources.stonemasons +
      resources.metalworkers +
      newWorkers;

    // calculate freeworkers for next turn
    resourcesCopy.freeworkers = allWorkers;

    // reset workers
    resourcesCopy.woodcutters = 0;
    resourcesCopy.stonemasons = 0;
    resourcesCopy.metalworkers = 0;

    setResources(resourcesCopy);

    // increment turn
    setTurn(turn + 1);

    // TODO: Insert function calls to add units to friendly pool
    // TODO: Fix ID duplication

    // TODO: Refactor this!!
    /* for (let i = 0; i < unitsInTraining.melee; i++) {
      addMelee();
    }
    for (let i = 0; i < unitsInTraining.pewpew; i++) {
      addPewpew();
    }
    for (let i = 0; i < unitsInTraining.tanky; i++) {
      addTanky();
    } */

    // reset units in training
    setUnitsInTraining({ melee: 0, pewpew: 0, tanky: 0 });

    // make an array of which buildings were set to construct
    const newBuildings = Object.keys(buildings).filter(
      (key) => buildings[key].underConstruction
    );
    // copy buildings to preserve state
    const buildingsCopy = { ...buildings };

    // take them out of construction and set them to constructed
    newBuildings.map((buildingType) => {
      buildingsCopy[buildingType].underConstruction = false;
      buildingsCopy[buildingType].constructed = true;
    });

    // TODO: Ask why this can be removed and apparently still work properly
    setBuildings(buildingsCopy);
  }

  const unitCounts: UnitCounts = {
    melee: myUnits.filter((unit) => unit.unitType === "melee").length,
    pewpew: myUnits.filter((unit) => unit.unitType === "pewpew").length,
    tanky: myUnits.filter((unit) => unit.unitType === "tanky").length,
  };

  const enemyUnitCounts: UnitCounts = {
    melee: enemyUnits.filter((unit) => unit.unitType === "melee").length,
    pewpew: enemyUnits.filter((unit) => unit.unitType === "pewpew").length,
    tanky: enemyUnits.filter((unit) => unit.unitType === "tanky").length,
  };

  return (
    <div>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Welcome to the game.
      </h1>
      <div style={{ fontWeight: "bold" }}>Turn Number: {turn}</div>
      <Planning
        onClick={endTurn}
        resources={resources}
        setResources={setResources}
        unitCounts={unitCounts}
        buildings={buildings}
      />

      <br></br>

      <BuildingsUI
        buildings={buildings}
        setBuildings={setBuildings}
        buildingsToConstruct={buildingsToConstruct}
        resources={resources}
        setResources={setResources}
      />

      <UnitCreation
        unitCosts={unitCosts}
        setUnitCosts={setUnitCosts}
        resources={resources}
        setResources={setResources}
        unitsInTraining={unitsInTraining}
        setUnitsInTraining={setUnitsInTraining}
      />

      <ArmyDetails
        myUnits={myUnits}
        enemyUnits={enemyUnits}
        unitBattler={unitBattler}
        unitCounts={unitCounts}
        enemyUnitCounts={enemyUnitCounts}
      />

      <DevTools BASE_UNIT_DATA={BASE_UNIT_DATA} addUnit={addUnit} />

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
