import React, { useRef, useState } from "react";
import {
  baseUnitData,
  buildingsData,
  resourceData,
  resourcePoolData,
  TutorialMessages,
  upgradesData,
} from "../gameData";
import {
  BaseResource,
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
import WorkerCardContainer from "./cards/worker/WorkerCardContainer";
import NavButton from "./navbar/NavButton";
import { NavButtons, NavButtonType } from "../types/NavButtons";
import ArmyGrid from "./planning/ArmyGrid";
import { Combat, PostCombatUnitsStatBox } from "./combat";
import DashboardImageAndCount from "./planning/DashboardImageAndCount";
import UnitCountsBox from "./planning/UnitCountsBox";
import useSound from "use-sound";
/* @ts-ignore */
import constructBldgSfx from "../assets/sounds/constructBldgSfx.mp3";
import { ModalHeader, ModalTextContent } from "./planning/tutorials";
import { TutorialModalAsSection } from "./planning/tutorials/TutorialModalAsSection";
import { TipsSeen, TutorialCategory } from "../types/TutorialTypes";

// FIXME: Many areas/lists don't have a unique key/id.

// TODO: Maybe if you choose not to use a worker you can get some gold (points)

// TODO: Call a function to add a set number of enemy units per turn
// -eg start with an army of 3, one of each
// After first wave, the number is increased by some amount each time
// -eg 7 units for second wave, enemy units randomly chosen
// Composition of army could be displayed to UI, for example 20% fighter 30% archer 50% knight

export default function Game(props: GameProps) {
  const [devTools, setDevTools] = useState(false);

  // pull startData from linked Play component
  const startData = useLocation();

  // grab data from state/useLocation (sent through Link)
  const startDataPlayerName: string =
    startData.state.playerName || startData.state.defaultPlayerName;
  const startDataTownName: string =
    startData.state.townName || startData.state.defaultTownName;
  const startDataDifficulty: Difficulty = startData.state.difficulty;
  const startDataTutorials: boolean = startData.state.tutorials;

  // setting player options
  // from state first, or local storage second, or defaults as backup
  const playerName =
    startDataPlayerName || localStorage.getItem("playerName") || "Player";
  const townName =
    startDataTownName || localStorage.getItem("townName") || "Townsburg";
  const difficulty: Difficulty =
    startDataDifficulty ||
    (localStorage.getItem("difficulty") as string) ||
    "normal";
  const [tutorials, setTutorials] = useState(
    startDataTutorials ??
      JSON.parse(localStorage.getItem("tutorials") ?? "true")
  );

  // -- NOTE ON RETRIEVING LOCALLY-STORED DATA SENT FROM MAIN PAGE IF NECESSARY
  // if localStorage values are non-null, use the locally stored values
  // if storage is null, use some default values so the game still runs

  const [turn, setTurn] = useState(1);
  const [nextCombatTurn, setNextCombatTurn] = useState(1);

  const [numberOfCombatsStarted, setNumberOfCombatsStarted] = useState(0);

  // enemy will not be generated before reaching this turn number has passed
  const minimumPlanningTurnsUntilEnemyGen = 4;
  // after this many COMBATs, you'll get an extra planning turn before enemies are generated
  const numberOfCombatsStartedUntilEnemyGenGetsDelayedByOne = 4;
  // this is the turn on which enemies are actually generated
  const planningTurnToGenerateEnemies =
    minimumPlanningTurnsUntilEnemyGen +
    Math.floor(
      nextCombatTurn / numberOfCombatsStartedUntilEnemyGenGetsDelayedByOne
    );

  // how long to wait after enemies are generated before combat starts
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
  const numberOfWorkersAtStartOfGame = 5;
  const [resourcePool, setResourcePool] =
    useState<ResourcePool>(resourcePoolData);
  const resourceTypes: ResourceType[] = Object.keys(
    resources
  ) as ResourceType[];
  const allBaseResourceTypesInTheGame: BaseResourceType[] = Object.keys(
    resources
  ).filter((resourceType) => resourceType !== "workers") as BaseResourceType[];

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

  const [playConstructBldgSound] = useSound(constructBldgSfx);

  /* ===BUILDING EFFECTS=== */
  // number of new workers per turn increases when a certain building is built (eg Quality Housing)
  const extraWorkersFromBuildings =
    (buildings["qualityHousing"].constructed
      ? buildings["qualityHousing"].workerBonus
      : 0) ??
    // returns 0 if it receives an undefined value
    0;
  // adds number of workers at start of the game and workers generated by buildings each turn
  const workersPerTurn =
    numberOfWorkersAtStartOfGame +
    extraWorkersFromBuildings +
    numberOfCombatsStarted;

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

  // FIXME: Must improve type safety coming from baseUnitData
  const BASE_UNIT_DATA: BaseUnit = baseUnitData as BaseUnit;
  const unitTypes: UnitType[] = Object.keys(BASE_UNIT_DATA) as UnitType[];

  // ===UNLOCKABLES===
  const unlockedUnitTypes: (UnitType | undefined)[] = Object.keys(buildings)
    // filter by buildings set up to unlock a unit type which are also constructed
    .filter(
      (buildingType) =>
        buildings[buildingType].unlockedUnit &&
        buildings[buildingType].constructed
    )
    // map out the associated unit types
    .map((building) => buildings[building].unlockedUnit);

  const lockedUnitTypes: (UnitType | undefined)[] = Object.keys(buildings)
    // filter by units set up to unlock a unit type but are not yet constructed
    .filter(
      (buildingType) =>
        buildings[buildingType].unlockedUnit &&
        !buildings[buildingType].constructed
    )
    // map out the associated unit types
    .map((building) => buildings[building].unlockedUnit);

  const resourcesLockedToPlayer: (BaseResourceType | undefined)[] = Object.keys(
    buildings
  )
    // filter by buildings set up to unlock a resource type but are not yet constructed
    .filter(
      (buildingType) =>
        buildings[buildingType].unlockedResource &&
        !buildings[buildingType].constructed
    )
    // map out the associated resource types
    .map((building) => buildings[building].unlockedResource);

  // this filter method will filter all locked resourced from the base resources
  const resourceTypesAvailableToPlayer: (BaseResourceType | undefined)[] =
    allBaseResourceTypesInTheGame.filter(
      (resourceType) => !resourcesLockedToPlayer.includes(resourceType)
    );

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
    const scoreFromGold = resources["gold"].workers * 1000;
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

      playConstructBldgSound();

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

    /* TODO: Consider adding resources into the mix */

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
        difficultyMultiplier = 1.5;
        break;
      case "nightmare":
        difficultyMultiplier = 2;
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
    const basePowerLevel = 5;

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
      (scaledEnemyPowerLevel + basePowerLevel * Math.pow(nextCombatTurn, 2));
    console.log(scaledEnemyPowerLevel);

    const enemyArmy: Unit[] = [];
    let powerLevel = 0;
    let id = unitId;
    while (powerLevel < minimumEnemyPowerLevel) {
      // TODO: Tweak enemy composition based on turn here

      let unitType: UnitType;
      if (nextCombatTurn === 1) {
        // going into first combat? enemies are all workers
        unitType = "villager";
      } else if (nextCombatTurn === 2) {
        // going into second combat? there's 1 fighter; the rest are villagers
        // could tweak for this to happen later (eg combat turn 3)
        switch (powerLevel) {
          case 0:
            // add a fighter first time around the loop, when power level is 0
            unitType = "fighter";
            break;
          default:
            // default to villager for the rest
            unitType = "villager";
        }
      } else if (nextCombatTurn === 3) {
        switch (powerLevel) {
          // introduce 1 ranged enemy
          case 0:
            unitType = "archer";
            break;
          default:
            // TODO: the rest can be randomly chosen from player's UNLOCKED units
            // it shouldn't be undefined because villagers are always available at start
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
        // At this point, all units in the game are available for choosing, EXCEPT workers.
        // TODO: Could utilize the army generator functions here!
        const allUnitsButworkers = allUnitTypes.filter(
          (unit: UnitType) => unit !== "villager"
        );
        unitType =
          allUnitsButworkers[
            Math.floor(Math.random() * allUnitsButworkers.length)
          ];
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
      /* TODO: Call a function here taking the power levels and sizes and returning the Scout's Report! */
      /* if (friendlyUnits.length < enemyUnits.length && friendlyPowerLevel < powerLevel / 2) {
        alert(
          `Scout's Report on the Enemy --  Unit Count: We're greatly outnumbered, Unit Types: ${enemyUnitTypes}, Threat Level: Critical!, Summary: The enemy has a larger and much more threatening army than ours.`
        );
      } else if ((friendlyUnits.length > enemyUnits.length && friendlyPowerLevel < powerLevel / 2))
      alert(
        `Scout's Report on the Enemy --  Unit Count: We outnumber them! Unit Types: ${enemyUnitTypes}, Threat Level: High, Summary: The enemy has a smaller but more threatening army than ours.`
      )
    } else if (friendlyUnits.length < enemyUnits.length && friendlyPowerLevel < powerLevel){
    alert(
      `Scout's Report on the Enemy --  Unit Count: We're outnumbered! Unit Types: ${enemyUnitTypes}, Threat Level: High, Summary: The enemy has a smaller but more threatening army than ours.`

      `Scout Report: Your army seems to be smaller and less threatening than that of the enemy.`
    )
  }else if (friendlyUnits.length > enemyUnits.length && friendlyPowerLevel < powerLevel){
  alert(
    `Scout Report: Your army seems to be larger than the enemy's, but less threatening!`
  )} 


  else if (friendlyUnits.length < enemyUnits.length && powerLevel < friendlyPowerLevel / 2) {
    alert(
      `Scout Report: The enemy army is currently much more threatening than yours, and has more units!`
    );
  } else if (friendlyUnits.length > enemyUnits.length && powerLevel < friendlyPowerLevel / 2){
  alert(
    `Scout Report: The enemy army is currently smaller than yours, but still seems to be much more threatening!`
  )
} else if (friendlyUnits.length < enemyUnits.length && powerLevel < friendlyPowerLevel){
alert(
  `Scout Report: Your army seems to be smaller and less threatening than that of the enemy.`
)
}else if (friendlyUnits.length > enemyUnits.length && powerLevel < friendlyPowerLevel){
alert(
`Scout Report: Your army seems to be larger than the enemy's, but less threatening!`
)} else  */

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
    // if combat turns = 0, generate only workers
    // if combat turns = 1, generate only workers and one fighter
    // if combat turns = 2, generate only fighters? or workers and 1-2 fighters
    // if combat turns = 3, generate only archer
    // if combat turns = 4, generate fighters and archer
    // if combat turns = 5, generate fighters, archers, 1 knight
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
    if (turn === planningTurnToGenerateEnemies) {
      generateEnemyArmy(nextCombatTurn, myUnits, unlockedUnitTypes, unitTypes);
      /* alert(
        `The enemy army will reach the town in ${turnsBetweenEnemyArmyGenAndCombat} turn${
          turnsBetweenEnemyArmyGenAndCombat > 1 ? "s" : ""
        }!`
      ); */
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

    trainUnits();

    // reset units in training back to zero
    setMyTrainingUnits([]);

    if (turn === planningTurnToTriggerCombat) {
      switchPhase();
      // Unused -- reset turn to 1
      setTurn(1);
      // increment the number of combats FIXME: Delayed by one
      setNumberOfCombatsStarted((prev) => prev + 1);

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

  // TODO: Consider better way of doing this?
  const [activeNavButtons, setActiveNavButtons] = useState<NavButtons>({
    score: {
      active: false,
      bgImage: "bg-score",
      tipSeen: false,
    },
    resources: {
      active: true,
      bgImage: "bg-resources",
      tipSeen: false,
    },
    training: {
      active: false,
      bgImage: "bg-training",
      tipSeen: false,
    },
    buildings: {
      active: false,
      bgImage: "bg-buildings",
      tipSeen: false,
    },
    army: {
      active: false,
      bgImage: "bg-army",
      tipSeen: false,
    },
    planning: {
      active: false,
      bgImage: "bg-planning",
      tipSeen: false,
    },
    tips: {
      active: false,
      bgImage: "bg-tips",
      tipSeen: false,
    },
  });

  const navButtonOn = (navButtonType: NavButtonType) => {
    // if falsy (undefined, etc), bail
    if (!navButtonType) {
      return;
    }

    const clonedActiveNavButtons = cloneBasicObjectWithJSON(activeNavButtons);

    // check the activeNavButtons keys against the desired navButton to "turn on"
    for (const key in clonedActiveNavButtons) {
      if (navButtonType === "score") {
        return;
      }

      navButtonType === key
        ? (clonedActiveNavButtons[key].active = true)
        : (clonedActiveNavButtons[key].active = false);
    }

    setActiveNavButtons(clonedActiveNavButtons);
  };

  const [tipsSeen, setTipsSeen] = useState<TipsSeen>({
    score: false,
    resources: false,
    training: false,
    buildings: false,
    army: false,
    planning: false,
    tips: false,
    combat: false,
  });

  const markTipAsSeen = (tutorialCategory: TutorialCategory) => {
    if (!tutorialCategory) {
      return;
    }

    const clonedTipsSeen = cloneBasicObjectWithJSON(tipsSeen);

    // note that the tip has been seen
    clonedTipsSeen[tutorialCategory] = true;
    setTipsSeen(clonedTipsSeen);
  };

  // Listener for checking window width
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 640;

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return inCombat ? (
    <>
      <div className="h-screen">
        <Combat
          tutorials={tutorials}
          tipsSeen={tipsSeen}
          markTipAsSeen={markTipAsSeen}
          currentCombatTurn={numberOfCombatsStarted}
          BASE_UNIT_DATA={BASE_UNIT_DATA}
          unitTypes={unitTypes}
          unlockedUnitTypes={unlockedUnitTypes}
          myUnits={myUnits}
          enemyUnits={enemyUnits}
          setMyUnits={setMyUnits}
          setEnemyUnits={setEnemyUnits}
          townName={townName}
          resourcePool={resourcePool}
          setResourcePool={setResourcePool}
          buildings={buildings}
          setBuildings={setBuildings}
          switchPhase={switchPhase}
          scoreUpdaterFn={scoreUpdaterFn}
        />
      </div>
      {devTools ? (
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
      ) : null}
    </>
  ) : (
    <>
      {/*
      Reference - https://flowbite.com/docs/components/sidebar/
      Also use this reference for incorporating a mini sidebar
      */}
      {/* TODO: Center items vertically somehow */}
      <div className="z-0 bg-brown bg-contain bg-center">
        {/* TODO: Make grid-rows-[1fr_repeat(4,5fr)_1.5fr] more responsive by making the repeat dynamic, somehow */}
        <nav className="pointer-events-none fixed top-0 left-0 z-20 grid h-screen w-36 grid-rows-[1fr_repeat(5,2fr)_1.5fr] text-lg transition-transform sm:grid-rows-[1fr_repeat(5,5fr)_1.5fr] md:w-64 md:grid-rows-[1fr_repeat(5,3fr)_1.5fr]">
          <>
            {Object.keys(activeNavButtons).map((key) => {
              return (
                <NavButton
                  currentNavButtonType={key as NavButtonType}
                  buttonStyle={key as NavButtonType}
                  stateTrigger={activeNavButtons[key].active}
                  navButtonOn={navButtonOn}
                  bgImage={activeNavButtons[key].bgImage}
                  tutorials={tutorials}
                  tipSeen={tipsSeen[key]}
                  markTipAsSeen={markTipAsSeen}
                >
                  {key === "score" ? `Score: ${score}` : key}
                </NavButton>
              );
            })}
          </>
        </nav>

        <div className="z-0 ml-[4.5rem] min-h-screen text-base sm:ml-40 sm:mr-3 sm:text-lg md:ml-[17rem] md:mr-4 lg:ml-72 lg:text-2xl">
          {/* TODO: Add a clock */}
          <div className="sticky top-0 z-10 grid auto-cols-auto">
            <div className="mx-1 grid grid-flow-row grid-cols-[1fr_4fr] justify-items-center rounded-b-md border border-t-0 border-slate-500 bg-slate-900 px-4 hover:bg-slate-900 sm:grid-cols-[1fr_3fr_4fr] sm:gap-x-4 md:gap-x-8 lg:gap-x-16">
              <DisplayTemplate headerText="Workers">
                {resourceTypes
                  .filter((resourceType) => resourceType === "workers")
                  .map((resourceType: ResourceType) => (
                    <DashboardImageAndCount
                      dataObject={resources}
                      countsObject={resourcePool}
                      type={resourceType}
                    />
                  ))}
              </DisplayTemplate>
              <DisplayTemplate headerText="Resource Pool">
                {resourceTypesAvailableToPlayer.map(
                  (resourceType: BaseResourceType | undefined) => (
                    <DashboardImageAndCount
                      dataObject={resources}
                      countsObject={resourcePool}
                      type={resourceType as BaseResourceType}
                    />
                  )
                )}
              </DisplayTemplate>

              {/* TODO: Only show unit counts once units are unlocked, and only show appropraite counts for unit types unlocked */}

              {/* only show army details if screen is big enough */}
              {width > breakpoint && (
                <DisplayTemplate headerText="Army">
                  {unitTypes.map((unitType: UnitType) =>
                    unitCounts[unitType] > 0 ? (
                      <DashboardImageAndCount
                        dataObject={BASE_UNIT_DATA}
                        countsObject={unitCounts}
                        type={unitType}
                      />
                    ) : null
                  )}
                </DisplayTemplate>
              )}

              {/* justify-self-auto overrides parent grid positioning of this div */}
              <div className="align-center col-span-2 grid w-full grid-cols-3 rounded-lg bg-white/5 p-2 text-xs sm:col-span-3 lg:text-lg xl:text-xl">
                <p>
                  {width > breakpoint && `Current `}Turn: {turn}
                </p>

                <p className="sm:text-center">
                  Turns Left{width > breakpoint && ` until Combat`}:{" "}
                  {planningTurnToTriggerCombat - turn + 1}
                </p>

                <p className="sm:text-right">
                  Battles Survived: {numberOfCombatsStarted}
                </p>
              </div>
              <Button
                buttonColor={
                  turn !== planningTurnToTriggerCombat ? "blue" : "red"
                }
                onClick={endTurn}
                disabled={resourcePool["workers"] > 0}
              >
                {turn !== planningTurnToTriggerCombat
                  ? `End Turn`
                  : `Start Combat`}
              </Button>

              {/* FIXME: Make this into a tooltip, like a question mark circle thing you hover over or click */}
              {/* unlockedUnitTypes.length > 2 ? (
                <div className="place-self-center text-xl">
                  Tip: Train Units to Protect {townName}!
                </div>
              ) : (
                <div className="place-self-center text-xl">
                  Tip: Construct buildings to unlock new units!
                </div>
              ) */}
            </div>
          </div>

          <div className="mx-1 my-1 flex flex-wrap justify-center sm:mx-8 sm:my-2">
            {(activeNavButtons.planning.active ||
              activeNavButtons.resources.active) && (
              <GridCardContainer headerText="Resources">
                <WorkerCardContainer
                  resources={resources}
                  resourceTypesAvailableToPlayer={
                    resourceTypesAvailableToPlayer
                  }
                  setResources={setResources}
                  resourcePool={resourcePool}
                  setResourcePool={setResourcePool}
                />
              </GridCardContainer>
            )}

            {(activeNavButtons.planning.active ||
              activeNavButtons.training.active) && (
              <GridCardContainer headerText="Training">
                <TrainingCardContainer
                  unlockedUnitTypes={unlockedUnitTypes}
                  lockedUnitTypes={lockedUnitTypes}
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
            )}

            {(activeNavButtons.planning.active ||
              activeNavButtons.buildings.active) && (
              <GridCardContainer headerText="Buildings Constructed">
                {/* TODO: Match component structure with other cards */}
                <DisplayBuildings buildings={buildings} />
              </GridCardContainer>
            )}

            {(activeNavButtons.planning.active ||
              activeNavButtons.buildings.active) &&
            /* If there are no buildings left to construct, remove the section */
            buildingsLeftToConstruct.length > 0 ? (
              <GridCardContainer headerText="Construct Buildings">
                {/* TODO: Match component structure with other cards */}
                {buildingsLeftToConstruct.map((buildingType) =>
                  /* TODO: Make this more efficient/dynamic */
                  //  if the crystal quarry is constructed, map out all the buildings
                  buildings["crystalQuarry"].constructed ? (
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
                  ) : (
                    // if the quarry is NOT constructed, only map buildings that DO NOT need crystal as a resource
                    !buildings[buildingType].resourceCosts.crystal && (
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
                    )
                  )
                )}
              </GridCardContainer>
            ) : null}

            {(activeNavButtons.planning.active ||
              activeNavButtons.army.active) && (
              <>
                <div className="m-2 rounded-md bg-white/5 p-2 text-base text-white backdrop-blur-[1px] sm:text-lg lg:text-2xl">
                  <UnitCountsBox
                    BASE_UNIT_DATA={BASE_UNIT_DATA}
                    headerText={"Units"}
                    unitCounts={unitCounts}
                    unitTypes={unitTypes}
                    headerTextColor="blue"
                  />
                </div>
                <ArmyGrid
                  armyStyle="friendly"
                  gridStyle="planning"
                  army={myUnits}
                />
              </>
            )}
            {activeNavButtons.tips.active && <TutorialModalAsSection />}
          </div>

          <br></br>
          {devTools ? (
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
          ) : null}

          {/* // MODAL STUFF -- The TrainingCardContainer would go inside the building */}
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
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
