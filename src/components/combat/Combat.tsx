import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TutorialMessages } from "../../gameData";
import {
  BaseUnitData,
  Buildings,
  CombatEvent,
  MainCombatEvent,
  NoArmyEvent,
  Phases,
  PostCombatEvent,
  PreCombatEvent,
  ResourcePool,
  SubPhases,
  SummaryEvent,
  Unit,
  UnitType,
  TutorialCategory,
  TipsSeen,
  BombirdDeathEvent,
  GameSave,
  Difficulty,
} from "../../types";
import {
  addResultToLeaderBoardAndDeleteSave,
  addSurvivalPointsToSurvivingUnits,
  AttackValueType,
  calculatedAttackValue,
  cloneBasicObjectWithJSON,
  countUnits,
} from "../../utils";
import { getSurvivingUnitIndexes } from "../../utils/getSurvivingUnitIndexes";
import { CombatButton } from "../buttons";
import {} from "../cards";
import { CombatLog, messages, PostCombatSummary } from ".";
import PreCombatCardTemplate from "../cards/PreCombatCardTemplate";
import CombatCardTemplate from "../cards/CombatCardTemplate";
import useSound from "use-sound";
/* @ts-ignore */
import destroyBldgSfx from "../../assets/sounds/destroyBldgSfx.mp3";
import { Modal, ModalHeader, ModalTextContent } from "../planning/tutorials";
import { ArmyGrid } from "../shared";
import { difficultyScoreMultipliers } from "../../gameData/difficultyScoreMultipliers";

// TODO: Consider adding a button for an auto-play, like it steps forward every 2 seconds or something

/* TODO: Figure out how to place enemy units starting from top right in grid */

interface CombatProps {
  currentGameSave: GameSave;
  tutorials: boolean;
  difficulty: Difficulty;
  tipsSeen: TipsSeen;
  markTipAsSeen: (tutorialCategory: TutorialCategory) => void;
  currentCombatTurn: number;
  BASE_UNIT_DATA: BaseUnitData;
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
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  scoreUpdaterFn: (points: number) => void;
}

