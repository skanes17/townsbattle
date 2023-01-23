import React, { useState } from "react";
import {
  CombatEvent,
  MainCombatEvent,
  Phases,
  PostCombatEvent,
  PreCombatEvent,
  SubPhases,
  Unit,
  UnitCounts,
} from "../../types";
import { AutoButton, CombatButton } from "../buttons";
import { CombatCardTemplate, PreCombatCardTemplate } from "../cards";
import { ArmyGrid, CombatLog, messages, PostCombatSummary } from "../combat";

// TODO: Consider adding a button for an auto-play, like it steps forward every 2 seconds or something

/* TODO: Figure out how to place enemy units starting from top right in grid */
/* FIXME: Page breaking when army has 0 units */

interface CombatProps {
  myUnits: Unit[];
  //setMyUnits: any;
  setMyUnits: (unit: Unit[]) => void;
  enemyUnits: Unit[];
  // setEnemyUnits: any;
  setEnemyUnits: (unit: Unit[]) => void;
  townName: string;
  defaultTownName: string;
  switchPhase: () => void;
}

export default function Combat({
  myUnits,
  enemyUnits,
  setMyUnits,
  setEnemyUnits,
  townName,
  defaultTownName,
  switchPhase,
}: CombatProps) {
  const [phase, setPhase] = useState<Phases>(Phases.PreCombat);
  const [subPhase, setSubPhase] = useState<SubPhases>(SubPhases.Fight);

  const [combatUnits, setCombatUnits] = useState<Unit[]>([...myUnits]);
  const [combatEnemyUnits, setCombatEnemyUnits] = useState<Unit[]>([
    ...enemyUnits,
  ]);

  const [combatEvents, setCombatEvents] = useState<CombatEvent[]>([]);
  const [turnsCompleted, setTurnsCompleted] = useState(0);

  const combatUnitCounts: UnitCounts = {
    melee: combatUnits.filter((unit) => unit.unitType === "melee").length,
    pewpew: combatUnits.filter((unit) => unit.unitType === "pewpew").length,
    tanky: combatUnits.filter((unit) => unit.unitType === "tanky").length,
  };

  const combatEnemyUnitCounts: UnitCounts = {
    melee: enemyUnits.filter((unit) => unit.unitType === "melee").length,
    pewpew: enemyUnits.filter((unit) => unit.unitType === "pewpew").length,
    tanky: enemyUnits.filter((unit) => unit.unitType === "tanky").length,
  };

  // we only want to choose from units that are alive (health not 0)
  // we'll first generate an array of indexes for surviving combat units
  const survivingFriendlyUnitIndexes = combatUnits
    .map((unit, index) => {
      if (unit.currentHealth !== 0) {
        return index;
      } else return -1;
      // FIXME: Better way to do this?
    })
    .filter((index) => index >= 0);

  const survivingEnemyUnitIndexes = combatEnemyUnits
    .map((unit, index) => {
      if (unit.currentHealth !== 0) {
        return index;
      } else return -1;
    })
    .filter((index) => index >= 0);

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
    setCombatEvents([combatState, ...combatEvents]);
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
    /* FIXME: Chooses randomly from possible messages when two units face off */
    const eventIndex =
      // picks any array index except index of 0
      Math.floor(Math.random() * (messages.preCombat.length - 1)) + 1;
    const combatState = { event: preCombatEvent, idx: eventIndex };
    // experimenting with appending to top
    setCombatEvents([combatState, ...combatEvents]);

    // if both armies remain, select new units
    setFriendlyIndex(newFriendlyIndex);
    setEnemyIndex(newEnemyIndex);
  };

  const damageUnits = () => {
    // chosen units attack each other

    // FIXME: Simplify this? Still hesitant to modify combatUnits directly
    const _friendlyCopy = [...combatUnits];
    // damage the selected friendly unit; set to 0 if dmg exceeds health
    _friendlyCopy[friendlyIndex].currentHealth = Math.max(
      0,
      _friendlyCopy[friendlyIndex].currentHealth -
        combatEnemyUnits[enemyIndex].attack
    );

    // update army with new unit health
    setCombatUnits(_friendlyCopy);

    const _enemyCopy = [...combatEnemyUnits];
    _enemyCopy[enemyIndex].currentHealth = Math.max(
      0,
      _enemyCopy[enemyIndex].currentHealth - combatUnits[friendlyIndex].attack
    );
    setCombatEnemyUnits(_enemyCopy);

    // the following adds a combat event for the combat log
    const combatEvent: MainCombatEvent = {
      type: "combat",
      data: {
        friendly: {
          name: combatUnits[friendlyIndex].name,
          unitType: combatUnits[friendlyIndex].unitType,
          attack: combatUnits[friendlyIndex].attack,
          maxHealth: combatUnits[friendlyIndex].maxHealth,
          // used copy to avoid state update's async issues
          currentHealth: _friendlyCopy[friendlyIndex].currentHealth,
          id: combatUnits[friendlyIndex].id,
        },
        enemy: {
          name: combatEnemyUnits[enemyIndex].name,
          unitType: combatEnemyUnits[enemyIndex].unitType,
          attack: combatEnemyUnits[enemyIndex].attack,
          maxHealth: combatEnemyUnits[enemyIndex].maxHealth,
          // used copy to avoid state update's async issues
          currentHealth: _enemyCopy[enemyIndex].currentHealth,
          id: combatEnemyUnits[enemyIndex].id,
        },
      },
    };
    /* FIXME: Should choose the appropriate message based on context when two units are fighting */
    const eventIndex = Math.floor(Math.random() * messages.combat.length);

    const combatState = { event: combatEvent, idx: eventIndex };
    // experimenting with appending to top
    setCombatEvents([combatState, ...combatEvents]);
  };

  /* FIXME: Unfinished! */
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

    /* FIXME: Should choose the appropriate message based on context post combat */
    const eventIndex = 0;

    const combatState = { event: postCombatEvent, idx: eventIndex };
    // experimenting with appending to top
    setCombatEvents([combatState, ...combatEvents]);
  };

  const sendArmiesToPlanning = () => {
    // send all all surviving units back to planning
    // TODO: Top up their health?
    setMyUnits(
      combatUnits
        .map((unit) => {
          if (unit.currentHealth !== 0) {
            return unit;
          }
        })
        .filter((unit) => unit !== undefined) as Unit[]
      // FIXME: Test that "as Unit[]" worked as intended; if not, remove for now
    );

    // probably unnecessary at this phase but keeping it anyway; can't hurt?
    setEnemyUnits(
      combatEnemyUnits
        .map((unit) => {
          if (unit.currentHealth !== 0) {
            return unit;
          }
        })
        .filter((unit) => unit !== undefined) as Unit[]
    );
  };

  // TODO: If you have no units upon combat:
  // immediately go to post; buildings are damaged accordingly
  const combatMegaFunction = () => {
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
            // combatEvent() happens within damageUnits
            damageUnits();
            // TODO: Add in animation for units attacking each other
            setTurnsCompleted(turnsCompleted + 1);
            setSubPhase(SubPhases.VictoryCheck);
            break;

          case SubPhases.VictoryCheck:
            if (
              survivingFriendlyUnitIndexes.length !== 0 &&
              survivingEnemyUnitIndexes.length !== 0
            ) {
              // return the units to their army and pick new ones
              // also sets a new preCombatEvent
              selectNewUnits();

              setSubPhase(SubPhases.Fight);
            } else {
              // if an army was defeated, end combat

              // TODO: See below
              // calculate all the stats to present on next screen, such as...
              // number of units defeated
              // number of units lost
              // number of units injured
              // buildings damaged (and how much?)

              postCombatEvent();

              setPhase(Phases.PostCombat);
            }
            break;
        }
        break;
      case Phases.PostCombat:
        sendArmiesToPlanning();
        switchPhase();
        break;
    }
  };

  // TODO: Incorporate something like "Auto - 5/10/20 units" or something... so you can batch fights
  const autoBattler = () => {
    const autoFriendlyUnits = [...combatUnits];
    const autoEnemyUnits = [...combatEnemyUnits];
    // TODO: loop until all units on one or both sides are dead

    // gather surviving units
    let _survivingFriendlyUnitIndexes = autoFriendlyUnits
      .map((unit, index) => {
        if (unit.currentHealth !== 0) {
          return index;
        } else return -1;
      })
      .filter((index) => index >= 0);
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

  return (
    <body className="grid auto-rows-min grid-cols-12 place-content-stretch gap-3 p-4 md:gap-4 lg:gap-5 xl:gap-8">
      {/* ArmyGrid & CombatLog are common components to all phases */}
      {/* TODO: Reduce opacity of army grids when combat is over, put a green outline for winner, red for loser? */}
      <ArmyGrid
        phase={phase}
        army={combatUnits}
        selectedUnit={combatUnits[friendlyIndex]}
        startColumn="1"
      />
      <CombatLog
        combatEvents={combatEvents}
        townName={townName}
        defaultTownName={defaultTownName}
      />
      <ArmyGrid
        phase={phase}
        army={combatEnemyUnits}
        selectedUnit={combatEnemyUnits[enemyIndex]}
        startColumn="8"
      />

      {phase === Phases.PostCombat ? (
        <>
          <div className="center col-span-12 col-start-1 row-start-4 w-5/6 self-center justify-self-center sm:row-start-3 sm:mt-2 md:mt-0">
            <PostCombatSummary
              friendlyUnits={combatUnits}
              enemyUnits={combatEnemyUnits}
            />
          </div>
          {/* FIXME: Should really just call button once!! */}
          <div className="col-span-12 flex items-center justify-end">
            <button
              className="text-md rounded border border-white/40 bg-blue-600 p-2 font-bold text-white duration-75 hover:bg-blue-800 sm:text-lg md:text-2xl lg:text-3xl 
                   xl:text-4xl"
              onClick={() => combatMegaFunction()}
            >
              Return to Planning
            </button>
          </div>
        </>
      ) : (
        <div className="card col-span-5 col-start-1 row-start-4 mr-4 w-4/5 max-w-xs self-center justify-self-center sm:row-start-3 sm:mt-2 sm:justify-self-end md:mt-0">
          {phase === Phases.PreCombat && (
            <PreCombatCardTemplate
              headerText="Your Army"
              army={combatUnits}
              unitCounts={combatUnitCounts}
            />
          )}
          {/* TODO: When HP is 0, show a skull on the combat card */}
          {phase === Phases.Combat && (
            <CombatCardTemplate
              unit={combatUnits[friendlyIndex]}
              subphase={subPhase}
            />
          )}
        </div>
      )}

      {(phase === Phases.PreCombat || phase === Phases.Combat) && (
        <div className="col-span-2 col-start-6 row-start-4 grid auto-rows-min place-content-center gap-2 sm:row-start-3 sm:mt-2 md:mt-0">
          {phase === Phases.Combat && (
            <div className="mx-auto max-h-24 overflow-y-auto rounded-bl-md rounded-tr-md border border-white/25 p-2 text-center text-xs sm:max-h-full sm:text-sm md:text-base lg:text-lg xl:text-xl">
              {/* TODO: Maybe make this take up 4 columns, pops up as overlap then fades? */}
              <p>
                Random taunts when units battle each other, pop up during fight
                then fade.
              </p>
            </div>
          )}

          <div className="flex items-end justify-center p-4 pb-0">
            {phase === Phases.PreCombat && (
              <CombatButton
                buttonText="Start"
                onClick={() => combatMegaFunction()}
              />
            )}
            {/* FIXME: Must be a cleaner way?? */}
            {phase === Phases.Combat && subPhase === SubPhases.Fight ? (
              <CombatButton
                buttonText="Fight"
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
                      : "Again!"
                  }
                  onClick={() => combatMegaFunction()}
                />
              )
            )}
          </div>
          {phase === Phases.Combat && (
            <div className="flex items-start justify-center p-4 pt-0">
              <AutoButton buttonText="Auto" onClick={() => autoBattler()} />
            </div>
          )}
        </div>
      )}

      {phase !== Phases.PostCombat && (
        <div className="card col-span-5 col-start-8 row-start-4 ml-4 w-4/5 max-w-xs self-center justify-self-center sm:row-start-3 sm:mt-2 sm:justify-self-start md:mt-0">
          {phase === Phases.PreCombat && (
            <PreCombatCardTemplate
              headerText="Enemy Army"
              army={combatEnemyUnits}
              unitCounts={combatEnemyUnitCounts}
            />
          )}
          {phase === Phases.Combat && (
            <CombatCardTemplate
              unit={combatEnemyUnits[enemyIndex]}
              subphase={subPhase}
            />
          )}
        </div>
      )}
    </body>
  );
}
