import React, { useState } from "react";
import { getAllJSDocTagsOfKind } from "typescript";
import {
  PreCombatEvent,
  MainCombatEvent,
  PostCombatEvent,
  CombatEvent,
} from "../../types/CombatEvents";
import { Phases, SubPhases } from "../../types/CombatPhases";
import { CombatSnapshot } from "../../types/CombatSnapshots";
import { Unit } from "../../types/Unit";
import POddStyle from "../POddStyle";

interface CombatLogProps {
  combatEvents: CombatEvent[];
  townName: string;
  defaultTownName: string;
}

/* TODO: Send new text to the top */
/* TODO: Remove table formatting, make only the newest line colored amber. */
export default function CombatLog({
  combatEvents,
  townName,
  defaultTownName,
}: CombatLogProps) {
  const messages = {
    preCombat: [
      (event: PreCombatEvent) => {
        return (
          <>
            {/* TODO: The enemy has reached the gates of {townName || defaultTownName}. */}
            The enemy has reached the gates.{" "}
            <span>{event.data.friendly.name}</span> faces off against{" "}
            <span>{event.data.enemy.name}</span>.
          </>
        );
      },
      /* more alternatives here */
    ],
    combat: [
      (event: MainCombatEvent) => {
        return (
          <>
            <span>{event.data.friendly.name}</span> has attacked{" "}
            <span>{event.data.enemy.name}</span> for{" "}
            {event.data.friendly.attack} damage.
          </>
        );
      },
      (event: MainCombatEvent) => {
        return (
          <>
            <span>{event.data.enemy.name}</span> has attacked{" "}
            <span>{event.data.friendly.name}</span> for{" "}
            {event.data.enemy.attack} damage.
          </>
        );
      },
    ],
    postCombat: [
      (event: PostCombatEvent) => {
        return <>Both units survive and return to their armies.</>;
      },
      (event: PostCombatEvent) => {
        return (
          <>
            <span>
              {event.data.friendly.name}
              {event.data.friendly.id}
            </span>{" "}
            returns to their army.
          </>
        );
      },
    ],
  };

  return (
    <div className="col-span-12 col-start-1 row-start-1 aspect-video max-h-32 w-full self-center overflow-y-auto rounded-lg bg-gray-500/10 p-4 text-sm sm:col-span-4 sm:col-start-5 sm:row-span-2 sm:row-start-1 sm:h-5/6 sm:max-h-full sm:w-full sm:text-sm lg:text-lg xl:aspect-[5/3]">
      {combatEvents.map((item) => {
        messages[item.event.type][item.event.idx](item);
      })}
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
