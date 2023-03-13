import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { enemyColor, friendlyColor, TutorialMessages } from "../../gameData";
import {
  BaseUnit,
  Building,
  Buildings,
  CombatEvent,
  MainCombatEvent,
  NoArmyEvent,
  Phases,
  PostCombatEvent,
  PreCombatEvent,
  Resources,
  ResourcePool,
  SubPhases,
  SummaryEvent,
  Unit,
  UnitCounts,
  UnitType,
  TutorialCategory,
  TipsSeen,
} from "../../types";
import { cloneBasicObjectWithJSON, countUnits } from "../../utils";
import { getSurvivingUnitIndexes } from "../../utils/getSurvivingUnitIndexes";
import { AutoButton, CombatButton } from "../buttons";
import {} from "../cards";
import { CombatLog, messages, PostCombatSummary } from ".";
import PreCombatCardTemplate from "../cards/PreCombatCardTemplate";
import CombatCardTemplate from "../cards/CombatCardTemplate";
import useSound from "use-sound";
/* @ts-ignore */
import destroyBldgSfx from "../../assets/sounds/destroyBldgSfx.mp3";
import { Modal, ModalHeader, ModalTextContent } from "../planning/tutorials";
import { ArmyGrid } from "../shared";

// TODO: Consider adding a button for an auto-play, like it steps forward every 2 seconds or something

/* TODO: Figure out how to place enemy units starting from top right in grid */
/* FIXME: Page breaking when army has 0 units */

interface CombatProps {
  tutorials: boolean;
  tipsSeen: TipsSeen;
  markTipAsSeen: (tutorialCategory: TutorialCategory) => void;
  currentCombatTurn: number;
  BASE_UNIT_DATA: BaseUnit;
  unitTypes: UnitType[];
  unlockedUnitTypes: (UnitType | undefined)[];
  friendlyUnits: Unit[];
  setFriendlyUnits: Dispatch<SetStateAction<Unit[]>>;
  enemyUnits: Unit[];
  setEnemyUnits: Dispatch<SetStateAction<Unit[]>>;
  townName: string;
  resourcePool: ResourcePool;
  setResourcePool: Dispatch<SetStateAction<ResourcePool>>;
  buildings: Buildings;
  setBuildings: Dispatch<SetStateAction<Buildings>>;
  switchPhase: () => void;
  scoreUpdaterFn: (points: number) => void;
}

