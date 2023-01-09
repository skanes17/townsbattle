import React, { useState } from "react";
import { GameProps } from "../types/GameProps";
import { resourceData } from "../gameData/resources";
import { baseUnitData, unitCostsData } from "../gameData/units";
import BuildingsUI from "./planning/BuildingsUI";
import { UnitCosts } from "../types/UnitCosts";
import { Buildings } from "../types/Buildings";
import { UpgradeCosts } from "../types/UpgradeCosts";
import { TrainingUnit, Unit, UnitType } from "../types/Unit";
import DevTools from "./devTools/DevTools";
import { Resources } from "../types/Resources";
import { UnitCounts } from "../types/UnitCounts";
import { BaseUnit } from "../types/BaseUnit";
import DisplayBuildings from "./planning/DisplayBuildings";
import DisplayResources from "./dashboards/DisplayResources";
import DisplayUnitCounts from "./dashboards/DisplayUnitCounts";
import WorkerCardContainer from "./cards/WorkerCardContainer";
import ConstructBuilding from "./cards/ConstructBuilding";
import DisplayTraining from "./dashboards/DisplayTraining";
import TrainingCardContainer from "./cards/TrainingCardContainer";
import FlexWrapContainer from "./FlexWrapContainer";
import Button from "./buttons/Button";
import DisplayUnderConstruction from "./dashboards/DisplayUnderConstruction";
import Combat from "./combat/Combat";
import { buildingsData, buildingCostsData } from "../gameData/buildings";
import { upgradesData } from "../gameData/upgrades";
import { BuildingCosts } from "../types/BuildingCosts";
import { GameContext } from "../context/GameState";
import MenuItem from "./startPage/MenuItem";
import MenuTitle from "./startPage/MenuTitle";
import PopupModal from "./startPage/PopupModal";
import MenuInput from "./startPage/MenuInput";
import SubmitButton from "./buttons/SubmitButton";
import ModalButton from "./buttons/ModalButton";

// FIXME: Many areas/lists don't have a unique key/id.

// TODO: Maybe if you choose not to use a freeworker you can get some gold (points)

// TODO: Call a function to add a set number of enemy units per turn
// -eg start with an army of 3, one of each
// After first wave, the number is increased by some amount each time
// -eg 7 units for second wave, enemy units randomly chosen
// Composition of army could be displayed to UI, for example 20% melee 30% pewpew 50% tanky

