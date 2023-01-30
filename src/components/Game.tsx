import React, { useState } from "react";
import {
  baseUnitData,
  buildingCostsData,
  buildingsData,
  resourceData,
  unitCostsData,
  upgradesData,
} from "../gameData";
import { DisplayBuildings } from "./planning/";

import { DevTools } from "./devTools";

import {
  DisplayResources,
  DisplayUnitCounts,
  DisplayTraining,
  DisplayUnderConstruction,
} from "./dashboards";

import {
  ConstructBuilding,
  TrainingCardContainer,
  WorkerCardContainer,
} from "./cards";

import FlexWrapContainer from "./layout/FlexWrapContainer";
import { Button } from "./buttons";
import { Combat } from "./combat";
// import { buildingsData, buildingCostsData } from "../gameData/buildings";
// import { upgradesData } from "../gameData/upgrades";
// import { BaseUnit } from "../types/BaseUnit";
// import { BuildingCosts } from "../types/BuildingCosts";
import {
  BaseUnit,
  BuildingCosts,
  Buildings,
  GameProps,
  Resources,
  ResourceType,
  TrainingUnit,
  Unit,
  UnitCosts,
  UnitCounts,
  UnitType,
  UpgradeCosts,
} from "../types";

import { GameContext } from "../context/GameState";
import { useLocation } from "react-router-dom";
/* FIXME: Not sending properly to CombatLog */
import { defaultTownName } from "../gameData";
import {
  AddRemoveUnitFn,
  AddResourceFn,
  MaxTrainingUnitsFn,
} from "../types/FunctionTypes";

// FIXME: Many areas/lists don't have a unique key/id.

// TODO: Maybe if you choose not to use a freeworker you can get some gold (points)

// TODO: Call a function to add a set number of enemy units per turn
// -eg start with an army of 3, one of each
// After first wave, the number is increased by some amount each time
// -eg 7 units for second wave, enemy units randomly chosen
// Composition of army could be displayed to UI, for example 20% melee 30% pewpew 50% tanky

