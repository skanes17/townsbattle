import React, { useState } from "react";
import { GameProps } from "../types/GameProps";
import BuildingsUI from "./BuildingsUI";
import { UnitCosts } from "../types/UnitCosts";
import { Buildings } from "../types/Buildings";
import { UpgradeCosts } from "../types/UpgradeCosts";
import { TrainingUnit, Unit, UnitType } from "../types/Unit";
import DevTools from "./devTools/DevTools";
import { Resources } from "../types/Resources";
import { UnitsInTraining } from "../types/UnitInTraining";
import { UnitCounts } from "../types/UnitCounts";
import { BaseUnit } from "../types/BaseUnit";
import DisplayBuildings from "./DisplayBuildings";
import DisplayResources from "./dashboards/DisplayResources";
import DisplayUnitCounts from "./dashboards/DisplayUnitCounts";
import WorkerCardContainer from "./cards/WorkerCardContainer";
import ConstructBuilding from "./ConstructBuilding";
import DisplayTraining from "./dashboards/DisplayTraining";
import townCenter from "../images/town-center.png";
import TrainingCardContainer from "./cards/TrainingCardContainer";
import FlexWrapContainer from "./FlexWrapContainer";
import Button from "./buttons/Button";
import DisplayUnderConstruction from "./dashboards/DisplayUnderConstruction";
import CombatMockup from "./combat/CombatMockup";

// TODO: Have a pre-battle screen to summarize what you have?
// TODO: Maybe if you choose not to use a freeworker you can get some gold (points)

// TODO: Call a function to add a set number of enemy units per turn
// -eg start with an army of 3, one of each
// After first wave, the number is increased by some amount each time
// -eg 7 units for second wave, enemy units randomly chosen
// Composition of army could be displayed to UI, for example 20% melee 30% pewpew 50% tanky

