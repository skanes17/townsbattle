import React, { useState } from "react";
import { CombatEvent } from "../../types";
import POddStyle from "./POddStyle";
import { messages } from "./Messages";

interface CombatLogProps {
  combatEvents: CombatEvent[];
  townName: string;
}

export default function CombatLog({ combatEvents, townName }: CombatLogProps) {
  return (
    <div className="col-span-12 col-start-1 row-start-1 aspect-video max-h-32 w-full self-center overflow-y-auto rounded-lg bg-gray-500/10 p-4 text-sm sm:col-span-4 sm:col-start-5 sm:row-span-2 sm:row-start-1 sm:h-5/6 sm:max-h-full sm:w-full sm:text-sm lg:text-lg xl:aspect-[5/3]">
      {combatEvents.map((item) => {
        // the item event type is "preCombat", "combat", etc
        // item index is which message to choose from the list of these events
        // item.event takes an item holding friendly+enemy data and formats it in a message
        /* @ts-ignore */
        return messages[item.event.type][item.idx](item.event);
      })}
      <POddStyle>The enemy has reached the gates of {townName}!</POddStyle>
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