export default function Game(props: GameProps) {
  /* -- RETRIEVE LOCALLY-STORED DATA -- */
  // if localStorage values are non-null, use the locally stored values
  // if storage is null, use some default values so the game still runs
  const townName =
    // if the storage is null or the player didn't enter a name, set it as the default
    localStorage.getItem("townName") === null ||
    localStorage.getItem("townName") === ""
      ? defaultTownName
      : (localStorage.getItem("townName") as string);

  const difficulty =
    localStorage.getItem("difficulty") === null
      ? "normal"
      : (localStorage.getItem("difficulty") as string);

  const tutorials =
    localStorage.getItem("tutorials") === null
      ? "normal"
      : // FIXME: Better way to avoid the error than to use non-null assertion?
        JSON.parse(localStorage.getItem("tutorials")!);
  /* ---------------------------------- */

  const [turn, setTurn] = useState(1);
  // combat turn will change over time
  const [combatTurn, setCombatTurn] = useState(4);
  const [inCombat, setInCombat] = useState(false);

  // TODO: Add food? And/or some resource common to all unit building?
  // Idea: Freeworkers are consumed when used for making units...
  // ... but introduce a gold economy which is used for building stuff along with resources
  // .. then you need to choose between basic resources AND gold every turn
  // maybe freeworkers aren't guaranteed every turn??
  // set number per turn, and a new building adds new ones per turn?

  /* ===RESOURCES AND WORKERS=== */
  const [resources, setResources] = useState<Resources>(resourceData);
  const resourceTypes = Object.keys(resources);
  // # of resources harvested per worker
  const [resourceMultipliers, setResourceMultipliers] = useState({
    wood: 1,
    stone: 1,
    metal: 1,
  });
  // number of workers at start of game (turn 1)
  const BASE_FREEWORKER_COUNT: number = 5;
  // number of new workers per turn increases over time
  const [newWorkers, setNewWorkers] = useState(1);

  /* ===BUILDINGS=== */
  const [buildings, setBuildings] = useState<Buildings>(buildingsData);
  const [buildingCosts, setBuildingCosts] =
    useState<BuildingCosts>(buildingCostsData);
  const buildingsUnderConstruction = Object.keys(buildings).filter(
    (key) => buildings[key].underConstruction
  );
  const buildingsToConstruct = Object.keys(buildings).filter(
    (key) => !buildings[key].constructed
  );

  /* ===UPGRADES=== */
  // Unused right now
  const [upgradeCosts, setUpgradeCosts] = useState<UpgradeCosts>(upgradesData);

  /* ===UNITS=== */
  const [unitCosts, setUnitCosts] = useState<UnitCosts>(unitCostsData);
  // ids for tracking units
  const [unitId, setUnitId] = useState(0);
  // friendly army
  const [myUnits, setMyUnits] = useState<Unit[]>([]);
  // constant NOT used here so I could clear training each turn
  const [myTrainingUnits, setMyTrainingUnits] = useState<TrainingUnit[]>([]);
  // placeholder enemy array for testing
  const [enemyUnits, setEnemyUnits] = useState<Unit[]>([]);
  // ===BASE STATS FOR NEW UNITS===
  // TODO: Will have dynamic update of attack and health stats based on building bonuses
  // TODO: Incorporate chance to hit (less when similar units are matched up), 5% chance to crit

  // FIXME: TypeScript yelling about incompatibility
  /* @ts-ignore */
  const BASE_UNIT_DATA: BaseUnit = baseUnitData as const;
  const unitTypes = Object.keys(BASE_UNIT_DATA);

  /* ===FUNCTIONS=== */
  // ADD units to either army
  const addTrainingUnit: AddRemoveUnitFn = (unitType, friendly) => {
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
  };

  const maxTrainingUnits: MaxTrainingUnitsFn = (
    unitType,
    friendly,
    maxTrainable
  ) => {
    if (friendly) {
      // fill an array with the appropriate number of the chosen unit type
      const _newUnits = Array(maxTrainable).fill({ unitType });
      setMyTrainingUnits(myTrainingUnits.concat(_newUnits));
    }
  };

  // REMOVE units from either army
  const removeTrainingUnit: AddRemoveUnitFn = (unitType, friendly) => {
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
  };

  const removeAllTrainingUnits: AddRemoveUnitFn = (unitType, friendly) => {
    if (friendly) {
      const _myTrainingUnitsCopy = [...myTrainingUnits];

      // filter out all units in the array of the selected type
      setMyTrainingUnits(
        _myTrainingUnitsCopy.filter((unit) => unit.unitType !== unitType)
      );
    }
  };

  /* ===DEV TOOLS=== */
  // add friendly/enemy units
  const addUnit = (unitType: UnitType, friendly: boolean) => {
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

  //add resources
  const addResource: AddResourceFn = (resourceType) => {
    const selectedResource = resources[resourceType];
    if (!selectedResource) {
      alert("resource doesn't exist");
      return;
    }
    const updatedResources = { ...resources };

    updatedResources[resourceType].collected += 10;
    setResources(updatedResources);
  };

  const collectResources = (resourcesCopy: Resources) => {
    // TODO: Make this dynamic based on existing resources
    resourcesCopy["wood"].collected =
      resources["wood"].collected +
      resources["wood"].workers * resourceMultipliers.wood;
    resourcesCopy["stone"].collected =
      resources["stone"].collected +
      resources["stone"].workers * resourceMultipliers.stone;
    resourcesCopy["metal"].collected =
      resources["metal"].collected +
      resources["metal"].workers * resourceMultipliers.metal;
  };

  const calculateFreeworkers = (resourcesCopy: Resources) => {
    // calculate freeworkers for next turn
    resourcesCopy["freeworkers"].collected = BASE_FREEWORKER_COUNT + newWorkers;
    setNewWorkers(newWorkers + 1);
  };

  const resetWorkers = (resourcesCopy: Resources) => {
    // reset workers
    resourcesCopy["wood"].workers = 0;
    resourcesCopy["stone"].workers = 0;
    resourcesCopy["metal"].workers = 0;
  };

  const buildingConstructor = (buildingsCopy: Buildings) => {
    // determine which buildings were under construction
    const newBuildings = Object.keys(buildings).filter(
      (key) => buildings[key].underConstruction
    );

    // take them out of construction and set them to constructed
    newBuildings.map((buildingType) => {
      buildingsCopy[buildingType].underConstruction = false;
      buildingsCopy[buildingType].constructed = true;
    });
  };

  let id = unitId;
  const trainUnits = () => {
    const units = myTrainingUnits.map((unit) => {
      // resolve base unit from unit type
      const _chosenUnit = BASE_UNIT_DATA[unit.unitType];
      id += 1;

      return {
        ..._chosenUnit,
        currentHealth: _chosenUnit.maxHealth,
        id, // shorthand for when key = value
      };
    });

    // bring all the training units into the main army
    setMyUnits((myUnits) => [...myUnits, ...units]);
  };

  /* Use to produce randomly distributed army composition */
  function RandomArmyComposition(numberOfUnitTypes: number) {
    // create an array of the correct size
    const _emptyArray = Array(numberOfUnitTypes).fill(null);
    // fill it with random numbers
    const _rndArray = _emptyArray.map((element) => Math.random());
    // get the sum of those numbers
    const _sum = _rndArray.reduce((a, b) => a + b, 0);
    // divide each element by their sum -- they're now a prob. distribution
    const _armyComposition = _rndArray.map((element) => element / _sum);
    return _armyComposition;
  }

  /* TODO: Get this working! */

  // units are trained based on the friendly army
  const trainEnemyUnits = (
    distributionType: string,
    numberOfFriendlyUnits: number,
    turnNumber: number
  ) => {
    // TODO: multipler could be based on difficulty
    const unitMultiplier = 1.0;
    const _numberOfEnemiesToGenerate = Math.round(
      numberOfFriendlyUnits * unitMultiplier
    );

    // check how many unit types there are in the game
    const numberOfUnitTypes = Object.keys(BASE_UNIT_DATA).length;

    // generate a random composition of units
    // TODO: Code should choose between multiple army compositions
    const armyComposition = RandomArmyComposition(numberOfUnitTypes);

    let enemyArmy: Unit[] = [];
    // TODO: Add the appopriate number of each unit to the enemy army
    Object.keys(BASE_UNIT_DATA).map((unit: string, index) => {
      // grab the chosen unit from the base unit data
      const _chosenUnit = BASE_UNIT_DATA[unit as UnitType];

      // the index is used to call the appropriate ratio from the composition function
      // that ratio is multiplied by numberOfFriendlyUnits to give a number of units
      // the result is rounded to the nearest integer
      const unitsOfThisTypeToGenerate = Math.round(
        armyComposition[index] * _numberOfEnemiesToGenerate
      );

      // fill an array with the appropriate number of the chosen unit
      const _newUnits = Array(unitsOfThisTypeToGenerate).fill(_chosenUnit);
      // add those units to the army
      enemyArmy = [...enemyArmy, ..._newUnits];
      console.log(enemyArmy);
    });

    // add current health and ID number to new units
    enemyArmy.map((unit) => {
      id += 1;
      unit.currentHealth = unit.maxHealth;
      /* FIXME: ID not incrementing for every unit */
      /* FIXME: May have to apply similar method to trainUnits() */
      unit.id = id;
    });

    // add all the units into the army
    setEnemyUnits((enemyUnits) => [...enemyUnits, ...enemyArmy]);
  };

  /* 
const trainUnits = () => {
    const units = myTrainingUnits.map((unit) => {
      // resolve base unit from unit type
      const _chosenUnit = BASE_UNIT_DATA[unit.unitType];
      id += 1;

      return {
        ..._chosenUnit,
        currentHealth: _chosenUnit.maxHealth,
        id, // shorthand for when key = value
      };
    });

    // bring all the training units into the main army
    setMyUnits((myUnits) => [...myUnits, ...units]);
  };
*/

  const endTurn = () => {
    if (resources["freeworkers"].collected > 0) {
      alert("You have not assigned all free workers!");
      return;
    }

    // copy resources to preserve state
    const resourcesCopy = { ...resources };

    collectResources(resourcesCopy);
    calculateFreeworkers(resourcesCopy);
    resetWorkers(resourcesCopy);
    setResources(resourcesCopy);

    // copy buildings to preserve state
    const buildingsCopy = { ...buildings };
    buildingConstructor(buildingsCopy);
    // FIXME: Why can this be removed and apparently still work properly??
    setBuildings(buildingsCopy);

    trainUnits();

    // update ID state accordingly
    setUnitId(id);
    // reset units in training back to zero
    setMyTrainingUnits([]);

    // TODO: Generate enemy army here on the appropriate turn; fn(number of friendlies, turn number)

    // increment turn
    setTurn(turn + 1);
  };

  const switchPhase = () => {
    setInCombat(!inCombat);
  };

  // How many units you're going to train this turn
  // TODO: How to make this dynamic based on base units?
  const unitsInTraining: UnitCounts = {
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
      <Combat
        myUnits={myUnits}
        enemyUnits={enemyUnits}
        setMyUnits={setMyUnits}
        setEnemyUnits={setEnemyUnits}
        townName={townName}
        switchPhase={switchPhase}
      />
      <DevTools
        BASE_UNIT_DATA={BASE_UNIT_DATA}
        resources={resources}
        resourceTypes={resourceTypes}
        addResource={addResource}
        addUnit={addUnit}
        switchPhase={switchPhase}
      />
    </>
  ) : (
    <div className="p-1">
      <div className="sticky top-0 z-10 grid auto-cols-auto">
        <div className="grid auto-cols-fr grid-flow-col justify-end rounded-md border border-slate-500 bg-slate-900/90 px-4 hover:bg-slate-900 sm:gap-x-4 md:gap-x-8 lg:gap-x-16">
          <DisplayResources
            resources={resources}
            resourceTypes={resourceTypes}
          />
          <div className="place-self-center text-xl">
            Train Units to Protect {townName || defaultTownName}!
          </div>
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
            maxTrainingUnits={maxTrainingUnits}
            removeTrainingUnit={removeTrainingUnit}
            removeAllTrainingUnits={removeAllTrainingUnits}
          />
        </FlexWrapContainer>
        <FlexWrapContainer headerText="Construct Buildings">
          {/* TODO: Match component structure with other cards */}
          {buildingsToConstruct.map((buildingType) => (
            <ConstructBuilding
              key={buildingType}
              buildings={buildings}
              setBuildings={setBuildings}
              buildingCosts={buildingCosts}
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
        switchPhase={switchPhase}
      />
      {/* TODO: Consider merging UnitCount and UnitInTraining components; only the count differs */}
      <div className="sticky bottom-0 z-10 grid auto-cols-auto">
        <div className="col-start-1 grid auto-cols-fr grid-flow-col justify-end rounded-md border border-slate-500 bg-slate-900/90 px-4 hover:bg-slate-900 sm:gap-x-4 md:gap-x-8 lg:gap-x-16">
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