export default function Game(props: GameProps) {
  const [turn, setTurn] = useState(1);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);

  // NEW RESOURCE STRUCTURE
  // TODO: Check Typing on this resource to make more flexible
  const [resources, setResources] = useState<Resources>({
    freeworkers: {
      collected: 5,
      name: "Freeworker",
      resourceSymbol: "🛠️",
      description:
        "Used when gathering resources, training untis, and constructing buildings",
    },
    wood: {
      collected: 0,
      name: "Wood",
      resourceSymbol: "🪵",
      workers: 0,
      workerName: "Woodcutters",
      workerType: "woodcutters",
      workerSymbol: "🪓",
      description: "Collects 1 wood.",
    },
    stone: {
      collected: 0,
      name: "Stone",
      resourceSymbol: "🪨",
      workers: 0,
      workerName: "Stonemasons",
      workerType: "stonemasons",
      workerSymbol: "⚒️",
      description: "Collects 1 stone.",
    },
    metal: {
      collected: 0,
      name: "Metal",
      resourceSymbol: "🔩",
      workers: 0,
      workerName: "Metalworkers",
      workerType: "metalworkers",
      workerSymbol: "🥽",
      description: "Collects 1 metal.",
    },
  });

  // FIXME: Remove this kind of things now that resources are refactored
  /* const resourceTypes = Object.keys(resources).filter(
    (key) => key != "freeworkers"
  ); */
  const resourceTypes = Object.keys(resources);

  const BASE_FREEWORKER_COUNT: number = 5;

  // current number of new workers per turn can increase over time
  // TODO: Add food? And/or some resource common to all unit building?

  const [newWorkers, setNewWorkers] = useState(1);

  // multipliers determine # of resources harvested per worker
  const [woodMultiplier, setWoodMultipler] = useState(1);
  const [stoneMultiplier, setStoneMultipler] = useState(1);
  const [metalMultiplier, setMetalMultipler] = useState(1);

  const [unitCosts, setUnitCosts] = useState<UnitCosts>({
    melee: {
      wood: 2,
      stone: 2,
      metal: 0,
      freeworkers: 1,
    },
    pewpew: {
      wood: 2,
      stone: 0,
      metal: 2,
      freeworkers: 1,
    },
    tanky: {
      wood: 0,
      stone: 2,
      metal: 2,
      freeworkers: 1,
    },
  });

  const [buildings, setBuildings] = useState<Buildings>({
    // for melee
    swordsmithy: {
      name: "Swordsmithy",
      nameSymbol: "🗡️",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 2,
      healthBonus: 2,
      description: "Melee units gain +2 to attack, +2 to health.",
      health: 2,
      woodCost: 10,
      stoneCost: 10,
      metalCost: 0,
      freeworkerCost: 5,
    },
    // for pewpew
    archeryRange: {
      name: "Archery Range",
      nameSymbol: "🎯",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 3,
      healthBonus: 1,
      description: "Pewpew units gain +3 to attack, +1 to health.",
      health: 2,
      woodCost: 10,
      stoneCost: 0,
      metalCost: 10,
      freeworkerCost: 5,
    },
    // for tanky
    armorsmithy: {
      name: "Armorsmithy",
      nameSymbol: "🛡️",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 1,
      healthBonus: 3,
      description: "Tanky units gain +1 to attack, +3 to health.",
      health: 2,
      woodCost: 0,
      stoneCost: 10,
      metalCost: 10,
      freeworkerCost: 5,
    },
    // for all units
    mealHall: {
      name: "Meal Hall",
      nameSymbol: "🍖",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 0,
      healthBonus: 2,
      armorBonus: 0,
      description: "All units gain +2 to health, +2 to armor.",
      health: 2,
      woodCost: 10,
      stoneCost: 10,
      metalCost: 10,
      freeworkerCost: 5,
    },
    // for all units
    townCenter: {
      name: "Town Center",
      nameSymbol: "🏙️",
      imageSrc: townCenter,
      underConstruction: false,
      constructed: true,
      tier: 1,
      attackBonus: 0,
      description: "If this building is destroyed it's game over!",
      healthBonus: 0,
      health: 3,
      woodCost: 0,
      stoneCost: 0,
      metalCost: 0,
      freeworkerCost: 0,
    },
    scoutingPost: {
      name: "Scouting Post",
      nameSymbol: "🔍",
      underConstruction: false,
      constructed: false,
      tier: 1,
      attackBonus: 0,
      description: "Upgrade intel on the enemy army.",
      healthBonus: 0,
      health: 2,
      woodCost: 15,
      stoneCost: 15,
      metalCost: 15,
      freeworkerCost: 10,
    },
  });

  const buildingsUnderConstruction = Object.keys(buildings).filter(
    (key) => buildings[key].underConstruction
  );

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

  // constant NOT used here so I could clear training each turn
  const [myTrainingUnits, setMyTrainingUnits] = useState<TrainingUnit[]>([]);

  // placeholder enemy array for testing
  const [enemyUnits, setEnemyUnits] = useState<Unit[]>([
    {
      unitType: "melee",
      name: "Melee",
      nameSymbol: "⚔️",
      attack: 5,
      maxHealth: 5,
      currentHealth: 5,
      id: 0,
    },
    {
      unitType: "pewpew",
      name: "Pewpew",
      nameSymbol: "🏹",
      attack: 7,
      maxHealth: 3,
      currentHealth: 3,
      id: 1,
    },
    {
      unitType: "tanky",
      name: "Tanky",
      nameSymbol: "🛡️",
      attack: 3,
      maxHealth: 7,
      currentHealth: 7,
      id: 2,
    },
  ]);

  // ===BASE STATS FOR NEW UNITS===
  // TODO: Will have dynamic update of attack and health stats based on building bonuses
  const BASE_UNIT_DATA: BaseUnit = {
    melee: {
      unitType: "melee",
      name: "Melee",
      nameSymbol: "⚔️",
      description: "Attack and health are balanced.",
      attack: 5,
      maxHealth: 5,
    },
    pewpew: {
      unitType: "pewpew",
      name: "Pewpew",
      nameSymbol: "🏹",
      description: "Great attack but not much health.",
      attack: 7,
      maxHealth: 3,
    },
    tanky: {
      unitType: "tanky",
      name: "Tanky",
      nameSymbol: "🛡️",
      description: "Low attack but lots of health.",
      attack: 3,
      maxHealth: 7,
    },
  };

  const unitTypes = Object.keys(BASE_UNIT_DATA);

  // Function to ADD units to either army
  const addTrainingUnit = (unitType: string, friendly: boolean) => {
    // unitType determines which unit to add
    // shorthand used for object
    const _newUnit = { unitType };

    // TODO: Check that this works
    if (!_newUnit) {
      return;
    }

    if (friendly) {
      /* FIXME: remove the ts-ignore */
      /* @ts-ignore */
      setMyTrainingUnits((myTrainingUnits) => [...myTrainingUnits, _newUnit]);
    }
    // Following code could be used for enemy unit training
    /* else {
      setEnemyUnits((enemyUnits) => {
        return [...enemyUnits, _newUnit];
      });
    } */
  };

  const removeTrainingUnit = (unitType: string, friendly: boolean) => {
    if (friendly) {
      const _myTrainingUnitsCopy = [...myTrainingUnits];

      // pick the first unit in the array of the selected type
      const _unitIndex = _myTrainingUnitsCopy.findIndex(
        (unit) => unit.unitType === unitType
      );

      // remove that unit from the array
      _myTrainingUnitsCopy.splice(_unitIndex, 1);
      setMyTrainingUnits([..._myTrainingUnitsCopy]);
    }
    // Following code could be used for enemy unit training
    /* else {
      const _enemyUnitsCopy = [...enemyUnits];
      
      const _unitIndex = _enemyUnitsCopy.findIndex(unit => unit.unitType===unitTypeString)

      // remove that unit from the array
      _enemyUnitsCopy.splice(_unitIndex,1);
      setEnemyUnits([..._enemyUnitsCopy]);
    } */
  };

  /*====================================
  ========DEV TOOLS TO ADD UNITS========
  =====================================*/
  const addUnit = (unitType: string, friendly: boolean) => {
    // unitType determines which unit to add
    const baseUnit = BASE_UNIT_DATA[unitType];

    // TODO: Check that this works
    if (!baseUnit) {
      return;
    }

    const newUnit = {
      ...baseUnit,
      currentHealth: baseUnit.maxHealth,
      id: unitId,
    };

    friendly
      ? // if friendly, update friendly army
        setMyUnits((myUnits) => {
          return [...myUnits, newUnit];
        })
      : // if not friendly, update enemy army
        setEnemyUnits((enemyUnits) => {
          return [...enemyUnits, newUnit];
        });

    setUnitId(unitId + 1);
  };

  /*====================================
  ======DEV TOOLS TO ADD RESOURCES======
  =====================================*/
  const addResource = (resourceType: string) => {
    //@ts-ignore
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }
    const updatedResources = { ...resources };
    //@ts-ignore
    updatedResources[resourceType].collected += 10;
    setResources(updatedResources);
  };

  // Function to REMOVE units from either army
  // TODO: Fix having to use the unitTypeString workaround
  /* const removeUnit = (unitTypeString: string, friendly: boolean) => {
    if (friendly) {
      // if friendly, update friendly army
      //@ts-ignore
      const chosenId = myUnits.find(
        (unit) => unit.unitType === unitTypeString
      ).id;

      // FILTER OUT that unit from the array
      setMyUnits(myUnits.filter((unit) => unit.id !== chosenId));
    } else {
      // if not friendly, update enemy army
      //@ts-ignore
      const chosenId = enemyUnits.find(
        (unit) => unit.unitType === unitTypeString
      ).id;

      setEnemyUnits(myUnits.filter((unit) => unit.id !== chosenId));
    }
  }; */
  /*====================================
  ===========END OF DEV TOOLS===========
  =====================================*/

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
    console.log(
      "--Selected friendly unit is... " +
        friendlyUnit.name +
        "_" +
        friendlyUnit.id
    );
    const enemyUnit =
      enemyUnitsCopy[Math.floor(Math.random() * enemyUnitsCopy.length)];
    console.log(
      "--Selected enemy unit is... " + enemyUnit.name + "_" + enemyUnit.id
    );

    // TODO: Incorporate similar later with currentHealth
    const enemyHealthRemaining = enemyUnit.maxHealth - friendlyUnit.attack;
    const friendlyHealthRemaining = friendlyUnit.maxHealth - enemyUnit.attack;

    // if the enemy survives...
    if (enemyHealthRemaining > 0) {
      console.log(
        "Enemy " +
          enemyUnit.name +
          "_" +
          enemyUnit.id +
          " takes " +
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
              currentHealth: enemyHealthRemaining,
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
          "_" +
          enemyUnit.id +
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
          "_" +
          friendlyUnit.id +
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
              currentHealth: friendlyHealthRemaining,
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
        friendlyUnit.name +
          "_" +
          friendlyUnit.id +
          " takes " +
          enemyUnit.attack +
          " damage and dies."
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

  const endTurn = () => {
    /* @ts-ignore */
    if (resources["freeworkers"].collected > 0) {
      alert("You have not assigned all free workers!");
      return;
    }

    const resourcesCopy = { ...resources };
    console.log(resourcesCopy);

    // TODO: Make this dynamic based on existing resources

    resourcesCopy["wood"].collected =
      resources["wood"].collected + resources["wood"].workers * woodMultiplier;
    resourcesCopy["stone"].collected =
      resources["stone"].collected +
      resources["stone"].workers * stoneMultiplier;
    resourcesCopy["metal"].collected =
      resources["metal"].collected +
      resources["metal"].workers * metalMultiplier;

    // calculate freeworkers for next turn
    resourcesCopy["freeworkers"].collected = BASE_FREEWORKER_COUNT + newWorkers;
    setNewWorkers(newWorkers + 1);

    // reset workers
    resourcesCopy["wood"].workers = 0;
    resourcesCopy["stone"].workers = 0;
    resourcesCopy["metal"].workers = 0;

    setResources(resourcesCopy);

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

    // Train Units Process
    let id = unitId;
    const units = myTrainingUnits.map((unit, i) => {
      // resolve base unit from unit type
      const _unit = BASE_UNIT_DATA[unit.unitType];
      id += 1;

      return {
        ..._unit,
        currentHealth: _unit.maxHealth,
        id, // shorthand if key = value
      };
    });

    // bring all the training units into the main army
    setMyUnits((myUnits) => [...myUnits, ...units]);
    setUnitId(id);

    // reset units in training back to zero
    setMyTrainingUnits([]);

    // increment turn
    setTurn(turn + 1);
  };

  const [inCombat, setInCombat] = useState(false);

  const switchPhase = () => {
    setInCombat(!inCombat);
  };

  // TODO: How to make this dynamic based on base units?
  // how many units you're going to train this turn
  const unitsInTraining: UnitsInTraining = {
    melee: myTrainingUnits.filter((unit) => unit.unitType === "melee").length,
    pewpew: myTrainingUnits.filter((unit) => unit.unitType === "pewpew").length,
    tanky: myTrainingUnits.filter((unit) => unit.unitType === "tanky").length,
  };

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

  /* TODO: Center all dashboard info in the middle of their grid/div? */

  return inCombat ? (
    <>
      <CombatMockup myUnits={myUnits} />
      <DevTools
        BASE_UNIT_DATA={BASE_UNIT_DATA}
        resources={resources}
        resourceTypes={resourceTypes}
        addResource={addResource}
        addUnit={addUnit}
        unitBattler={unitBattler}
        switchPhase={switchPhase}
      />
    </>
  ) : (
    <div className="p-1">
      <div className="sticky top-0 grid auto-cols-auto">
        <div className="grid auto-cols-fr grid-flow-col justify-end rounded-md border border-sky-300/25 bg-sky-900/90 px-4 hover:bg-sky-900/95 sm:gap-x-4 md:gap-x-8 lg:gap-x-16">
          <DisplayResources
            resources={resources}
            resourceTypes={resourceTypes}
          />
          <DisplayUnitCounts
            BASE_UNIT_DATA={BASE_UNIT_DATA}
            unitTypes={unitTypes}
            unitCounts={unitCounts}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly">
        <FlexWrapContainer headerText="Assign Workers">
          <WorkerCardContainer
            resources={resources}
            setResources={setResources}
          />
        </FlexWrapContainer>

        <FlexWrapContainer headerText="Train Units">
          <TrainingCardContainer
            resources={resources}
            setResources={setResources}
            unitCosts={unitCosts}
            unitsInTraining={unitsInTraining}
            BASE_UNIT_DATA={BASE_UNIT_DATA}
            addTrainingUnit={addTrainingUnit}
            removeTrainingUnit={removeTrainingUnit}
          />
        </FlexWrapContainer>

        <FlexWrapContainer headerText="Construct Buildings">
          {/* TODO: Match component structure with other cards */}
          {buildingsToConstruct.map((buildingType) => (
            <ConstructBuilding
              buildings={buildings}
              setBuildings={setBuildings}
              buildingType={buildingType}
              resources={resources}
              setResources={setResources}
            />
          ))}
        </FlexWrapContainer>

        <FlexWrapContainer headerText="Buildings Constructed">
          {/* TODO: Match component structure with other cards */}
          <DisplayBuildings buildings={buildings} />
        </FlexWrapContainer>
      </div>

      <br></br>

      <DevTools
        BASE_UNIT_DATA={BASE_UNIT_DATA}
        resources={resources}
        resourceTypes={resourceTypes}
        addResource={addResource}
        addUnit={addUnit}
        unitBattler={unitBattler}
        switchPhase={switchPhase}
      />
      {/* TODO: Consider merging UnitCount and UnitInTraining components; only the count differs */}

      <div className="sticky bottom-0 grid auto-cols-auto">
        <div className="col-start-1 grid auto-cols-fr grid-flow-col justify-end rounded-md border border-sky-300/25 bg-sky-900/90 px-4 hover:bg-sky-900/95 sm:gap-x-4 md:gap-x-8 lg:gap-x-16">
          <DisplayTraining
            BASE_UNIT_DATA={BASE_UNIT_DATA}
            unitTypes={unitTypes}
            unitsInTraining={unitsInTraining}
          />
          <div className="sticky bottom-0 flex items-center justify-center p-0">
            <Button buttonColor="blue" onClick={endTurn}>
              End Turn {turn}
            </Button>
          </div>
          <DisplayUnderConstruction
            buildings={buildings}
            buildingsUnderConstruction={buildingsUnderConstruction}
          />
        </div>
      </div>
    </div>
  );
}