export default function Combat({
  tutorials,
  tipsSeen,
  markTipAsSeen,
  currentCombatTurn,
  BASE_UNIT_DATA,
  unitTypes,
  unlockedUnitTypes,
  friendlyUnits,
  enemyUnits,
  setFriendlyUnits,
  setEnemyUnits,
  townName,
  buildings,
  setBuildings,
  switchPhase,
  scoreUpdaterFn,
}: CombatProps) {
  const [phase, setPhase] = useState<Phases>(Phases.PreCombat);
  const [subPhase, setSubPhase] = useState<SubPhases>(SubPhases.Fight);

  const [playDestroyBldgSound] = useSound(destroyBldgSfx);

  const basePointsForCompletingCombat = 100;

  // TODO: Consider modifying CombatUnits to include attack and health buffs!

  const [combatUnits, setCombatUnits] = useState<Unit[]>([...friendlyUnits]);
  const [combatEnemyUnits, setCombatEnemyUnits] = useState<Unit[]>([
    ...enemyUnits,
  ]);

  const [combatEvents, setCombatEvents] = useState<CombatEvent[]>([]);
  const combatTurnsCompleted = useRef(0);

  const combatUnitCounts = countUnits(combatUnits, unitTypes, "army");
  const combatEnemyUnitCounts = countUnits(enemyUnits, unitTypes, "army");

  // store friendlyIds here and, at end of round, increment by 1
  const friendlyUnitsNotSelected = new Map<number, number>();
  const enemyUnitsNotSelected = new Map<number, number>();

  // We accumulate the indexes of surviving units into an array
  // The .reduce() method is used to iterate over each unit in the combatUnits array
  const survivingFriendlyUnitIndexes = getSurvivingUnitIndexes(combatUnits);
  const survivingEnemyUnitIndexes = getSurvivingUnitIndexes(combatEnemyUnits);

  // choose an index at random from the surviving units
  const [friendlyIndex, setFriendlyIndex] = useState(
    survivingFriendlyUnitIndexes[
      Math.floor(Math.random() * survivingFriendlyUnitIndexes.length)
    ]
  );
  const [enemyIndex, setEnemyIndex] = useState(
    survivingEnemyUnitIndexes[
      Math.floor(Math.random() * survivingEnemyUnitIndexes.length)
    ]
  );

  const shouldRestoreUnitHealth = buildings["healingChamber"].constructed;

  const noArmyEvent = () => {
    const noArmyEvent: NoArmyEvent = {
      type: "noArmy",
      data: {
        friendly: {
          unitCount: survivingFriendlyUnitIndexes.length,
        },
      },
    };

    const eventIndex = 0;
    const combatState = { event: noArmyEvent, idx: eventIndex };
    setCombatEvents((prevCombatEvents) => [combatState, ...prevCombatEvents]);
  };

  const initialPreCombatEvent = () => {
    const initialPreCombatEvent: PreCombatEvent = {
      type: "preCombat",
      data: {
        friendly: {
          name: combatUnits[friendlyIndex].name,
          id: combatUnits[friendlyIndex].id,
        },
        enemy: {
          name: combatEnemyUnits[enemyIndex].name,
          id: combatEnemyUnits[enemyIndex].id,
        },
      },
    };

    const eventIndex = 0;
    const combatState = { event: initialPreCombatEvent, idx: eventIndex };
    // experimenting with appending to top
    setCombatEvents((prevCombatEvents) => [combatState, ...prevCombatEvents]);
  };

  const selectNewUnits = () => {
    // FIXME: Had to use hacky workaround to get state to cooperate with preCombatEvent
    // suggest refactoring

    const newFriendlyIndex =
      survivingFriendlyUnitIndexes[
        Math.floor(Math.random() * survivingFriendlyUnitIndexes.length)
      ];
    const newEnemyIndex =
      survivingEnemyUnitIndexes[
        Math.floor(Math.random() * survivingEnemyUnitIndexes.length)
      ];

    const preCombatEvent: PreCombatEvent = {
      type: "preCombat",
      data: {
        friendly: {
          name: combatUnits[newFriendlyIndex].name,
          id: combatUnits[newFriendlyIndex].id,
        },
        enemy: {
          name: combatEnemyUnits[newEnemyIndex].name,
          id: combatEnemyUnits[newEnemyIndex].id,
        },
      },
    };
    /* TODO: Add more possible random messages for when two units face off */
    const eventIndex =
      // picks any array index except index of 0
      Math.floor(Math.random() * (messages.preCombat.length - 1)) + 1;
    const combatState = { event: preCombatEvent, idx: eventIndex };
    // experimenting with appending to top
    setCombatEvents((prevCombatEvents) => [combatState, ...prevCombatEvents]);

    // if both armies remain, select new units
    setFriendlyIndex(newFriendlyIndex);
    setEnemyIndex(newEnemyIndex);
  };

  const calculatedAttackValue = (attacker: Unit, defender: Unit): number => {
    // used destructuring to make code more readable
    const {
      attack,
      currentHealth,
      maxHealth,
      fullHealthAttackBonus,
      chargingMultiplier,
    } = attacker;
    // armor reduces incoming attack damage
    const { armor: defenderArmor } = defender;
    // if unit has full health, or charges before being selected, it does bonus attack damage
    const attackBonus =
      currentHealth === maxHealth
        ? fullHealthAttackBonus /* + timesNotSelected*chargingMultiplier */
        : 0;
    // Math.max() prevents negative attack values due to high armor
    return Math.max(0, attack + attackBonus - defenderArmor);
  };

  // default behaviour
  const unitsFight = () => {
    // chosen units attack each other
    const _friendlyCopy = [...combatUnits];
    const selectedFriendly = _friendlyCopy[friendlyIndex];
    const _enemyCopy = [...combatEnemyUnits];
    const selectedEnemy = _enemyCopy[enemyIndex];

    // INCORPORATE PASSIVE EFFECTS HERE
    // timesSelectedForCombat: number;

    /* TODO: Optimize the following conditionals */
    // only run this if the friendly hits first and the enemy does not
    if (selectedFriendly.hitsFirst && !selectedEnemy.hitsFirst) {
      // Enemy gets hit first
      selectedEnemy.currentHealth = Math.max(
        0,
        selectedEnemy.currentHealth -
          calculatedAttackValue(selectedFriendly, selectedEnemy)
      );
      // If the enemy survives, it attacks. Else, it's dead and its attack is set to 0.
      if (selectedEnemy.currentHealth > 0) {
        selectedFriendly.currentHealth = Math.max(
          0,
          selectedFriendly.currentHealth -
            calculatedAttackValue(selectedEnemy, selectedFriendly)
        );
      } else {
        /* TODO: If only the enemy gets hit, and the unit is an archer, play the archer sound */

        selectedEnemy.attack = 0;
      }
    }
    // only run this if the enemy hits first and the friendly does not
    else if (selectedEnemy.hitsFirst && !selectedFriendly.hitsFirst) {
      // Friendly gets hit first
      selectedFriendly.currentHealth = Math.max(
        0,
        selectedFriendly.currentHealth -
          calculatedAttackValue(selectedEnemy, selectedFriendly)
      );
      // If the friendly survives, it attacks. Else, it's dead and its attack is set to 0.
      if (selectedFriendly.currentHealth > 0) {
        selectedEnemy.currentHealth = Math.max(
          0,
          selectedEnemy.currentHealth -
            calculatedAttackValue(selectedFriendly, selectedEnemy)
        );
      } else selectedFriendly.attack = 0;
    } else {
      // default fight -- no hitsFirst mechanic
      selectedEnemy.currentHealth = Math.max(
        0,
        selectedEnemy.currentHealth -
          calculatedAttackValue(selectedFriendly, selectedEnemy)
      );

      // damage the selected friendly unit; set to 0 if dmg exceeds health
      selectedFriendly.currentHealth = Math.max(
        0,
        selectedFriendly.currentHealth -
          calculatedAttackValue(selectedEnemy, selectedFriendly)
      );
    }
    setCombatEnemyUnits(_enemyCopy);
    setCombatUnits(_friendlyCopy);

    // the following adds a combat event for the combat log
    /* TODO: Add in attack buffs and bonuses to the list so they're useable later */
    const combatEvent: MainCombatEvent = {
      type: "combat",
      data: {
        friendly: {
          name: combatUnits[friendlyIndex].name,
          unitType: combatUnits[friendlyIndex].unitType,
          /* attack: combatUnits[friendlyIndex].attack, */
          attack: calculatedAttackValue(selectedFriendly, selectedEnemy),
          maxHealth: combatUnits[friendlyIndex].maxHealth,
          // used copy to avoid state update's async issues
          currentHealth: selectedFriendly.currentHealth,
          /* attackBonus:
            selectedFriendly.currentHealth === selectedFriendly.maxHealth
              ? selectedFriendly.fullHealthAttackBonus
              : 0,
          incomingDmgReduction: selectedFriendly.incomingDmgReduction, */
          id: combatUnits[friendlyIndex].id,
        },
        enemy: {
          name: combatEnemyUnits[enemyIndex].name,
          unitType: combatEnemyUnits[enemyIndex].unitType,
          /* attack: combatEnemyUnits[enemyIndex].attack, */
          attack: calculatedAttackValue(selectedEnemy, selectedFriendly),
          maxHealth: combatEnemyUnits[enemyIndex].maxHealth,
          // used copy to avoid state update's async issues
          currentHealth: selectedEnemy.currentHealth,
          /* attackBonus:
            selectedFriendly.currentHealth === selectedFriendly.maxHealth
              ? selectedFriendly.fullHealthAttackBonus
              : 0,
          incomingDmgReduction: selectedFriendly.incomingDmgReduction, */
          id: combatEnemyUnits[enemyIndex].id,
        },
      },
    };
    /* FIXME: Should choose the appropriate message based on context (eg unit types) when two units are fighting */
    const eventIndex = Math.floor(Math.random() * messages.combat.length);

    const combatState = { event: combatEvent, idx: eventIndex };
    // experimenting with appending to top
    setCombatEvents((prevCombatEvents) => [combatState, ...prevCombatEvents]);
  };

  // returning units to their armies and choosing new ones
  const postCombatEvent = () => {
    const postCombatEvent: PostCombatEvent = {
      type: "postCombat",
      data: {
        friendly: {
          name: combatUnits[friendlyIndex].name,
          maxHealth: combatUnits[friendlyIndex].maxHealth,
          currentHealth: combatUnits[friendlyIndex].currentHealth,
          id: combatUnits[friendlyIndex].id,
        },
        enemy: {
          name: combatEnemyUnits[enemyIndex].name,
          maxHealth: combatEnemyUnits[enemyIndex].maxHealth,
          currentHealth: combatEnemyUnits[enemyIndex].currentHealth,
          id: combatEnemyUnits[enemyIndex].id,
        },
      },
    };

    let eventIndex;
    if (
      combatUnits[friendlyIndex].currentHealth === 0 &&
      combatEnemyUnits[enemyIndex].currentHealth === 0
    ) {
      // If both units are defeated
      eventIndex = 0;
    }
    // If only the friendly survives
    else if (
      combatUnits[friendlyIndex].currentHealth > 0 &&
      combatEnemyUnits[enemyIndex].currentHealth === 0
    ) {
      eventIndex = 1;
    }
    // If only the enemy survives
    else if (
      combatUnits[friendlyIndex].currentHealth === 0 &&
      combatEnemyUnits[enemyIndex].currentHealth > 0
    ) {
      eventIndex = 2;
    }
    // both units survive
    else {
      eventIndex = 3;
    }
    const combatState = { event: postCombatEvent, idx: eventIndex };
    setCombatEvents((prevCombatEvents) => [combatState, ...prevCombatEvents]);
  };

  const summaryEvent = () => {
    const summaryEvent: SummaryEvent = {
      type: "summary",
      data: {
        friendly: {
          unitCount: survivingFriendlyUnitIndexes.length,
        },
        enemy: {
          unitCount: survivingEnemyUnitIndexes.length,
        },
      },
    };

    let eventIndex;
    if (
      survivingFriendlyUnitIndexes.length === 0 &&
      survivingEnemyUnitIndexes.length === 0
    ) {
      // If both armies are defeated
      eventIndex = 0;
    }
    // If only the friendly army survives
    else if (
      survivingFriendlyUnitIndexes.length > 0 &&
      survivingEnemyUnitIndexes.length === 0
    ) {
      eventIndex = 1;
    }
    // If only the enemy army survives
    else if (
      survivingFriendlyUnitIndexes.length === 0 &&
      survivingEnemyUnitIndexes.length > 0
    ) {
      eventIndex = 2;
    }
    // error catch
    else {
      alert("Oops... there was an error. Please tell the dev!");
      return;
    }
    const combatState = { event: summaryEvent, idx: eventIndex };
    setCombatEvents((prevCombatEvents) => [combatState, ...prevCombatEvents]);
  };

  const determineWhichUnitsToSendToPlanning = (
    units: Unit[],
    // this boolean condition should be determined by a building (eg healing chamber built)
    shouldRestoreUnitHealth: boolean
  ): Unit[] => {
    return (
      units
        // only return units who have health remaining
        .filter((unit) => unit.currentHealth > 0)
        .map((unit) => {
          if (shouldRestoreUnitHealth) {
            return {
              ...unit,
              currentHealth: unit.maxHealth,
            };
          }
          return unit;
        })
    );
  };

  const attackBuildingsAndReturnClone = (): Buildings => {
    const clonedBuildings = cloneBasicObjectWithJSON(buildings);

    const initialNumberOfBuildingsConstructed = Object.keys(buildings).filter(
      (key) => clonedBuildings[key].constructed
    ).length;

    let buildingsConstructed = Object.keys(buildings).filter(
      (key) => clonedBuildings[key].constructed
    );
    // this loop to chooses a constructed building at random and subtract enemy attack value from its current health
    for (const unitIndex of survivingEnemyUnitIndexes) {
      if (
        !clonedBuildings["townCenter"].constructed ||
        buildingsConstructed.length === 0
      ) {
        alert("Your Town Center was destroyed. It's Game Over!");
        break;
      }

      // if there are any buildings besides the town center, hit them first!
      if (buildingsConstructed.length > 1) {
        buildingsConstructed = Object.keys(buildings)
          .filter((buildingType) => buildingType !== "townCenter")
          .filter((key) => clonedBuildings[key].constructed);
        console.log("Avoiding the Town Center!");
      } else {
        buildingsConstructed = Object.keys(buildings).filter(
          (key) => clonedBuildings[key].constructed
        );
        console.log("No choice but to hit the Town Center!");
      }

      const buildingAttacked =
        clonedBuildings[
          buildingsConstructed[
            Math.floor(Math.random() * buildingsConstructed.length)
          ]
        ];

      const enemyUnit = combatEnemyUnits[unitIndex];
      // TODO: Consider Buffs??
      const enemyAttackValue = enemyUnit.attack;

      console.log("Building Attacked: " + buildingAttacked.name);
      console.log("Building Health: " + buildingAttacked.currentHealth);
      console.log("Enemy Chosen: " + enemyUnit.name + enemyUnit.id);
      console.log("Enemy Attack: " + enemyAttackValue);

      // TODO: could set up a push to a new "buildingDamagedEvent" messages log here -- ENEMY X attacks BUILDING Y for Z DMG

      buildingAttacked.damage += enemyAttackValue;
      buildingAttacked.currentHealth = Math.max(
        0,
        buildingAttacked.currentHealth - enemyAttackValue
      );

      console.log("New Building Health: " + buildingAttacked.currentHealth);
      console.log(
        "Total Damage Dealt to This Building: " + buildingAttacked.damage
      );

      if (buildingAttacked.currentHealth === 0) {
        // if the building is destroyed, set it to destroyed (constructed = false)
        buildingAttacked.constructed = false;

        // refill its health (for a future build)
        buildingAttacked.currentHealth = buildingAttacked.maxHealth;
        // refresh pool of buildings that are to be attacked
        buildingsConstructed = Object.keys(buildings).filter(
          (key) => clonedBuildings[key].constructed
        );
      }
    }
    // play a sound at end of combat if any building was lost
    buildingsConstructed.length < initialNumberOfBuildingsConstructed &&
      playDestroyBldgSound();
    return clonedBuildings;
  };

  // send all all surviving units back to planning
  const sendArmiesToPlanning = () => {
    const friendlyUnitsToSendToPlanning = determineWhichUnitsToSendToPlanning(
      combatUnits,
      shouldRestoreUnitHealth
    );
    setFriendlyUnits(friendlyUnitsToSendToPlanning);

    const enemyUnitsToSendToPlanning = determineWhichUnitsToSendToPlanning(
      combatEnemyUnits,
      false
    );
    setEnemyUnits(enemyUnitsToSendToPlanning);
  };

  // reset all building damage to 0 once event has been processed in messages
  const resetBuildingDamageToZero = (buildings: Buildings): Buildings => {
    const clonedBuildings = cloneBasicObjectWithJSON(buildings);
    Object.keys(clonedBuildings).forEach((key) => {
      if (clonedBuildings[key].damage > 0) {
        // if the building has been damaged this round, reset it to 0
        clonedBuildings[key].damage = 0;
      }
    });
    return clonedBuildings;
  };

  const combatMegaFunction = () => {
    // If you have no units upon combat, immediately go to postCombat screen
    // TODO: Proper summary calculations for this case
    // TODO: Damage buldings accordingly
    if (combatUnits.length === 0) {
      noArmyEvent();

      // damage buildings
      const clonedBuildings = attackBuildingsAndReturnClone();
      setBuildings(clonedBuildings);
      setPhase(Phases.PostCombat);
    }
    switch (phase) {
      case Phases.PreCombat:
        // adds a preCombat event to the "events" state
        initialPreCombatEvent();
        setPhase(Phases.Combat);
        setSubPhase(SubPhases.Fight);

        break;
      case Phases.Combat:
        switch (subPhase) {
          case SubPhases.Fight:
            // combatEvent() happens within unitsFight()

            /* TODO: A unit that has extra damage if full health? */
            /* TODO: A unit that gets +1 to atk each time it is not selected for the first time? */

            /* TODO: Refactor for efficiency once more unit traits are developed */
            unitsFight();

            // TODO: Add in animation for units attacking each other
            combatTurnsCompleted.current += 1;
            setSubPhase(SubPhases.VictoryCheck);
            break;

          case SubPhases.VictoryCheck:
            if (
              survivingFriendlyUnitIndexes.length > 0 &&
              survivingEnemyUnitIndexes.length > 0
            ) {
              // IF both armies have survived...

              // determine who won, who lost
              postCombatEvent();

              let combatTurn = combatTurnsCompleted.current;

              // Keep track of all units NOT selected!
              /* FIXME: Don't want to refresh it every time... need to bug hunt */
              survivingFriendlyUnitIndexes.map((index) => {
                if (index !== friendlyIndex) {
                  friendlyUnitsNotSelected.set(
                    combatUnits[index].id!,
                    combatTurn
                  );
                }
              });

              console.log(friendlyUnitsNotSelected);

              // return the units to their army and pick new ones -- also sets a new preCombatEvent
              selectNewUnits();

              setSubPhase(SubPhases.Fight);
            } else {
              // ELSE one or both armies were defeated, end combat

              // send a message to the log to explain the outcome of the combat
              summaryEvent();
              const clonedBuildings = attackBuildingsAndReturnClone();

              setBuildings(clonedBuildings);
              setPhase(Phases.PostCombat);
            }
            break;
        }
        break;
      case Phases.PostCombat:
        // reset all building damage to 0
        setBuildings(resetBuildingDamageToZero(buildings));
        sendArmiesToPlanning();
        // add points from this battle to total score, as well as some extra points based on how many combats completed
        scoreUpdaterFn(
          points + currentCombatTurn * basePointsForCompletingCombat
        );
        switchPhase();
        break;
    }
  };

  // TODO: Incorporate something like "Auto - 5/10/20 units" or something... so you can batch fights
  /* FIXME: Doesn't seem to work if only 1 unit in army */
  const autoBattler = () => {
    const autoFriendlyUnits = [...combatUnits];
    const autoEnemyUnits = [...combatEnemyUnits];

    /* FIXME:  AutoBattler needs to be rebuilt to be based on new combat systems */
    // gather surviving units
    // CAREFUL -- sometimes doesn't work properly
    let _survivingFriendlyUnitIndexes = autoFriendlyUnits
      .map((unit, index) => (unit.currentHealth !== 0 ? index : null))
      .filter((index) => index) as number[];

    let _survivingEnemyUnitIndexes = autoEnemyUnits
      .map((unit, index) => {
        if (unit.currentHealth !== 0) {
          return index;
        } else return -1;
      })
      .filter((index) => index >= 0);

    while (
      _survivingFriendlyUnitIndexes.length > 0 &&
      _survivingEnemyUnitIndexes.length > 0
    ) {
      // choose a unit from each army
      let _friendlyIndex =
        _survivingFriendlyUnitIndexes[
          Math.floor(Math.random() * _survivingFriendlyUnitIndexes.length)
        ];
      let _enemyIndex =
        _survivingEnemyUnitIndexes[
          Math.floor(Math.random() * _survivingEnemyUnitIndexes.length)
        ];

      // reduce their health appropriately
      autoFriendlyUnits[_friendlyIndex].currentHealth = Math.max(
        0,
        autoFriendlyUnits[_friendlyIndex].currentHealth -
          autoEnemyUnits[_enemyIndex].attack
      );
      autoEnemyUnits[_enemyIndex].currentHealth = Math.max(
        0,
        autoEnemyUnits[_enemyIndex].currentHealth -
          autoFriendlyUnits[_friendlyIndex].attack
      );

      // check if units are still alive; if so, continue the loop
      _survivingFriendlyUnitIndexes = autoFriendlyUnits
        .map((unit, index) => {
          if (unit.currentHealth !== 0) {
            return index;
          } else return -1;
        })
        .filter((index) => index >= 0);
      _survivingEnemyUnitIndexes = autoEnemyUnits
        .map((unit, index) => {
          if (unit.currentHealth !== 0) {
            return index;
          } else return -1;
        })
        .filter((index) => index >= 0);
    }

    setCombatUnits(autoFriendlyUnits);
    setCombatEnemyUnits(autoEnemyUnits);
    setPhase(Phases.PostCombat);
  };

  // simple draft of points sytem is +100 per enemy unit defeated
  const points =
    combatEnemyUnits.filter((unit) => unit.currentHealth === 0).length * 100;

  return (
    /* whole screen */
    <div className="relative grid h-screen max-h-screen grid-cols-[2.5fr_4fr_2.5fr] grid-rows-[9fr_1fr] p-2 text-xs transition-transform ease-in-out sm:text-base lg:text-lg xl:text-xl">
      {/* if tutorials are on, and it'sd your first combat, show the modal when combat is rendered */}
      {/* closing the <Modal> will set tipsSeen === true */}
      {tutorials && currentCombatTurn === 1 && !tipsSeen["combat"] && (
        <Modal tutorialCategory="combat" markTipAsSeen={markTipAsSeen}>
          <ModalHeader headerText={TutorialMessages["combat"].category} />
          <ModalTextContent children={TutorialMessages["combat"].tutorial} />
        </Modal>
      )}

      <div className="col-start-1 row-start-1 h-full w-full self-center justify-self-center overflow-y-auto rounded-lg border border-indigo-900/50 bg-indigo-500/5">
        <ArmyGrid
          gridStyle="combat"
          armyStyle="friendly"
          phase={phase}
          army={combatUnits}
          selectedUnit={combatUnits[friendlyIndex]}
        />
      </div>
      <div className="col-start-1 row-start-2">{/* Empty Cell */}</div>
      <div className="col-start-2 row-span-2 row-start-1 grid h-full w-full grid-cols-[1fr] grid-rows-[1fr_4.5fr_2.5fr_1fr]">
        {phase === Phases.PostCombat && (
          <div className="row-span-3 row-start-1 grid h-full w-full p-4">
            <PostCombatSummary
              BASE_UNIT_DATA={BASE_UNIT_DATA}
              buildings={buildings}
              unitTypes={unitTypes}
              friendlyUnits={combatUnits}
              enemyUnits={combatEnemyUnits}
            />
          </div>
        )}

        {phase === Phases.PreCombat ||
          (phase === Phases.Combat && (
            <div className="row-start-1 self-center justify-self-center">
              {/* Taunts, etc */}
            </div>
          ))}
        {/* cards */}
        <div className="row-span-1 row-start-2 grid h-full grid-cols-[1fr_1fr] grid-rows-[1fr] place-content-between overflow-y-auto p-0 sm:p-3">
          {phase === Phases.PreCombat && (
            <PreCombatCardTemplate
              BASE_UNIT_DATA={BASE_UNIT_DATA}
              armyStyle="friendly"
              headerText="Your Army"
              army={combatUnits}
              unitCounts={combatUnitCounts}
              unitTypes={unitTypes}
            />
          )}
          {phase === Phases.PreCombat && (
            <PreCombatCardTemplate
              BASE_UNIT_DATA={BASE_UNIT_DATA}
              armyStyle="enemy"
              headerText="Enemy Army"
              army={combatEnemyUnits}
              unitCounts={combatEnemyUnitCounts}
              unitTypes={unitTypes}
            />
          )}
          {phase === Phases.Combat && (
            <CombatCardTemplate
              armyStyle="friendly"
              unit={combatUnits[friendlyIndex]}
              subphase={subPhase}
            />
          )}
          {phase === Phases.Combat && (
            <CombatCardTemplate
              armyStyle="enemy"
              unit={combatEnemyUnits[enemyIndex]}
              subphase={subPhase}
            />
          )}
        </div>
        {/* Log */}

        {phase !== Phases.PostCombat && (
          <div className="row-start-3 h-full w-full self-center justify-self-center overflow-y-auto p-4">
            <CombatLog combatEvents={combatEvents} townName={townName} />
          </div>
        )}
        {/* Button */}
      </div>
      <div className="col-start-2 row-start-2 h-full w-full self-center justify-self-center p-3">
        <div className="row-start-4 h-full w-full">
          {phase === Phases.PreCombat && (
            <CombatButton
              buttonText="Start"
              onClick={() => combatMegaFunction()}
            />
          )}
          {phase === Phases.Combat && subPhase === SubPhases.Fight ? (
            <CombatButton
              buttonText="Fight!"
              onClick={() => combatMegaFunction()}
            />
          ) : (
            phase === Phases.Combat &&
            subPhase === SubPhases.VictoryCheck && (
              /* FIXME: Make name depend on state of army (select, summary, etc) */
              <CombatButton
                buttonText={
                  survivingFriendlyUnitIndexes.length === 0 ||
                  survivingEnemyUnitIndexes.length === 0
                    ? "Summary"
                    : "New Selection"
                }
                onClick={() => combatMegaFunction()}
              />
            )
          )}
        </div>
      </div>
      <div className="col-start-3 row-start-1 h-full w-full self-center justify-self-center overflow-y-auto rounded-lg border border-red-900/50 bg-red-500/5">
        <ArmyGrid
          gridStyle="combat"
          armyStyle="enemy"
          phase={phase}
          army={combatEnemyUnits}
          selectedUnit={combatEnemyUnits[enemyIndex]}
        />
      </div>
      <div className="col-start-3 row-start-2 h-full w-full self-center justify-self-center p-3">
        {phase === Phases.PostCombat &&
          (buildings["townCenter"].constructed ? (
            <CombatButton
              buttonText="Return to Planning"
              onClick={() => {
                combatMegaFunction();
              }}
            />
          ) : (
            <Link
              className="text-md flex h-full w-full items-center justify-center rounded bg-red-600 text-center font-bold text-white shadow-md shadow-red-600/50 duration-75 hover:bg-red-800 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl"
              to="/"
            >
              Return to Start
            </Link>
          ))}
      </div>
    </div>
  );
}