export default function Game(props: GameProps) {
  const [onStartPage, setOnStartPage] = useState(true);
  const [startModal, setStartModal] = useState(false);
  const [leaderboardModal, setLeaderboardModal] = useState(false);
  const [townName, setTownName] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">(
    "normal"
  );
  const [tutorials, setTutorials] = useState(true);

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
  };

  //TODO: Build max training function
  const maxTrainingUnits = (
    unitType: string,
    friendly: boolean,
    maxTrainable: number
  ) => {
    if (friendly) {
      // fill an array with the appropriate number of the chosen unit type
      const _newUnits = Array(maxTrainable).fill({ unitType });
      setMyTrainingUnits(myTrainingUnits.concat(_newUnits));
    }
  };

  // REMOVE units from either army
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
  };

  const removeAllTrainingUnits = (unitType: string, friendly: boolean) => {
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

  //add resources
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

  // TODO: Delete unitBattler function when Combat component is complete
  // Currently being used as a reference for the log
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
    }
    if (enemyUnitsCopy.length === 0) {
      alert("Enemy army defeated. You won the battle!");
      return;
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

  const endTurn = () => {
    /* @ts-ignore */
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

    // Train Units Process
    let id = unitId;
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
    // update ID state accordingly
    setUnitId(id);
    // reset units in training back to zero
    setMyTrainingUnits([]);
    // increment turn
    setTurn(turn + 1);
  };

  const switchPhase = () => {
    setInCombat(!inCombat);
  };

  const startGame = () => {
    setOnStartPage(!onStartPage);
  };

  const toggleStartModal = () => {
    setStartModal(!startModal);
  };

  const toggleLeaderboardModal = () => {
    setLeaderboardModal(!leaderboardModal);
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

  return onStartPage ? (
    <>
      <div className=" flex h-screen flex-col items-center justify-center">
        <div className="m-1 grid auto-rows-min place-items-center gap-1 rounded bg-white/5 p-4 shadow-inherit">
          <MenuTitle title="Townsbattle" subtitle="The Game" />
          <MenuItem text="Start" icon="▶️" onClick={toggleStartModal} />
          <MenuItem
            text="Leaderboard"
            icon="🏆"
            onClick={toggleLeaderboardModal}
          />
          <MenuItem text="Options" icon="🔧" />
          <MenuItem text="How to Play" icon="❓" />
          <MenuItem text="About" icon="⭐" />
        </div>
      </div>

      {/* only render this if startModal === true */}
      {startModal && (
        <PopupModal
          icon="▶️"
          headerText="How to Play"
          onClickLeft={toggleStartModal}
          onClickRight={startGame}
        >
          {/* FIXME: Figure out how to get this into component */}
          <p className="mt-2 leading-relaxed text-gray-500">
            Collect resources, train and upgrade an army, and defeat waves of
            enemies. Survive as long as you can!
          </p>

          <MenuInput
            placeholderText="Gabenfort"
            // current valueof the input box
            value={townName}
            // what to do when input is changed
            onChange={(e) => setTownName(e.target.value)}
          />

          {/* FIXME: Wrap all in a form; add type="button" to buttons that won't submit data, type="submit" otherwise */}
          <div>
            <div className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
              Difficulty
            </div>
            <div className="mt-3 items-center gap-2 sm:flex">
              {difficulty === "easy" ? (
                <ModalButton
                  buttonText="Easy"
                  buttonColor="green"
                  isSelected={true}
                />
              ) : (
                <ModalButton
                  buttonText="Easy"
                  buttonColor="green"
                  isSelected={false}
                  onClick={() => setDifficulty("easy")}
                />
              )}
              {difficulty === "normal" ? (
                <ModalButton
                  buttonText="Normal"
                  buttonColor="blue"
                  isSelected={true}
                />
              ) : (
                <ModalButton
                  buttonText="Normal"
                  buttonColor="blue"
                  isSelected={false}
                  onClick={() => setDifficulty("normal")}
                />
              )}
              {difficulty === "hard" ? (
                <ModalButton
                  buttonText="Hard"
                  buttonColor="red"
                  isSelected={true}
                />
              ) : (
                <ModalButton
                  buttonText="Hard"
                  buttonColor="red"
                  isSelected={false}
                  onClick={() => setDifficulty("hard")}
                />
              )}
            </div>
          </div>

          <div>
            <div className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
              Tutorials
            </div>
            <div className="mt-3 items-center gap-2 sm:flex">
              {tutorials === true ? (
                <>
                  <ModalButton
                    buttonText="Off"
                    buttonColor="blue"
                    isSelected={false}
                    onClick={() => setTutorials(false)}
                  />
                  <ModalButton
                    buttonText="On"
                    buttonColor="blue"
                    isSelected={true}
                  />
                </>
              ) : (
                <>
                  <ModalButton
                    buttonText="Off"
                    buttonColor="blue"
                    isSelected={true}
                  />
                  <ModalButton
                    buttonText="On"
                    buttonColor="blue"
                    isSelected={false}
                    onClick={() => setTutorials(true)}
                  />
                </>
              )}
            </div>
          </div>

          {/* horizontal line */}
          <div className="mt-3 border-t border-gray-300"></div>

          <div className="bg-amber-100 capitalize text-gray-500">
            <p className="font-bold text-gray-800">Summary (DevTool)</p>
            <p>Town Name: {townName}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Tutorials: {tutorials ? "On" : "Off"}</p>
          </div>
        </PopupModal>
      )}

      {leaderboardModal && (
        <PopupModal
          headerText="Leaderboard"
          icon="🏆"
          onClickLeft={toggleLeaderboardModal}
        >
          <p className="mt-2 leading-relaxed text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit vel
            suscipit fuga impedit explicabo, consequuntur at corrupti, est,
            culpa nostrum recusandae debitis distinctio odio repellendus
            voluptatum asperiores harum facilis mollitia.
          </p>
        </PopupModal>
      )}

      <SubmitButton buttonColor="red" onClick={startGame}>
        Planning
      </SubmitButton>
    </>
  ) : inCombat ? (
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
        unitBattler={unitBattler}
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
            Train Units to Protect {townName}!
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
        unitBattler={unitBattler}
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