export default function Combat({
  currentGameSave,
  tutorials,
  difficulty,
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
  score,
  setScore,
  scoreUpdaterFn,
}: CombatProps) {
  const [phase, setPhase] = useState<Phases>(Phases.PreCombat);
  const [subPhase, setSubPhase] = useState<SubPhases>(SubPhases.Fight);

  const [playDestroyBldgSound] = useSound(destroyBldgSfx);

  const basePointsForCompletingCombat =
    100 * difficultyScoreMultipliers[difficulty];

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
          randomName: combatUnits[friendlyIndex].randomName,
          id: combatUnits[friendlyIndex].id,
        },
        enemy: {
          name: combatEnemyUnits[enemyIndex].name,
          randomName: combatEnemyUnits[enemyIndex].randomName,
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
          randomName: combatUnits[newFriendlyIndex].randomName,
          id: combatUnits[newFriendlyIndex].id,
        },
        enemy: {
          name: combatEnemyUnits[newEnemyIndex].name,
          randomName: combatEnemyUnits[newEnemyIndex].randomName,
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

  // default behaviour
  const unitsFight = () => {
    // chosen units attack each other
    const _friendlyArmy = [...combatUnits];
    const _enemyArmy = [...combatEnemyUnits];
    const selectedFriendly = _friendlyArmy[friendlyIndex];
    const selectedEnemy = _enemyArmy[enemyIndex];
    // units cloned to preserve fullHealthAttackBonus, etc
    const clonedSelectedFriendly = { ...selectedFriendly };
    const clonedSelectedEnemy = { ...selectedEnemy };

    // INCORPORATE PASSIVE EFFECTS HERE
    // timesSelectedForCombat: number;

    /* TODO: Optimize the following conditionals */
    // only run this if the friendly hits first and the enemy does not
    if (selectedFriendly.hitsFirst && !selectedEnemy.hitsFirst) {
      // Enemy gets hit first
      selectedEnemy.currentHealth = Math.max(
        0,
        selectedEnemy.currentHealth -
          calculatedAttackValue(
            AttackValueType.toEnemy,
            clonedSelectedFriendly,
            clonedSelectedEnemy
          )
      );

      // If the enemy survives, it attacks. Else, it's dead and its attack is set to 0.
      if (selectedEnemy.currentHealth > 0) {
        selectedFriendly.currentHealth = Math.max(
          0,
          selectedFriendly.currentHealth -
            calculatedAttackValue(
              AttackValueType.toEnemy,
              clonedSelectedEnemy,
              clonedSelectedFriendly
            )
        );
      } else {
        // default
        selectedEnemy.attack = 0;
      }
    }
    // only run this if the enemy hits first and the friendly does not
    else if (selectedEnemy.hitsFirst && !selectedFriendly.hitsFirst) {
      // Friendly gets hit first
      selectedFriendly.currentHealth = Math.max(
        0,
        selectedFriendly.currentHealth -
          calculatedAttackValue(
            AttackValueType.toEnemy,
            clonedSelectedEnemy,
            clonedSelectedFriendly
          )
      );
      // If the friendly survives, it attacks. Else, it's dead and its attack is set to 0.
      if (selectedFriendly.currentHealth > 0) {
        selectedEnemy.currentHealth = Math.max(
          0,
          selectedEnemy.currentHealth -
            calculatedAttackValue(
              AttackValueType.toEnemy,
              clonedSelectedFriendly,
              clonedSelectedEnemy
            )
        );
      } else selectedFriendly.attack = 0;
    } else {
      // default fight -- no hitsFirst mechanic
      selectedEnemy.currentHealth = Math.max(
        0,
        selectedEnemy.currentHealth -
          calculatedAttackValue(
            AttackValueType.toEnemy,
            clonedSelectedFriendly,
            clonedSelectedEnemy
          )
      );

      // damage the selected friendly unit; set to 0 if dmg exceeds health
      selectedFriendly.currentHealth = Math.max(
        0,
        selectedFriendly.currentHealth -
          calculatedAttackValue(
            AttackValueType.toEnemy,
            clonedSelectedEnemy,
            clonedSelectedFriendly
          )
      );
    }

    // FIXME: Consolidate these into one function (or multiple smaller functions)
    // if ENEMY dies, do this
    if (selectedEnemy.currentHealth === 0) {
      if (selectedEnemy.damagesOpponentOnDeath) {
        // unit damages opponent on death
        const { damageToOpponentOnDeath } = selectedEnemy;
        selectedFriendly.currentHealth = Math.max(
          0,
          selectedFriendly.currentHealth - (damageToOpponentOnDeath ?? 0)
        );
      }

      const indexesOfUnitsAffectedByAoeDamage: number[] = [];
      const randomNamesOfUnitsAffectedByAoeDamage: string[] = [];
      if (selectedEnemy.doesAreaOfEffectDamageOnDeath) {
        // defeated unit does area of effect damage to opposing army on death
        // don't include the opposing unit in the AoE damage
        const clonedSurvivingUnitIndexes = [
          ...survivingFriendlyUnitIndexes,
        ].filter(
          (survivingUnitIndex) =>
            _friendlyArmy[survivingUnitIndex] !== selectedFriendly
        );
        const numberOfUnitsToBeDamaged =
          selectedEnemy.numberOfUnitsAffectedByAoeDamageOnDeath ?? 0;

        // Fill an array with the required number of unique unit indices from the appropriate army to be damaged
        while (
          clonedSurvivingUnitIndexes.length > 0 &&
          indexesOfUnitsAffectedByAoeDamage.length < numberOfUnitsToBeDamaged
        ) {
          const randomIndex = Math.floor(
            Math.random() * clonedSurvivingUnitIndexes.length
          );
          indexesOfUnitsAffectedByAoeDamage.push(
            clonedSurvivingUnitIndexes.splice(randomIndex, 1)[0]
          );
        }

        indexesOfUnitsAffectedByAoeDamage.forEach((index) => {
          randomNamesOfUnitsAffectedByAoeDamage.push(
            _friendlyArmy[index].randomName
          );
        });

        // Damage each relevant unit
        for (const index of indexesOfUnitsAffectedByAoeDamage) {
          const unitToBeDamagedByAoe = _friendlyArmy[index];

          const areaOfEffectDamageOnDeath =
            selectedEnemy.areaOfEffectDamageOnDeath ?? 0;
          unitToBeDamagedByAoe.currentHealth = Math.max(
            0,
            unitToBeDamagedByAoe.currentHealth - areaOfEffectDamageOnDeath
          );
        }
      }
      if (selectedEnemy.unitType === "bombird") {
        console.log("Bombird dead!");
        const {
          randomName,
          damageToOpponentOnDeath,
          areaOfEffectDamageOnDeath,
        } = selectedEnemy;

        console.log(selectedEnemy);

        const bombirdEvent: BombirdDeathEvent = {
          type: "combat",
          data: {
            destroyedUnit: {
              randomName,
              damageToOpponentOnDeath,
              areaOfEffectDamageOnDeath,
            },
            opposingUnit: { randomName: selectedFriendly.randomName },
            numberOfUnitsAffected: indexesOfUnitsAffectedByAoeDamage.length,
            // what happens if empty string array?
            randomNamesOfUnitsAffectedByAoeDamage,
          },
        };

        console.log(bombirdEvent);

        // FIXME: Note; the error is happening when hit by archer... shouldn't be dead if attack is 4!

        // bombird event index
        const eventIndex = 4;

        const combatState = { event: bombirdEvent, idx: eventIndex };
        console.log(combatState);

        // experimenting with appending to top
        setCombatEvents((prevCombatEvents) => [
          combatState,
          ...prevCombatEvents,
        ]);

        // TODO: PICK UP FROM HERE, DO FOR FRIENDLY
      }
    }
    // if FRIENDLY dies, do this
    if (selectedFriendly.currentHealth === 0) {
      // Check if selected enemy damages opponent on death
      if (selectedFriendly.damagesOpponentOnDeath) {
        const damageToOpponent = selectedFriendly.damageToOpponentOnDeath ?? 0;
        selectedEnemy.currentHealth = Math.max(
          0,
          selectedEnemy.currentHealth - damageToOpponent
        );
      }

      // Check if selected unit does area of effect damage on death
      if (selectedFriendly.doesAreaOfEffectDamageOnDeath) {
        const indexesOfUnitsAffectedByAoeDamage = [];
        // don't include the opposing unit in the AoE damage
        const clonedSurvivingUnitIndexes = [
          ...survivingEnemyUnitIndexes,
        ].filter(
          (survivingUnitIndex) =>
            _enemyArmy[survivingUnitIndex] !== selectedEnemy
        );
        const numUnitsToBeDamaged =
          selectedFriendly.numberOfUnitsAffectedByAoeDamageOnDeath ?? 0;

        // Fill an array with the required number of unique unit indices from the appropriate army to be damaged
        while (
          clonedSurvivingUnitIndexes.length > 0 &&
          indexesOfUnitsAffectedByAoeDamage.length < numUnitsToBeDamaged
        ) {
          const randomIndex = Math.floor(
            Math.random() * clonedSurvivingUnitIndexes.length
          );
          indexesOfUnitsAffectedByAoeDamage.push(
            clonedSurvivingUnitIndexes.splice(randomIndex, 1)[0]
          );
        }

        // Damage each relevant unit
        for (const index of indexesOfUnitsAffectedByAoeDamage) {
          const unitToBeDamagedByAoe = _enemyArmy[index];
          const areaOfEffectDamageOnDeath =
            selectedFriendly.areaOfEffectDamageOnDeath ?? 0;
          unitToBeDamagedByAoe.currentHealth = Math.max(
            0,
            unitToBeDamagedByAoe.currentHealth - areaOfEffectDamageOnDeath
          );
        }

        // combat event here detailing what happened!
      }
    }

    // the following adds a combat event for the combat log
    /* TODO: Add in attack buffs and bonuses to the list so they're useable later */
    const combatEvent: MainCombatEvent = {
      type: "combat",
      data: {
        friendly: {
          name: combatUnits[friendlyIndex].name,
          randomName: combatUnits[friendlyIndex].randomName,
          unitType: combatUnits[friendlyIndex].unitType,
          /* attack: combatUnits[friendlyIndex].attack, */
          // cloned so bonuses are incorporated into the combat log is correct before stats are altered
          attack: calculatedAttackValue(
            AttackValueType.toEnemy,
            clonedSelectedFriendly,
            clonedSelectedEnemy
          ),
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
          randomName: combatEnemyUnits[enemyIndex].randomName,
          unitType: combatEnemyUnits[enemyIndex].unitType,
          /* attack: combatEnemyUnits[enemyIndex].attack, */
          attack: calculatedAttackValue(
            AttackValueType.toEnemy,
            clonedSelectedEnemy,
            clonedSelectedFriendly
          ),
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
    setCombatEvents((prevCombatEvents) => [combatState, ...prevCombatEvents]);

    setCombatEnemyUnits(_enemyArmy);
    setCombatUnits(_friendlyArmy);
  };

  // returning units to their armies and choosing new ones
  const postCombatEvent = () => {
    const postCombatEvent: PostCombatEvent = {
      type: "postCombat",
      data: {
        friendly: {
          name: combatUnits[friendlyIndex].name,
          randomName: combatUnits[friendlyIndex].randomName,
          maxHealth: combatUnits[friendlyIndex].maxHealth,
          currentHealth: combatUnits[friendlyIndex].currentHealth,
          id: combatUnits[friendlyIndex].id,
        },
        enemy: {
          name: combatEnemyUnits[enemyIndex].name,
          randomName: combatEnemyUnits[enemyIndex].randomName,
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

    /* TODO: Add in a town center destroyed here */
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
              // restore half their max health
              currentHealth: Math.min(
                unit.currentHealth + Math.floor(unit.maxHealth * 0.5),
                unit.maxHealth
              ),
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
    attackerLoop: for (const unitIndex of survivingEnemyUnitIndexes) {
      // if there are any buildings besides the town center, hit them first!
      if (buildingsConstructed.length > 1) {
        buildingsConstructed = Object.keys(buildings)
          .filter((buildingType) => buildingType !== "townCenter")
          .filter((key) => clonedBuildings[key].constructed);
        /* console.log("Avoiding the Town Center!"); */
      } else {
        buildingsConstructed = Object.keys(buildings).filter(
          (key) => clonedBuildings[key].constructed
        );
        /* console.log("No choice but to hit the Town Center!"); */
      }

      const buildingAttacked =
        clonedBuildings[
          buildingsConstructed[
            Math.floor(Math.random() * buildingsConstructed.length)
          ]
        ];

      const enemyUnit = combatEnemyUnits[unitIndex];

      const enemyAttackValue = calculatedAttackValue(
        AttackValueType.card,
        enemyUnit
      );
      /* console.log("Building Attacked: " + buildingAttacked.name); */
      /* console.log("Building Health: " + buildingAttacked.currentHealth); */
      /* console.log("Enemy Chosen: " + enemyUnit.name + enemyUnit.id); */
      /* console.log("Enemy Attack: " + enemyAttackValue); */

      // TODO: could set up a push to a new "buildingDamagedEvent" messages log here -- ENEMY X attacks BUILDING Y for Z DMG

      buildingAttacked.damage += enemyAttackValue;
      buildingAttacked.currentHealth = Math.max(
        0,
        buildingAttacked.currentHealth - enemyAttackValue
      );

      /* console.log("New Building Health: " + buildingAttacked.currentHealth);
      console.log(
        "Total Damage Dealt to This Building: " + buildingAttacked.damage
      ); */

      if (buildingAttacked.currentHealth === 0) {
        // if the building is destroyed, set it to destroyed (constructed = false)
        buildingAttacked.constructed = false;

        // refill its health (for a future build)
        buildingAttacked.currentHealth = buildingAttacked.maxHealth;
        // refresh pool of buildings that are to be attacked
        buildingsConstructed = Object.keys(buildings).filter(
          (key) => clonedBuildings[key].constructed
        );
        if (buildingsConstructed.length === 0) break attackerLoop;
      }
    }
    // play a sound at end of combat if any building was lost
    buildingsConstructed.length < initialNumberOfBuildingsConstructed &&
      playDestroyBldgSound();
    if (buildingsConstructed.length === 0) {
      scoreUpdaterFn(points);
      alert(
        `Your Town Center was destroyed. It's Game Over! Your final score is ${
          score + points
        }`
      );
    }
    return clonedBuildings;
  };

  const addSurvivalArmorBonus = (
    survivingUnits: Unit[],
    maximumArmor: number
  ) => {
    const updatedUnits = survivingUnits.map((unit) => {
      // if they get armor when surviving combat, add the bonus here, otherwise unchanged
      if (unit.survivalArmorBonus && unit.armor < maximumArmor) {
        return {
          ...unit,
          armor:
            BASE_UNIT_DATA[unit.unitType].armor + (unit.combatsSurvived ?? 0),
        };
      } else return { ...unit };
    });
    return updatedUnits;
  };

  // send all all surviving units back to planning
  const sendArmiesToPlanning = () => {
    const friendlyUnitsToSendToPlanning = determineWhichUnitsToSendToPlanning(
      combatUnits,
      shouldRestoreUnitHealth
    );
    const unitsWithSurvivalPointsAdded = addSurvivalPointsToSurvivingUnits(
      friendlyUnitsToSendToPlanning
    );

    // could tweak this later
    const maximumArmor = 3;
    const unitsWithArmorBonusAdded = addSurvivalArmorBonus(
      unitsWithSurvivalPointsAdded,
      maximumArmor
    );
    setFriendlyUnits(unitsWithArmorBonusAdded);

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

  /* TODO: Incorporate something simpler like this for auto battle */
  const runAutoBattler = () => {
    while (phase !== Phases.PostCombat) {
      combatMegaFunction();
    }
  };

  const combatMegaFunction = () => {
    // If you have no units upon combat, immediately go to postCombat screen
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

              /* console.log(friendlyUnitsNotSelected); */

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
        const clonedBuildings = cloneBasicObjectWithJSON(buildings);
        const buildingsConstructed = Object.keys(buildings).filter(
          (key) => clonedBuildings[key].constructed
        );

        // reset all building damage to 0
        if (buildingsConstructed.length > 0) {
          setBuildings(resetBuildingDamageToZero(buildings));
          sendArmiesToPlanning();
          // add points from this battle to total score, as well as some extra points based on how many combats completed
          scoreUpdaterFn(
            points + currentCombatTurn * basePointsForCompletingCombat
          );
          switchPhase();
        }
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

  // for each enemy defeated, add their build score to your total
  const points = combatEnemyUnits
    .filter((unit) => unit.currentHealth === 0)
    .reduce(
      (totalPoints, unit) =>
        totalPoints + unit.buildScore * difficultyScoreMultipliers[difficulty],
      0
    );

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
      <div className="col-start-1 row-start-2 self-center pl-2">
        Points: {points}
      </div>
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
        {phase === Phases.PreCombat && (
          <CombatButton
            buttonText={combatUnits.length > 0 ? `Start` : `Summary`}
            onClick={() => combatMegaFunction()}
          />
        )}
        {phase === Phases.Combat && subPhase === SubPhases.Fight && (
          <CombatButton
            buttonText="Fight!"
            onClick={() => combatMegaFunction()}
          />
        )}
        {phase === Phases.Combat &&
          subPhase === SubPhases.VictoryCheck &&
          survivingFriendlyUnitIndexes.length !== 0 &&
          survivingEnemyUnitIndexes.length !== 0 && (
            <CombatButton
              buttonText="New Selection"
              onClick={() => combatMegaFunction()}
            />
          )}
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
        {phase === Phases.Combat &&
          subPhase === SubPhases.VictoryCheck &&
          (survivingFriendlyUnitIndexes.length === 0 ||
            survivingEnemyUnitIndexes.length === 0) && (
            <CombatButton
              buttonText="Summary"
              onClick={() => combatMegaFunction()}
            />
          )}
      </div>

      {phase === Phases.PostCombat && (
        <div className="col-start-2 row-start-2 h-full w-full self-center justify-self-center p-3">
          {buildings["townCenter"].constructed ? (
            <CombatButton
              buttonText="Return to Planning"
              onClick={() => {
                combatMegaFunction();
              }}
            />
          ) : (
            <Link
              className="text-md flex h-full w-full items-center justify-center rounded bg-red-600 text-center font-bold text-white shadow-md shadow-red-600/50 duration-75 hover:bg-red-800 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl"
              to="../"
              onClick={() =>
                addResultToLeaderBoardAndDeleteSave(currentGameSave)
              }
              /* TODO: Function to delete the save here and add it to leaderboard */
            >
              Return to Start
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
