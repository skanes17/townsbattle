import React, { useState } from "react";
import {
  baseUnitData,
  buildingsData,
  resourceData,
  resourcePoolData,
  upgradesData,
} from "../gameData";
import {
  DisplayBuildings,
  Resource,
  ResourceToCollect,
  UnitCount,
  UnitInTraining,
} from "./planning/";
import { DevTools } from "./devTools";
import { DisplayTemplate } from "./dashboards";
import { ConstructBuilding, TrainingCardContainer } from "./cards";
import GridCardContainer from "./layout/GridCardContainer";
import { Button } from "./buttons";
import { Combat } from "./combat";
// import { buildingsData, buildingCostsData } from "../gameData/buildings";
// import { upgradesData } from "../gameData/upgrades";
// import { BaseUnit } from "../types/BaseUnit";
// import { BuildingCosts } from "../types/BuildingCosts";
import {
  BaseResourceType,
  BaseUnit,
  Buildings,
  Difficulty,
  GameProps,
  ResourceMultipliers,
  ResourcePool,
  Resources,
  ResourceType,
  TrainingUnit,
  Unit,
  UnitCounts,
  UnitType,
  UpgradeCosts,
} from "../types";
import { GameContext } from "../context/GameState";
import { useLocation } from "react-router-dom";
import {
  AddRemoveUnitFn,
  AddResourceFn,
  MaxTrainingUnitsFn,
} from "../types/FunctionTypes";
import {
  cloneBasicObjectWithJSON,
  countUnits,
  generateRandomArmyComposition,
  generateWeightedArmyComposition,
} from "../utils";
import { WorkerCardContainer } from "./cards/worker";

// FIXME: Many areas/lists don't have a unique key/id.

// TODO: Maybe if you choose not to use a worker you can get some gold (points)

// TODO: Call a function to add a set number of enemy units per turn
// -eg start with an army of 3, one of each
// After first wave, the number is increased by some amount each time
// -eg 7 units for second wave, enemy units randomly chosen
// Composition of army could be displayed to UI, for example 20% melee 30% pewpew 50% tanky

