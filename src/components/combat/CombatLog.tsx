import React, { useState } from "react";
import { Phase, Subphase } from "../../types/CombatPhases";
import { Unit } from "../../types/Unit";
import POddStyle from "../POddStyle";

interface CombatLogProps {
  phase: Phase;
  subphase: Subphase;
  townName: string;
  combatUnits: Unit[];
  combatEnemyUnits: Unit[];
  friendlyIndex: number;
  enemyIndex: number;
}

/* TODO: Send new text to the top */
/* TODO: Remove table formatting, make only the newest line colored amber. */
export default function CombatLog({
  phase,
  subphase,
  townName,
  combatUnits,
  combatEnemyUnits,
  friendlyIndex,
  enemyIndex,
}: CombatLogProps) {
  const [logState, setLogState] = useState<string[]>([]);

  const combatLog = [
    "Your units defeated each other at the last moment. Prepare for the next battle!",

    "Your army was defeated. Your buildings took damage!",
    "Enemy army defeated. You won the battle!",
    "Friendlyname vs Enemyname",
    "Enemy ... takes ... damage but survives with ... health.",
    "Enemy ... takes ... damage and dies.",
    "Friendly ... takes ... damage but survives with ... health.",
    "Friendly ... takes ... damage and dies.",
  ];

  // TODO: Take "combat snapshots" as combat progreses, which are saved to state. Then produce those snapshots here instead of calling on unit data.
  // That state array will keep track of the combat log, mapping each element to keep a history

  const friendlyUnit = combatUnits[friendlyIndex];
  const enemyUnit = combatEnemyUnits[enemyIndex];

  return (
    <div className="col-span-12 col-start-1 row-start-1 aspect-video max-h-32 w-full self-center overflow-y-auto rounded-lg bg-gray-500/10 p-4 text-sm sm:col-span-4 sm:col-start-5 sm:row-span-2 sm:row-start-1 sm:h-5/6 sm:max-h-full sm:w-full sm:text-sm lg:text-lg xl:aspect-[5/3]">
      {phase === "pre" && (
        <div>
          <POddStyle>The enemy has reached the gates of {townName}.</POddStyle>
          {/* TODO: Incorporate this feature. eg If you have a Tier 1 scout post, you get a message. */}
          <POddStyle>
            Scouts say the chance of winning is about{" "}
            <span className="text-sky-400">85%</span>.
          </POddStyle>
        </div>
      )}
      {phase === "combat" && subphase === "fight" && (
        <div>
          <POddStyle>
            <span className="text-green-400">
              {friendlyUnit.name}
              {friendlyUnit.id}
            </span>{" "}
            faces off against{" "}
            <span className="text-red-400">
              {enemyUnit.name}
              {enemyUnit.id}
            </span>
            .
          </POddStyle>
        </div>
      )}
      {phase === "combat" && subphase === "victoryCheck" && (
        <div>
          <POddStyle>
            <span className="text-green-400">
              {friendlyUnit.name}
              {friendlyUnit.id}
            </span>{" "}
            does {friendlyUnit.attack} damage to enemy{" "}
            <span className="text-red-400">
              {enemyUnit.name}
              {enemyUnit.id}
            </span>
            .
          </POddStyle>
          <POddStyle>
            <span className="text-red-400">
              {enemyUnit.name}
              {enemyUnit.id}
            </span>{" "}
            retaliates with {enemyUnit.attack} damage.
          </POddStyle>
          {friendlyUnit.currentHealth > 0 ? (
            <POddStyle>
              <span className="text-green-400">
                {friendlyUnit.name}
                {friendlyUnit.id}
              </span>{" "}
              survives with {friendlyUnit.currentHealth} health.
            </POddStyle>
          ) : (
            <POddStyle>
              <span className="text-green-400">
                {friendlyUnit.name}
                {friendlyUnit.id}
              </span>{" "}
              falls.
            </POddStyle>
          )}
          {enemyUnit.currentHealth > 0 ? (
            <POddStyle>
              <span className="text-red-400">
                {enemyUnit.name}
                {enemyUnit.id}
              </span>{" "}
              survives with {enemyUnit.currentHealth} health.
            </POddStyle>
          ) : (
            <POddStyle>
              <span className="text-red-400">
                {enemyUnit.name}
                {enemyUnit.id}
              </span>{" "}
              falls.
            </POddStyle>
          )}
          {/* if both units survive */}
          {friendlyUnit.currentHealth > 0 && enemyUnit.currentHealth > 0 ? (
            <POddStyle>
              Both units survive and return to their armies.
            </POddStyle>
          ) : null}
          {/* if only friendly survives */}
          {friendlyUnit.currentHealth > 0 && enemyUnit.currentHealth === 0 ? (
            <POddStyle>
              <span className="text-green-400">
                {friendlyUnit.name}
                {friendlyUnit.id}
              </span>{" "}
              returns to their army.
            </POddStyle>
          ) : null}
          {/* if only enemy survives */}
          {friendlyUnit.currentHealth === 0 && enemyUnit.currentHealth > 0 ? (
            <POddStyle>
              <span className="text-red-400">
                {enemyUnit.name}
                {enemyUnit.id}
              </span>{" "}
              returns to their army.
            </POddStyle>
          ) : null}
        </div>
      )}
      {phase === "post" && (
        /* TODO: Need a count of surviving units to render this */
        <div>
          <POddStyle>
            You defeated the enemy army and live to fight another day, but the
            enemy is already regrouping.
          </POddStyle>
          <POddStyle>
            Plan your next moves carefully and prepare for another wave!
          </POddStyle>
        </div>
      )}
    </div>
  );
}

/*
REFERENCE
<p className="text-white odd:bg-white/5">
            The enemy army has reached Gabenfort!
          </p>
          <p className="text-amber-400 odd:bg-white/5">
            Gary Longshanks (melee) faces off against Orga Thrung (tanky).
          </p>
          <p className="text-green-400  odd:bg-white/5">
            Gary Longshanks does 3 damage to the enemy tanky.
          </p>
          <p className="text-red-600  odd:bg-white/5">
            Orga Thrung retaliates with a savage 7 damage.
          </p>
          <p className="text-red-300  odd:bg-white/5">Gary Longshanks falls!</p>
          <p className="text-amber-400  odd:bg-white/5">
            Peter Whislequill (pewpew) faces off against Gygor Grunch(melee).
          </p>
          <p className="text-green-400">
            Peter Whislequill does 7 damage to Gygor Grunch.
          </p>
          <p className="text-red-500">
            Gygor takes a mean swing back at Peter Whistlequill, but misses!
          </p>
          <p className="text-amber-400">
            Both units survive and return to their armies.
          </p>
*/
