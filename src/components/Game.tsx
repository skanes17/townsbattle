import React, { useEffect, useRef, useState } from "react";
import {
  activeNavButtonsData,
  baseUnitData,
  buildingsData,
  resourceData,
  resourcePoolData,
  TutorialMessages,
  upgradesData,
  tipsSeenData,
  defaultPlayerName,
  defaultTownName,
  berserkerHealthTrigger,
  randomUnitNames,
  mageNames,
  archerNames,
  bombirdNames,
  fighterNames,
  knightNames,
  villagerNames,
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
// import { BaseUnitData } from "../types/BaseUnitData";
// import { BuildingCosts } from "../types/BuildingCosts";
import {
  BaseResourceType,
  BaseUnit,
  BaseUnitData,
  Buildings,
  GameOptions,
  GameProps,
  GameState,
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
import { useLocation, useParams } from "react-router-dom";
import {
  AddRemoveUnitFn,
  AddResourceFn,
  MaxTrainingUnitsFn,
} from "../types/FunctionTypes";
import {
  berserkerAttackBonusPowerLevel,
  calcMinPlanningTurnsUntilArmyGen,
  calcMinTurnsBetweenArmyGenAndCombat,
  chooseNameByUnitType,
  cloneBasicObjectWithJSON,
  countUnits,
  fullHealthAttackBonusPowerLevel,
  generateRandomArmyComposition,
  generateWeightedArmyComposition,
} from "../utils";
import WorkerCardContainer from "./cards/worker/WorkerCardContainer";
import NavButton from "./navbar/NavButton";
import { NavButtons, NavButtonType } from "../types/NavButtons";
import { Combat } from "./combat";
import DashboardImageAndCount from "./planning/DashboardImageAndCount";
import UnitCountsBox from "./planning/UnitCountsBox";
import useSound from "use-sound";
/* @ts-ignore */
import constructBldgSfx from "../assets/sounds/constructBldgSfx.mp3";
import { TutorialModalAsSection } from "./planning/tutorials/TutorialModalAsSection";
import { TipsSeen, TutorialCategory } from "../types/TutorialTypes";
import { ArmyGrid } from "./shared";
import { randomNumberBetweenMinAndMax } from "../utils/randomNumberBetweenMinAndMax";
import { generateScoutReport } from "../utils/generateScoutReport";
import { v4 as uuidv4 } from "uuid";

export default function Game(props: GameProps) {
  // get gameId from params, else set it as UUID
  const { gameId } = useParams() ?? uuidv4();

  const defaultGameState: GameState = {
    devTools: false,
    score: 0,
    playerName: defaultPlayerName,
    townName: defaultTownName,
    difficulty: "normal",
    tutorials: true,
    turn: 1,
    nextCombatTurn: 1,
    numberOfCombatsStarted: 0,
    inCombat: false,
    resources: resourceData,
    resourcePool: resourcePoolData,
    buildings: buildingsData,
    friendlyUnits: [],
    friendlyTrainingUnits: [],
    enemyUnits: [],
    unitId: 0,
    activeNavButtons: activeNavButtonsData,
    tipsSeen: tipsSeenData,
  };

  const savedOptions: GameOptions = JSON.parse(
    localStorage.getItem("savedOptions") || "{}"
  );

  const savedGameState: GameState = JSON.parse(
    localStorage.getItem("savedGameState") || "{}"
  );

  const gameState: GameState = {
    ...defaultGameState,
    ...savedGameState,
    ...savedOptions,
  };

  // TODO: Expand this so it's dynamic, user can make a new game or load an old one (say up to 10)
  /* 
  const loadedGameState = savedGameStates[chosenGameStateIndex];
  */

  const [devTools] = useState(gameState.devTools);
  // points from rounds of combat get added to this
  const [score, setScore] = useState(gameState.score);
  const [playerName] = useState(gameState.playerName);
  const [townName] = useState(gameState.townName);
  const [difficulty] = useState(gameState.difficulty);
  const [tutorials] = useState(gameState.tutorials);
  const [turn, setTurn] = useState(gameState.turn);
  const [nextCombatTurn, setNextCombatTurn] = useState(
    gameState.nextCombatTurn
  );
  const [numberOfCombatsStarted, setNumberOfCombatsStarted] = useState(
    gameState.numberOfCombatsStarted
  );
  const [inCombat, setInCombat] = useState(gameState.inCombat);

  const planningTurnsUntilEnemyGen = useRef(
    calcMinPlanningTurnsUntilArmyGen(difficulty)
  );

  // after this many COMBATs, you'll get an extra planning turn before enemies are generated
  const numberOfCombatsStartedUntilEnemyGenGetsDelayedByOne = 2;
  // this is the turn on which enemies are actually generated
  const planningTurnToGenerateEnemies =
    planningTurnsUntilEnemyGen.current +
    Math.floor(
      nextCombatTurn / numberOfCombatsStartedUntilEnemyGenGetsDelayedByOne
    );

  /* ===RESOURCES AND WORKERS=== */
  const [resources, setResources] = useState(gameState.resources);
  const numberOfWorkersAtStartOfGame = 5;
  const [resourcePool, setResourcePool] = useState(gameState.resourcePool);

  const resourceTypes: ResourceType[] = Object.keys(
    resources
  ) as ResourceType[];
  const allBaseResourceTypesInTheGame: BaseResourceType[] = Object.keys(
    resources
  ).filter((resourceType) => resourceType !== "workers") as BaseResourceType[];

  /* ===BUILDINGS=== */
  const [buildings, setBuildings] = useState(gameState.buildings);
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
  const [friendlyUnits, setFriendlyUnits] = useState(
    gameState.friendlyUnits as Unit[]
  );
  const [friendlyTrainingUnits, setFriendlyTrainingUnits] = useState(
    gameState.friendlyTrainingUnits as TrainingUnit[]
  );
  // placeholder enemy array for testing
  const [enemyUnits, setEnemyUnits] = useState(gameState.enemyUnits as Unit[]);
  // ===BASE STATS FOR NEW UNITS===
  // TODO: Will have dynamic update of attack and health stats based on building bonuses
  // TODO: Incorporate chance to hit (less when similar units are matched up), 5% chance to crit

  const BASE_UNIT_DATA = baseUnitData;
  const FRIENDLY_BASE_UNIT_DATA = cloneBasicObjectWithJSON(BASE_UNIT_DATA);
  // adds bonuses as necessary -- TODO: redo this with a more robust systems approach
  Object.keys(FRIENDLY_BASE_UNIT_DATA).map((unit: string) => {
    if (buildings["mealHall"].constructed) {
      FRIENDLY_BASE_UNIT_DATA[unit as UnitType].attack +=
        buildings["mealHall"].attackBonus;
      FRIENDLY_BASE_UNIT_DATA[unit as UnitType].maxHealth +=
        buildings["mealHall"].healthBonus;
    }
  });
  const ENEMY_BASE_UNIT_DATA = cloneBasicObjectWithJSON(BASE_UNIT_DATA);
  const unitTypes = Object.keys(BASE_UNIT_DATA) as UnitType[];

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
  const [unitId, setUnitId] = useState(gameState.unitId);

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
      setFriendlyTrainingUnits((friendlyTrainingUnits) => [
        ...friendlyTrainingUnits,
        _newUnit,
      ]);
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
      setFriendlyTrainingUnits(friendlyTrainingUnits.concat(_newUnits));
    }
  };

  // REMOVE units from either army
  const removeTrainingUnit: AddRemoveUnitFn = (unitType, friendly) => {
    if (friendly) {
      const _friendlyTrainingUnitsCopy = [...friendlyTrainingUnits];

      // pick the first unit in the array of the selected type
      const _unitIndex = _friendlyTrainingUnitsCopy.findIndex(
        (unit) => unit.unitType === unitType
      );
      // remove that unit from the array
      _friendlyTrainingUnitsCopy.splice(_unitIndex, 1);
      setFriendlyTrainingUnits([..._friendlyTrainingUnitsCopy]);
    }
  };

  const removeAllTrainingUnits: AddRemoveUnitFn = (unitType, friendly) => {
    if (friendly) {
      const _friendlyTrainingUnitsCopy = [...friendlyTrainingUnits];

      // filter out all units in the array of the selected type
      setFriendlyTrainingUnits(
        _friendlyTrainingUnitsCopy.filter((unit) => unit.unitType !== unitType)
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

    let randomName = chooseNameByUnitType(baseUnit.unitType);

    const newUnit = {
      ...baseUnit,
      currentHealth: baseUnit.maxHealth,
      randomName: randomName,
      id: unitId,
    };

    friendly
      ? // if friendly, update friendly army
        setFriendlyUnits((friendlyUnits) => {
          return [...friendlyUnits, newUnit];
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
    let randomName;
    const units = friendlyTrainingUnits.map((unit) => {
      // resolve base unit from unit type
      const _chosenUnit = FRIENDLY_BASE_UNIT_DATA[unit.unitType];
      id += 1;

      let randomName = chooseNameByUnitType(unit.unitType);

      // add to score
      const buildScore = _chosenUnit.buildScore;
      setScore((prevScore) => prevScore + buildScore);

      return {
        ..._chosenUnit,
        currentHealth: _chosenUnit.maxHealth,
        randomName: randomName,
        id, // shorthand for when key = value
      };
    });

    // bring all the training units into the main army
    setFriendlyUnits((friendlyUnits) => [...friendlyUnits, ...units]);
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
    const {
      totalAttack,
      totalHealth,
      totalArmor,
      totalAttackBonus,
      totalThreat,
    } = friendlyUnits.reduce(
      // and an arrow function is called for each unit in friendlyUnits
      (totals, unit) => ({
        // For each unit, the arrow function adds the unit's attack, health, and threat to each total
        totalAttack: totals.totalAttack + unit.attack,
        totalHealth: totals.totalHealth + unit.currentHealth,
        totalArmor: totals.totalArmor + unit.armor,
        totalAttackBonus:
          totals.totalAttackBonus +
          fullHealthAttackBonusPowerLevel(unit) +
          berserkerAttackBonusPowerLevel(unit),
        totalThreat: totals.totalThreat + unit.threatLevel,
      }),
      // Initilized values for total attack, total health, and total threat
      {
        totalAttack: 0,
        totalHealth: 0,
        totalArmor: 0,
        totalAttackBonus: 0,
        totalThreat: 0,
      }
    );

    /* TODO: Consider adding resources into the mix */
    const friendlyPowerLevel =
      totalAttack + totalHealth + totalArmor + totalAttackBonus + totalThreat;
    /* console.log(friendlyPowerLevel); */

    // The following process takes the calculated power level and scales the enemy's power level accordingly.
    let difficultyMultiplier;
    // Baseline power level for the start of the game -- tweak for balance as necessary
    let basePowerLevel = 3;
    // Equality turn is APPROXIMATE number of combat turns to pass, on normal mode, until power levels of both armies are about equal
    let equalityTurn = 10;
    // every combat won, the enemy army will grow by this percentage relative to the previous round
    let growthRate = 0.05; // touch this last! Huge effect on army size turn-to-turn

    // may not be balanced -- tweak as necessary!
    switch (difficulty) {
      case "easy":
        difficultyMultiplier = 0.5;
        basePowerLevel = 1;
        equalityTurn = 15;
        growthRate = 0.03;
        break;
      case "normal":
        difficultyMultiplier = 1.0;
        basePowerLevel = 2;
        equalityTurn = 10;
        growthRate = 0.05;
        break;
      case "hard":
        difficultyMultiplier = 1.25;
        basePowerLevel = 3;
        equalityTurn = 8;
        growthRate = 0.05;
        break;
      case "nightmare":
        difficultyMultiplier = 1.5;
        basePowerLevel = 3;
        equalityTurn = 8;
        growthRate = 0.04;
        break;
      default:
        difficultyMultiplier = 1.0;
        basePowerLevel = 3;
        equalityTurn = 20;
        growthRate = 0.05;
    }

    // exponential growth formula based on E(turns) = D * (P(1+r)^(nextCombatTurn-equalityTurn) + (basePowerLevel * Math.pow(nextCombatTurn, 2)) where...
    // y = enemy power level, D = difficulty
    // P = friendly power level, nextCombatTurn = which combat turn is next
    // equalityTurn = desired turn until match (excluding basePowerLevel)

    // reference -> https://www.desmos.com/calculator/uli0ce3voh
    /* --WANNA TWEAK THE SCALING SYSTEM? TWEAK THIS-- */
    const scaledEnemyPowerLevel =
      friendlyPowerLevel *
      Math.pow(1 + growthRate, nextCombatTurn - equalityTurn);
    /* console.log(scaledEnemyPowerLevel); */

    // set a minimum power level for enemy army based on how many combats there have been, regardless of player power level
    // basePowerLevel * nextCombatTurn is a simple linear function
    const minimumEnemyPowerLevel =
      difficultyMultiplier *
      (scaledEnemyPowerLevel + basePowerLevel * Math.pow(nextCombatTurn, 2));
    /* console.log(scaledEnemyPowerLevel); */

    const enemyArmy: Unit[] = [];
    let powerLevel = 0;
    let id = unitId;
    while (powerLevel < minimumEnemyPowerLevel) {
      // TODO: Tweak enemy composition based on turn here

      let unitType: UnitType;
      if (nextCombatTurn === 1) {
        // going into first combat? enemies are all villagers
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
          case 0:
            unitType = "fighter";
            break;
          default:
            // the rest are randomly chosen from player's UNLOCKED units
            // it shouldn't be undefined because villagers are always available at start
            /* console.log(unlockedUnitTypes); */
            unitType =
              unlockedUnitTypes[
                Math.floor(Math.random() * unlockedUnitTypes.length)
              ]!;
          /* console.log(unitType); */
        }
      } else if (nextCombatTurn === 4 || nextCombatTurn === 5) {
        switch (powerLevel) {
          // introduce 1 ranged enemy
          case 0:
            unitType = "archer";
            break;
          default:
            // again choosing from player's unlocked
            /* console.log(unlockedUnitTypes); */
            unitType =
              unlockedUnitTypes[
                Math.floor(Math.random() * unlockedUnitTypes.length)
              ]!;
          /* console.log(unitType); */
        }
      } else if (nextCombatTurn > 5 && nextCombatTurn <= 8) {
        switch (powerLevel) {
          // introduce 1 tanky enemy
          case 0:
            unitType = "knight";
            break;
          default:
            /* console.log(unlockedUnitTypes); */
            unitType =
              unlockedUnitTypes[
                Math.floor(Math.random() * unlockedUnitTypes.length)
              ]!;
          /* console.log(unitType); */
        }
      } else if (nextCombatTurn > 8 && nextCombatTurn <= 11) {
        switch (powerLevel) {
          // introduce 1 mage enemy
          case 0:
            unitType = "mage";
            break;
          default:
            // for now, choose randomly from the unlocked unit types
            unitType =
              unlockedUnitTypes[
                Math.floor(Math.random() * unlockedUnitTypes.length)
              ]!;
        }
      } else if (nextCombatTurn > 11 && nextCombatTurn <= 14) {
        switch (powerLevel) {
          // introduce 1 bombird enemy
          case 0:
            unitType = "bombird";
            break;
          default:
            // for now, choose randomly from the unlocked unit types
            unitType =
              unlockedUnitTypes[
                Math.floor(Math.random() * unlockedUnitTypes.length)
              ]!;
        }
      }
      // TODO: Do more manual progression staging here when new units are added!
      else {
        // At this point, all units in the game are available for choosing, EXCEPT villagers.
        // TODO: Could utilize the army generator functions here!
        const allUnitsButworkers = allUnitTypes.filter(
          (unit: UnitType) => unit !== "villager"
        );
        // pick a non-villager at random
        const nonVillagerUnitType =
          allUnitsButworkers[
            Math.floor(Math.random() * allUnitsButworkers.length)
          ];

        // This is just a setup to have villagers be 5% of the army, for funsies
        const aScatteringOfVillagers: UnitType[] =
          Array(19).fill(nonVillagerUnitType);
        aScatteringOfVillagers.push("villager");
        unitType =
          aScatteringOfVillagers[
            Math.floor(Math.random() * aScatteringOfVillagers.length)
          ];
      }

      // enemy units don't get buffs in this version of the game
      const chosenUnit = { ...ENEMY_BASE_UNIT_DATA[unitType] };
      id += 1;

      let randomName = chooseNameByUnitType(chosenUnit.unitType);

      // adding a current health key/value and id to the unit
      const chosenUnitWithCurrentHealth: Unit = {
        ...chosenUnit,
        currentHealth: chosenUnit.maxHealth,
        randomName: randomName,
        id,
      };
      // add it to the army
      enemyArmy.push(chosenUnitWithCurrentHealth);
      // add this unit's power level to the total
      const { attack, maxHealth, armor, threatLevel } =
        chosenUnitWithCurrentHealth;
      powerLevel +=
        attack +
        maxHealth +
        armor +
        fullHealthAttackBonusPowerLevel(chosenUnitWithCurrentHealth) +
        berserkerAttackBonusPowerLevel(chosenUnitWithCurrentHealth) +
        threatLevel;
    }
    // end of while loop

    // once army is generated, check how many types it has
    const types = enemyArmy.map((unit) => unit.unitType);
    const enemyUnitTypes = new Set(types).size;

    // Scout Report to appear if Scout Unit is constructed -- TODO: tie this to a modal
    if (buildings["scoutUnit"].constructed) {
      const scoutReport = generateScoutReport(
        friendlyUnits,
        friendlyPowerLevel,
        enemyArmy,
        powerLevel
      );

      if (scoutReport.relativeSizeOfTheEnemy < 0.5) {
        if (scoutReport.relativePowerOfTheEnemy < 0.5) {
          alert(
            `Scout's Report: Nothing to fear! The enemy army is much smaller and much less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 0.8) {
          alert(
            `Scout's Report: We have the advantage! The enemy army is much smaller and slightly less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.approxSamePower) {
          alert(
            `Scout's Report: We have the advantage, but be careful! The enemy army is much smaller but about the same power as ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 1.2) {
          alert(
            `Scout's Report: We have the advantage, but it won't be easy! The enemy army is much smaller but slightly more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else {
          alert(
            `Scout's Report: Be cautious! The enemy army is much smaller but much more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        }
      } else if (scoutReport.relativeSizeOfTheEnemy < 0.8) {
        // similar code to previous case, with different flavor text
        if (scoutReport.relativePowerOfTheEnemy < 0.5) {
          alert(
            `Scout's Report: They're outnumbered! The enemy army is slightly smaller and much less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 0.8) {
          alert(
            `Scout's Report: We have the edge! The enemy army is slightly smaller and slightly less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.approxSamePower) {
          alert(
            `Scout's Report: A close match! The enemy army is slightly smaller but about the same power as ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 1.2) {
          alert(
            `Scout's Report: It will be tough, but we can do it! The enemy army is slightly smaller but slightly more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else {
          alert(
            `Scout's Report: This could be difficult! The enemy army is slightly smaller but much more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        }
      } else if (scoutReport.approxSameSize) {
        // similar code to previous cases, with different flavor text
        if (scoutReport.relativePowerOfTheEnemy < 0.5) {
          alert(
            `Scout's Report: We're evenly matched, but we have the advantage! The enemy army is about the same size but much less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 0.8) {
          alert(
            `Scout's Report: We're evenly matched, but we can win this! The enemy army is about the same size and slightly less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.approxSamePower) {
          alert(
            `Scout's Report: We're evenly matched! The enemy army is about the same size and power as ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 1.2) {
          alert(
            `Scout's Report: We're evenly matched, but this will be tough! The enemy army is about the same size but slightly more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else {
          alert(
            `Scout's Report: We're evenly matched, but they have the advantage! The enemy army is about the same size but much more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        }
      } else if (scoutReport.relativeSizeOfTheEnemy < 1.2) {
        // similar code to previous cases, with different flavor text
        if (scoutReport.relativePowerOfTheEnemy < 0.5) {
          alert(
            `Scout's Report: This will be tough, but we can do it! The enemy army is slightly larger but much less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 0.8) {
          alert(
            `Scout's Report: Prepare for battle! The enemy army is slightly larger and slightly less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.approxSamePower) {
          alert(
            `Scout's Report: Prepare for a tough fight! The enemy army is slightly larger but about the same power as ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 1.2) {
          alert(
            `Scout's Report: This will be a challenge! The enemy army is slightly larger and slightly more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else {
          alert(
            `Scout's Report: We're in trouble! The enemy army is slightly larger and much more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        }
      } else {
        // similar code to previous cases, with different flavor text
        if (scoutReport.relativePowerOfTheEnemy < 0.5) {
          alert(
            `Scout's Report: We're outnumbered, but we have the advantage! The enemy army is much larger but much less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 0.8) {
          alert(
            `Scout's Report: We're outnumbered, but we can win this! The enemy army is much larger and slightly less powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.approxSamePower) {
          alert(
            `Scout's Report: We're outnumbered, this will be tough! The enemy army is much larger but about the same power as ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else if (scoutReport.relativePowerOfTheEnemy < 1.2) {
          alert(
            `Scout's Report: We're outnumbered and outmatched! The enemy army is much larger and slightly more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        } else {
          alert(
            `Scout's Report: We're in trouble! The enemy army is much larger and much more powerful than ours. We spied ${enemyUnitTypes} unit type${
              enemyUnitTypes > 1 ? `s` : ``
            }.`
          );
        }
      }
    }

    // set the army in state once it's all said and done
    setEnemyUnits(enemyArmy);
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
    // Add the appropriate number of each unit to the enemy army
    Object.keys(BASE_UNIT_DATA).map((unit: string, index) => {
      // grab the chosen unit from the base unit data
      const chosenUnit = ENEMY_BASE_UNIT_DATA[unit as UnitType];

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

      let randomName = chooseNameByUnitType(unit.unitType);

      return {
        ...unit,
        currentHealth: unit.maxHealth,
        randomName: randomName,
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

  const turnsBetweenEnemyArmyGenAndCombat = useRef(
    calcMinTurnsBetweenArmyGenAndCombat(difficulty)
  );

  // planning turn on which combat actually starts
  const planningTurnToTriggerCombat =
    planningTurnToGenerateEnemies + turnsBetweenEnemyArmyGenAndCombat.current;

  const endTurn = () => {
    if (turn === planningTurnToGenerateEnemies) {
      generateEnemyArmy(
        nextCombatTurn,
        friendlyUnits,
        unlockedUnitTypes,
        unitTypes
      );

      // calculate new value for the next planning phase
      turnsBetweenEnemyArmyGenAndCombat.current =
        calcMinTurnsBetweenArmyGenAndCombat(difficulty);
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
    setFriendlyTrainingUnits([]);

    if (turn === planningTurnToTriggerCombat) {
      switchPhase();

      // change the number of planning turns until enemies are generated for the next turn
      planningTurnsUntilEnemyGen.current =
        calcMinPlanningTurnsUntilArmyGen(difficulty);

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
  /*   const unitsInTraining = countUnits(friendlyTrainingUnits, unitTypes);  */
  const unitsInTraining: UnitCounts = {};
  for (const unitType of unitTypes) {
    unitsInTraining[unitType] = friendlyTrainingUnits.filter(
      (unit) => unit.unitType === unitType
    ).length;
  }

  // How many units are in your army
  const unitCounts = countUnits(friendlyUnits, unitTypes, "army");
  const enemyUnitCounts = countUnits(enemyUnits, unitTypes, "army");

  const [activeNavButtons, setActiveNavButtons] = useState(
    gameState.activeNavButtons as NavButtons
  );

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

  const [tipsSeen, setTipsSeen] = useState(gameState.tipsSeen as TipsSeen);

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

  /* ==SAVING ALL STATE IN LOCAL STORAGE WHEN ANYTHING IS UPDATED== */
  useEffect(() => {
    localStorage.setItem(
      "savedGameState",
      JSON.stringify({
        devTools,
        score,
        playerName,
        townName,
        difficulty,
        tutorials,
        turn,
        nextCombatTurn,
        numberOfCombatsStarted,
        inCombat,
        resources,
        resourcePool,
        buildings,
        friendlyUnits,
        friendlyTrainingUnits,
        enemyUnits,
        unitId,
        activeNavButtons,
        tipsSeen,
      })
    );
  }, [
    devTools,
    score,
    playerName,
    townName,
    difficulty,
    tutorials,
    turn,
    nextCombatTurn,
    numberOfCombatsStarted,
    inCombat,
    resources,
    resourcePool,
    buildings,
    friendlyUnits,
    friendlyTrainingUnits,
    enemyUnits,
    unitId,
    activeNavButtons,
    tipsSeen,
  ]);

  /* useEffect(() => {
    localStorage.setItem(`devTools`, JSON.stringify(devTools));
  }, [devTools]);
  useEffect(() => {
    localStorage.setItem(`score`, JSON.stringify(score));
  }, [score]);
  useEffect(() => {
    localStorage.setItem(`playerName`, JSON.stringify(playerName));
  }, [playerName]);
  useEffect(() => {
    localStorage.setItem(`townName`, JSON.stringify(townName));
  }, [townName]);
  useEffect(() => {
    localStorage.setItem(`difficulty`, JSON.stringify(difficulty));
  }, [difficulty]);
  useEffect(() => {
    localStorage.setItem(`tutorials`, JSON.stringify(tutorials));
  }, [tutorials]);
  useEffect(() => {
    localStorage.setItem(`turn`, JSON.stringify(turn));
  }, [turn]);
  useEffect(() => {
    localStorage.setItem(`nextCombatTurn`, JSON.stringify(nextCombatTurn));
  }, [nextCombatTurn]);
  useEffect(() => {
    localStorage.setItem(
      `numberOfCombatsStarted`,
      JSON.stringify(numberOfCombatsStarted)
    );
  }, [numberOfCombatsStarted]);
  useEffect(() => {
    localStorage.setItem(`inCombat`, JSON.stringify(inCombat));
  }, [inCombat]);
  useEffect(() => {
    localStorage.setItem(`resources`, JSON.stringify(resources));
  }, [resources]);
  useEffect(() => {
    localStorage.setItem(`resourcePool`, JSON.stringify(resourcePool));
  }, [resourcePool]);
  useEffect(() => {
    localStorage.setItem(`buildings`, JSON.stringify(buildings));
  }, [buildings]);
  useEffect(() => {
    localStorage.setItem(`friendlyUnits`, JSON.stringify(friendlyUnits));
  }, [friendlyUnits]);
  useEffect(() => {
    localStorage.setItem(
      `friendlyTrainingUnits`,
      JSON.stringify(friendlyTrainingUnits)
    );
  }, [friendlyTrainingUnits]);
  useEffect(() => {
    localStorage.setItem(`enemyUnits`, JSON.stringify(enemyUnits));
  }, [enemyUnits]);
  useEffect(() => {
    localStorage.setItem(`unitId`, JSON.stringify(unitId));
  }, [unitId]);
  useEffect(() => {
    localStorage.setItem(`activeNavButtons`, JSON.stringify(activeNavButtons));
  }, [activeNavButtons]);
  useEffect(() => {
    localStorage.setItem(`tipsSeen`, JSON.stringify(tipsSeen));
  }, [tipsSeen]); */

  return inCombat ? (
    /* FIXME: Add background back in to main components */
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
          friendlyUnits={friendlyUnits}
          enemyUnits={enemyUnits}
          setFriendlyUnits={setFriendlyUnits}
          setEnemyUnits={setEnemyUnits}
          townName={townName}
          resourcePool={resourcePool}
          setResourcePool={setResourcePool}
          buildings={buildings}
          setBuildings={setBuildings}
          switchPhase={switchPhase}
          score={score}
          setScore={setScore}
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
          friendlyUnits={friendlyUnits}
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
            {Object.keys(activeNavButtons).map((navButtonType) => {
              return (
                <NavButton
                  key={navButtonType}
                  currentNavButtonType={navButtonType as NavButtonType}
                  buttonStyle={navButtonType as NavButtonType}
                  stateTrigger={activeNavButtons[navButtonType].active}
                  navButtonOn={navButtonOn}
                  bgImage={activeNavButtons[navButtonType].bgImage}
                  tutorials={tutorials}
                  tipSeen={tipsSeen[navButtonType]}
                  markTipAsSeen={markTipAsSeen}
                >
                  {navButtonType === "score"
                    ? `Score: ${score}`
                    : navButtonType}
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
                      key={resourceType}
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
                      key={resourceType}
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
                        key={unitType}
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
                  BASE_UNIT_DATA={FRIENDLY_BASE_UNIT_DATA}
                  addTrainingUnit={addTrainingUnit}
                  maxTrainingUnits={maxTrainingUnits}
                  removeTrainingUnit={removeTrainingUnit}
                  removeAllTrainingUnits={removeAllTrainingUnits}
                />
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
              activeNavButtons.buildings.active) && (
              <GridCardContainer headerText="Buildings Constructed">
                <DisplayBuildings buildings={buildings} />
              </GridCardContainer>
            )}

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
                  army={friendlyUnits}
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
              friendlyUnits={friendlyUnits}
              trainEnemyUnits={trainEnemyUnits}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

/* export const gameLoader = ({params})=> {
  const {gameId} = params;
  const gameSave = gameSaves.find(save => save.gameId === gameId) ?? defaultSave;
  return gameSave
} */