export default function Game(props: GameProps) {
  // pull startData from linked Play component
  const startData = useLocation();

  /* TODO: Add Type safety to startData? */

  const playerName =
    startData.state.playerName || startData.state.defaultPlayerName;
  const townName = startData.state.townName || startData.state.defaultTownName;
  const difficulty: Difficulty = startData.state.difficulty || "normal";
  // null coalescent used because false is a falsy value, and therefore would set tutorials to "true"
  const tutorials: boolean = startData.state.tutorials ?? true;

  /*
  // -- PREVIOUSLY IMPLEMENTED METHOD - RETRIEVE LOCALLY-STORED DATA SENT FROM MAIN PAGE
  // if localStorage values are non-null, use the locally stored values
  // if storage is null, use some default values so the game still runs
  const townName =
    // if the storage is null or the player didn't enter a name, set it as the default
    localStorage.getItem("townName") || defaultTownName;
  const difficulty =
    (localStorage.getItem("difficulty") as string) || "normal";
  const tutorials =
  JSON.parse(localStorage.getItem("tutorials")!) || true;
  */

  const [turn, setTurn] = useState(1);
  const [nextCombatTurn, setNextCombatTurn] = useState(1);

  // combat turn will change over time (increase/decrease, could fluctuate)
  const [planningTurnToGenerateEnemies, setPlanningTurnToGenerateEnemies] =
    useState(4);

  // how long to wait after enemies are generated before battle starts
  let turnsBetweenEnemyArmyGenAndCombat = 2;
  // planning turn on which combat actually starts
  const planningTurnToTriggerCombat =
    planningTurnToGenerateEnemies + turnsBetweenEnemyArmyGenAndCombat;

  const [inCombat, setInCombat] = useState(false);

  // points from rounds of combat get added to this
  const [score, setScore] = useState(0); // score could potentially be removed from state
  /* TODO: Points for a unit is trained, building built? */

  // TODO: Add food? And/or some resource common to all unit building?
  // Idea: Workers are consumed when used for making units...
  // ... but introduce a gold economy which is used for building stuff along with resources
  // .. then you need to choose between basic resources AND gold every turn
  // maybe workers aren't guaranteed every turn??
  // set number per turn, and a new building adds new ones per turn?

  /* ===RESOURCES AND WORKERS=== */
  const [resources, setResources] = useState<Resources>(resourceData);
  const [resourcePool, setResourcePool] =
    useState<ResourcePool>(resourcePoolData);
  const resourceTypes: ResourceType[] = Object.keys(
    resources
  ) as ResourceType[];
  const baseResourceTypes: BaseResourceType[] = Object.keys(resources).filter(
    (resourceType) => resourceType !== "workers"
  ) as BaseResourceType[];

  /* ===BUILDINGS=== */
  /* @ts-ignore -- It is seeing unitToUnlock as a string not UnitType*/
  const [buildings, setBuildings] = useState<Buildings>(buildingsData);
  const buildingsUnderConstruction = Object.keys(buildings).filter(
    (key) => buildings[key].underConstruction
  );
  const buildingsConstructed = Object.keys(buildings).filter(
    (key) => buildings[key].constructed
  );
  const buildingsLeftToConstruct = Object.keys(buildings).filter(
    (key) => !buildings[key].constructed
  );

  /* ===BUILDING EFFECTS=== */
  // number of new workers per turn increases when a certain building is built (eg Quality Housing)
  const newWorkers =
    (buildings["qualityHousing"].constructed
      ? buildings["qualityHousing"].workerBonus
      : 0) ??
    // returns 0 if it receives an undefined value
    0;
  // number of workers at start of the game (5) + workers generated by buildings each turn
  const workersPerTurn = 5 + newWorkers;

  /* ===UPGRADES=== */
  // Unused right now -- match buildings structure?
  const [upgradeCosts, setUpgradeCosts] = useState<UpgradeCosts>(upgradesData);

  /* ===UNITS=== */
  // friendly army
  const [myUnits, setMyUnits] = useState<Unit[]>([]);
  const [myTrainingUnits, setMyTrainingUnits] = useState<TrainingUnit[]>([]);
  // placeholder enemy array for testing
  const [enemyUnits, setEnemyUnits] = useState<Unit[]>([]);
  // ===BASE STATS FOR NEW UNITS===
  // TODO: Will have dynamic update of attack and health stats based on building bonuses
  // TODO: Incorporate chance to hit (less when similar units are matched up), 5% chance to crit

  // FIXME: Is this the best way to coerce the types?
  const BASE_UNIT_DATA: BaseUnit = baseUnitData as BaseUnit;
  const unitTypes: UnitType[] = Object.keys(BASE_UNIT_DATA) as UnitType[];
  const unlockedUnitTypes: (UnitType | undefined)[] = Object.keys(buildings)
    // filter by buildings constructed which are also set up to unlock a unit type
    .filter(
      (buildingType) =>
        buildings[buildingType].unlockedUnit &&
        buildings[buildingType].constructed
    )
    // map out the associated unit types
    .map((building) => buildings[building].unlockedUnit);

  // ids for tracking units
  const [unitId, setUnitId] = useState(0);

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

  const addResource: AddResourceFn = (resourceType: ResourceType) => {
    /* TODO: Add error catch */
    const clonedResourcePool = { ...resourcePool };
    clonedResourcePool[resourceType] += 10;
    setResourcePool(clonedResourcePool);
  };

  const addResourcesToPool = (resourcePool: ResourcePool) => {
    Object.keys(resources)
      .filter((resourceType) => resourceType !== "workers")
      .forEach((resourceType: string) => {
        resourcePool[resourceType as BaseResourceType] +=
          resources[resourceType as BaseResourceType].workers *
          resources[resourceType as BaseResourceType].multiplier;
      });
  };

  const addGoldToScore = () => {
    // score saved to constant in case resources state object is updated before the score state is updated
    const scoreFromGold = resources["gold"].workers * 10;
    setScore((prevScore) => prevScore + scoreFromGold);
  };

  const resetAssignedWorkers = (resources: Resources) => {
    Object.keys(resources)
      .filter((resourceType) => resourceType !== "workers")
      .map((resourceType) => {
        resources[resourceType as BaseResourceType].workers = 0;
      });
  };

  const buildingConstructor = (clonedBuildings: Buildings) => {
    // determine which buildings were under construction
    const buildingsUnderConstruction = Object.keys(buildings).filter(
      (key) => buildings[key].underConstruction
    );

    // take them out of construction and set them to constructed
    buildingsUnderConstruction.map((buildingType) => {
      clonedBuildings[buildingType].underConstruction = false;
      clonedBuildings[buildingType].constructed = true;

      // add to score
      const buildScore = clonedBuildings[buildingType].buildScore;
      setScore((prevScore) => prevScore + buildScore);
    });
  };

  const updateWorkersPerTurn = (resourcePool: ResourcePool) => {
    resourcePool["workers"] = workersPerTurn;
  };

  // TODO: Refactor to make build score incrementation more efficient (sum, set state once outside loop)
  let id = unitId;
  const trainUnits = () => {
    const units = myTrainingUnits.map((unit) => {
      // resolve base unit from unit type
      const _chosenUnit = BASE_UNIT_DATA[unit.unitType];
      id += 1;

      // add to score
      const buildScore = _chosenUnit.buildScore;
      setScore((prevScore) => prevScore + buildScore);

      return {
        ..._chosenUnit,
        currentHealth: _chosenUnit.maxHealth,
        id, // shorthand for when key = value
      };
    });

    // bring all the training units into the main army
    setMyUnits((myUnits) => [...myUnits, ...units]);
    // update ID state accordingly
    setUnitId(id);
  };

  // consider...
  // time/turn -- relative army strength -- unlocked units
  const generateEnemyArmy = (
    nextCombatTurn: number,
    friendlyUnits: Unit[],
    unlockedUnitTypes: (UnitType | undefined)[],
    allUnitTypes: UnitType[]
  ) => {
    // calculate the friendly army power level (the sum of all the attack, health, and threat levels)
    const { totalAttack, totalHealth, totalArmor, totalThreat } =
      friendlyUnits.reduce(
        // and an arrow function is called for each unit in friendlyUnits
        (totals, unit) => ({
          // For each unit, the arrow function adds the unit's attack, health, and threat to each total
          totalAttack: totals.totalAttack + unit.attack,
          totalHealth: totals.totalHealth + unit.currentHealth,
          totalArmor: totals.totalArmor + unit.armor,
          totalThreat: totals.totalThreat + unit.threatLevel,
        }),
        // Initilized values for total attack, total health, and total threat
        { totalAttack: 0, totalHealth: 0, totalArmor: 0, totalThreat: 0 }
      );

    const friendlyPowerLevel =
      totalAttack + totalHealth + totalArmor + totalThreat;
    console.log(friendlyPowerLevel);

    /* Alternate Method if only Power Level is desired:
    const friendlyPowerLevel = friendlyUnits.reduce((total, unit) => {
      return total + unit.attack + unit.currentHealth + unit.armor + unit.threatLevel;
    }, 0);
    console.log(friendlyPowerLevel);
    */

    // The following process takes the calculated power level and scales the enemy's power level accordingly.
    let difficultyMultiplier;
    // may not be balanced -- tweak as necessary!
    switch (difficulty) {
      case "easy":
        difficultyMultiplier = 0.5;
        break;
      case "normal":
        difficultyMultiplier = 1.0;
        break;
      case "hard":
        difficultyMultiplier = 1.25;
        break;
      default:
        difficultyMultiplier = 1.0;
    }

    // every combat won, the enemy army will grow by this percentage relative to the previous round
    const growthRate = 0.05; // tweak if necessary for balance but, generally, don't touch!
    // TODO: could auto-set this at start of the game based on difficulty
    // Equality turn is APPROXIMATE number of combat turns to pass, on normal mode, until power levels of both armies are about equal
    const equalityTurn = 10; // default 10

    // set a baseline power level for the game -- tweak for balance as necessary
    const basePowerLevel = 4;

    // exponential growth formula based on E(turns) = D * (P(1+r)^(nextCombatTurn-equalityTurn) + (basePowerLevel * nextCombatTurn)) where...
    // y = enemy power level, D = difficulty
    // P = friendly power level, nextCombatTurn = which combat turn is next
    // equalityTurn = desired turn until match (excluding basePowerLevel)

    // reference -> https://www.desmos.com/calculator/uli0ce3voh
    /* --WANNA TWEAK THE SCALING SYSTEM? TWEAK THIS-- */
    const scaledEnemyPowerLevel =
      friendlyPowerLevel *
      Math.pow(1 + growthRate, nextCombatTurn - equalityTurn);
    console.log(scaledEnemyPowerLevel);

    // set a minimum power level for enemy army based on how many combats there have been, regardless of player power level
    // basePowerLevel * nextCombatTurn is a simple linear function
    const minimumEnemyPowerLevel =
      difficultyMultiplier *
      (scaledEnemyPowerLevel + basePowerLevel * nextCombatTurn);
    console.log(scaledEnemyPowerLevel);

    const enemyArmy: Unit[] = [];
    let powerLevel = 0;
    let id = unitId;
    while (powerLevel < minimumEnemyPowerLevel) {
      // TODO: Tweak enemy composition based on turn here

      let unitType: UnitType;
      if (nextCombatTurn === 1) {
        // going into first combat? enemies are all farmers
        unitType = "farmer";
      } else if (nextCombatTurn === 2) {
        // going into second combat? there's 1 melee; the rest are farmers
        // could tweak for this to happen later (eg combat turn 3)
        switch (powerLevel) {
          case 0:
            // add a melee first time around the loop, when power level is 0
            unitType = "melee";
            break;
          default:
            // default to farmer for the rest
            unitType = "farmer";
        }
      } else if (nextCombatTurn === 3) {
        switch (powerLevel) {
          // introduce 1 ranged enemy
          case 0:
            unitType = "pewpew";
            break;
          default:
            // TODO: the rest can be randomly chosen from player's UNLOCKED units
            // it shouldn't be undefined because farmers are always available at start
            console.log(unlockedUnitTypes);
            unitType =
              unlockedUnitTypes[
                Math.floor(Math.random() * unlockedUnitTypes.length)
              ]!;
            console.log(unitType);
        }
      } else if (nextCombatTurn > 3 && nextCombatTurn < 7) {
        // for now, choose randomly from the unlocked unit types
        unitType =
          unlockedUnitTypes[
            Math.floor(Math.random() * unlockedUnitTypes.length)
          ]!;
      }
      // TODO: Do more manual progression staging here when new units are added!
      else {
        // At this point, all units in the game are available for choosing.
        // TODO: Could utilize the army generator functions here!
        unitType =
          allUnitTypes[Math.floor(Math.random() * allUnitTypes.length)];
      }
      // enemy units don't get buffs in this version of the game
      const chosenUnit = { ...BASE_UNIT_DATA[unitType] };
      id += 1;
      // adding a current health key/value and id to the unit
      const chosenUnitWithCurrentHealth: Unit = {
        ...chosenUnit,
        currentHealth: chosenUnit.maxHealth,
        id,
      };
      // add it to the army
      enemyArmy.push(chosenUnitWithCurrentHealth);
      // add this unit's power level to the total
      const { attack, maxHealth, threatLevel } = chosenUnitWithCurrentHealth;
      powerLevel += attack + maxHealth + threatLevel;
    }
    console.log("Power level: " + powerLevel);
    console.log(enemyArmy);

    const types = enemyArmy.map((unit) => unit.unitType);
    const enemyUnitTypes = new Set(types).size;

    // new messages if Scout Unit was constructed
    if (buildings["scoutUnit"].constructed) {
      alert(
        `Scouts report that the enemy army has ${
          enemyArmy.length
        } units, with ${enemyUnitTypes} unit type${
          enemyUnitTypes > 1 ? "s" : ""
        }.`
      );
    }

    setEnemyUnits(enemyArmy);

    // thoughts on composition of enemy army...
    // if combat turns = 0, generate only farmers
    // if combat turns = 1, generate only farmers and one melee
    // if combat turns = 2, generate only melees? or farmers and 1-2 melees
    // if combat turns = 3, generate only pewpew
    // if combat turns = 4, generate melees and pewpew
    // if combat turns = 5, generate melees, pewpews, 1 tanky
    // if combat turns = 6, generate any combination
    // if combat turns = 7, from then on, any combination, unlock a new unit type for enemies after every combat?
  };

  /* array to to hold army composition functions */
  const armyCompositions = [
    generateRandomArmyComposition,
    generateWeightedArmyComposition,
  ];

  // units are trained based on the composition of friendly army
  const trainEnemyUnits = (
    // distributionType: string,
    numberOfFriendlyUnits: number
    // turnNumber: number
  ) => {
    // TODO: multipler could be based on difficulty
    const unitMultiplier = 1.0;
    const numberOfEnemiesToGenerate = Math.round(
      numberOfFriendlyUnits * unitMultiplier
    );

    // check how many unit types there are in the game
    const numberOfUnitTypes = Object.keys(BASE_UNIT_DATA).length;

    // set max weight for unit
    const maxWeight = 0.8;
    // set min weight for unit type
    const minWeight = 0.5;
    // choose the unit weight to be somewhere between min and max
    const unitWeight = Math.random() * (maxWeight - minWeight) + minWeight;

    // the following picks functions from an array which determine the composition of units
    // then, the function is called using "(numberOfUnitTypes)" as the argument
    const armyComposition = armyCompositions[
      Math.floor(Math.random() * armyCompositions.length)
    ](numberOfUnitTypes, unitWeight);

    let newUnits: Unit[] = [];
    // Add the appopriate number of each unit to the enemy army
    Object.keys(BASE_UNIT_DATA).map((unit: string, index) => {
      // grab the chosen unit from the base unit data
      const chosenUnit = BASE_UNIT_DATA[unit as UnitType];

      // the index is used to call the appropriate ratio from the composition function
      // that ratio is multiplied by numberOfFriendlyUnits to give a number of units
      // the result is rounded to the nearest integer
      const unitsOfThisTypeToGenerate = Math.round(
        armyComposition[index] * numberOfEnemiesToGenerate
      );

      // fill an array with units of the chosen type and add those units to the army
      newUnits = [
        ...newUnits,
        ...Array(unitsOfThisTypeToGenerate).fill(chosenUnit),
      ];
    });

    // add current health and ID number to new units
    const allNewUnits = newUnits.map((unit) => {
      id += 1;
      return {
        ...unit,
        currentHealth: unit.maxHealth,
        id,
      };
    });

    // add all the new units into the army
    setEnemyUnits((enemyUnits) => [...enemyUnits, ...allNewUnits]);
  };

  const scoreUpdaterFn = (points: number) => {
    setScore((prev) => prev + points);
  };

  const switchPhase = () => {
    setInCombat(!inCombat);
  };

  const endTurn = () => {
    if (resourcePool["workers"] > 0) {
      alert("You have not assigned all workers!");
      return;
    }

    if (turn === planningTurnToGenerateEnemies) {
      generateEnemyArmy(nextCombatTurn, myUnits, unlockedUnitTypes, unitTypes);
      alert(
        `The enemy army will reach the town in ${turnsBetweenEnemyArmyGenAndCombat} turn${
          turnsBetweenEnemyArmyGenAndCombat > 1 ? "s" : ""
        }!`
      );
    }

    // clone resources, resource pool, and buildings to preserve state
    const clonedResources = cloneBasicObjectWithJSON(resources);
    const clonedResourcePool = { ...resourcePool };
    const clonedBuildings = cloneBasicObjectWithJSON(buildings);

    addResourcesToPool(clonedResourcePool);
    addGoldToScore();

    buildingConstructor(clonedBuildings);
    setBuildings(clonedBuildings);

    resetAssignedWorkers(clonedResources);
    setResources(clonedResources);
    // FIXME: can't get this to fire when I'd like! Fires late.
    setResourcePool({ ...clonedResourcePool, workers: workersPerTurn });

    /* TODO: Newly trained units add to score */
    trainUnits();

    // reset units in training back to zero
    setMyTrainingUnits([]);

    // TODO: Generate enemy army here on the appropriate turn
    // The function could have parameters such as time passed (eg turn number), available units, relative army strength

    if (turn === planningTurnToTriggerCombat) {
      switchPhase();
      // reset turn to 1 (could do this after combat instead, doesn't really matter)
      setTurn(1);
      setNextCombatTurn((prev) => prev + 1);
    } else {
      // increment turn
      setTurn((prev) => prev + 1);
    }
  };

  // How many units you're going to train this turn
  /* FIXME: Modify function to include training unit types */
  /*   const unitsInTraining = countUnits(myTrainingUnits, unitTypes);  */
  const unitsInTraining: UnitCounts = {};
  for (const unitType of unitTypes) {
    unitsInTraining[unitType] = myTrainingUnits.filter(
      (unit) => unit.unitType === unitType
    ).length;
  }

  // How many units are in your army
  const unitCounts = countUnits(myUnits, unitTypes, "army");
  const enemyUnitCounts = countUnits(enemyUnits, unitTypes, "army");

  /* TODO: Incorporate this on building click */
  const [toggle, setToggle] = useState(false);

  return inCombat ? (
    <>
      <Combat
        BASE_UNIT_DATA={BASE_UNIT_DATA}
        unitTypes={unitTypes}
        unlockedUnitTypes={unlockedUnitTypes}
        myUnits={myUnits}
        enemyUnits={enemyUnits}
        setMyUnits={setMyUnits}
        setEnemyUnits={setEnemyUnits}
        townName={townName}
        buildings={buildings}
        setBuildings={setBuildings}
        switchPhase={switchPhase}
        scoreUpdaterFn={scoreUpdaterFn}
      />
      <DevTools
        BASE_UNIT_DATA={BASE_UNIT_DATA}
        resources={resources}
        resourceTypes={resourceTypes}
        addResource={addResource}
        addUnit={addUnit}
        switchPhase={switchPhase}
        myUnits={myUnits}
        trainEnemyUnits={trainEnemyUnits}
      />
    </>
  ) : (
    // MODAL STUFF -- The TrainingCardContainer would go inside the building card
    <div className="p-1">
      <div
        className={`fixed inset-0 z-10 transition-all ${
          toggle ? "opacity-100" : "invisible opacity-0"
        } bg-zinc-900/50 duration-500 ease-in-out`}
      >
        {/*
        allows user to click outside to close the modal when paired with an onClick event
       <div className="fixed inset-0 h-full w-full bg-black opacity-40"></div>
        */}
        <div
          className={`${
            toggle ? null : "translate-y-full"
          } z-50 flex min-h-screen items-center px-4 py-8 transition-all duration-500 ease-in-out`}
        >
          <div
            className={
              "relative mx-auto w-fit max-w-lg rounded-md border border-white bg-zinc-800 p-4 shadow-lg"
            }
          >
            {unlockedUnitTypes.length > 0 ? (
              <div className="flex items-center justify-center">
                <TrainingCardContainer
                  unlockedUnitTypes={unlockedUnitTypes}
                  buildings={buildings}
                  resources={resources}
                  resourcePool={resourcePool}
                  setResourcePool={setResourcePool}
                  unitsInTraining={unitsInTraining}
                  BASE_UNIT_DATA={BASE_UNIT_DATA}
                  addTrainingUnit={addTrainingUnit}
                  maxTrainingUnits={maxTrainingUnits}
                  removeTrainingUnit={removeTrainingUnit}
                  removeAllTrainingUnits={removeAllTrainingUnits}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div>Score: {score}</div>
      <div className="sticky top-0 z-10 grid auto-cols-auto">
        <div className="grid auto-cols-fr grid-flow-col justify-end rounded-md border border-slate-500 bg-slate-900/90 px-4 hover:bg-slate-900 sm:gap-x-4 md:gap-x-8 lg:gap-x-16">
          <div className="grid auto-cols-auto grid-flow-col">
            <DisplayTemplate headerText="Workers">
              {resourceTypes
                .filter((resourceType) => resourceType === "workers")
                .map((resourceType: ResourceType) => (
                  <Resource
                    resources={resources}
                    resourcePool={resourcePool}
                    resourceType={resourceType}
                  />
                ))}
            </DisplayTemplate>
            <DisplayTemplate headerText="Resources Collected">
              {resourceTypes
                .filter((resourceType) => resourceType !== "workers")
                .map((resourceType: ResourceType) => (
                  <Resource
                    resources={resources}
                    resourcePool={resourcePool}
                    resourceType={resourceType}
                  />
                ))}
            </DisplayTemplate>
          </div>

          {/* TODO: Only show unit counts once units are unlocked, and only show appropraite counts for unit types unlocked */}
          {unlockedUnitTypes.length > 0 ? (
            <DisplayTemplate headerText="Army">
              {unitTypes.map((unitType: UnitType) =>
                unitCounts[unitType] > 0 ? (
                  <UnitCount
                    BASE_UNIT_DATA={BASE_UNIT_DATA}
                    unitType={unitType}
                    unitCounts={unitCounts}
                  />
                ) : null
              )}{" "}
            </DisplayTemplate>
          ) : null}

          {/* FIXME: Make this into a tooltip, like a question mark circle thing you hover over or click */}
          {unlockedUnitTypes.length > 1 ? (
            <div className="place-self-center text-xl">
              Tip: Train Units to Protect {townName}!
            </div>
          ) : (
            <div className="place-self-center text-xl">
              Tip: Construct buildings to unlock new units!
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly">
        <GridCardContainer headerText="Collect Resources">
          <WorkerCardContainer
            resources={resources}
            setResources={setResources}
            resourcePool={resourcePool}
            setResourcePool={setResourcePool}
          />
        </GridCardContainer>

        {unlockedUnitTypes.length > 0 ? (
          <GridCardContainer headerText="Train Units">
            <TrainingCardContainer
              unlockedUnitTypes={unlockedUnitTypes}
              buildings={buildings}
              resources={resources}
              resourcePool={resourcePool}
              setResourcePool={setResourcePool}
              unitsInTraining={unitsInTraining}
              BASE_UNIT_DATA={BASE_UNIT_DATA}
              addTrainingUnit={addTrainingUnit}
              maxTrainingUnits={maxTrainingUnits}
              removeTrainingUnit={removeTrainingUnit}
              removeAllTrainingUnits={removeAllTrainingUnits}
            />
          </GridCardContainer>
        ) : null}

        {/* If there are no buildings left to construct, remove the section */}
        {buildingsLeftToConstruct.length > 0 ? (
          <GridCardContainer headerText="Construct Buildings">
            {/* TODO: Match component structure with other cards */}
            {buildingsLeftToConstruct.map((buildingType) => (
              <ConstructBuilding
                key={buildingType}
                buildings={buildings}
                setBuildings={setBuildings}
                /* buildingCosts={buildingCosts} */
                buildingType={buildingType}
                resources={resources}
                setResources={setResources}
                resourcePool={resourcePool}
                setResourcePool={setResourcePool}
              />
            ))}
          </GridCardContainer>
        ) : null}
        <GridCardContainer headerText="Buildings Constructed">
          {/* TODO: Match component structure with other cards */}
          <DisplayBuildings buildings={buildings} />
        </GridCardContainer>
      </div>
      <br></br>
      <DevTools
        BASE_UNIT_DATA={BASE_UNIT_DATA}
        resources={resources}
        resourceTypes={resourceTypes}
        addResource={addResource}
        addUnit={addUnit}
        switchPhase={switchPhase}
        myUnits={myUnits}
        trainEnemyUnits={trainEnemyUnits}
      />
      {/* TODO: Combine UnitCount and UnitInTraining into one general component; only the count differs */}
      <div className="sticky bottom-0 z-10 grid auto-cols-auto">
        <div className="grid auto-cols-fr grid-flow-col justify-end rounded-md border border-slate-500 bg-slate-900/90 px-4 hover:bg-slate-900 sm:gap-x-4 md:gap-x-8 lg:gap-x-16">
          <DisplayTemplate headerText="Resources to Collect">
            {baseResourceTypes.map((resourceType) =>
              resources[resourceType].workers > 0 ? (
                <ResourceToCollect
                  resources={resources}
                  resourceType={resourceType}
                />
              ) : null
            )}
          </DisplayTemplate>

          <DisplayTemplate headerText="Units to Train">
            {unitTypes.map((unitType) =>
              unitsInTraining[unitType] > 0 ? (
                <UnitInTraining
                  BASE_UNIT_DATA={BASE_UNIT_DATA}
                  unitType={unitType}
                  unitsInTraining={unitsInTraining}
                />
              ) : null
            )}
          </DisplayTemplate>

          <div className="sticky bottom-0 flex items-center justify-center p-0">
            <Button buttonColor="blue" onClick={endTurn}>
              End Turn {turn}
            </Button>
          </div>

          <DisplayTemplate headerText="Buildings Under Construction">
            {buildingsUnderConstruction.map((building) =>
              buildingsUnderConstruction.length > 0 ? (
                <div>{buildings[building].symbol}</div>
              ) : null
            )}
          </DisplayTemplate>
        </div>
      </div>
    </div>
  );
}
