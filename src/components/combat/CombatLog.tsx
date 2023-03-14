import React, { useState, MouseEvent } from "react";
import { CombatEvent } from "../../types";
import POddStyle from "./POddStyle";
import { messages } from "./Messages";

interface CombatLogProps {
  combatEvents: CombatEvent[];
  townName: string;
}

export default function CombatLog({ combatEvents, townName }: CombatLogProps) {
  return (
    <div className="h-full max-h-full w-full select-text self-center overflow-y-auto rounded-lg bg-gray-500/10 p-4">
      {combatEvents.map((item) => {
        // the item event type is "preCombat", "combat", etc
        // item index is which message to choose from the list of these events
        // item.event takes an item holding friendly+enemy data and formats it in a message
        /* @ts-ignore */
        return messages[item.event.type][item.idx](item.event);
      })}
      {/* FIXME: Replace with a pop-up when combat starts */}
      <p>The enemy has reached the gates of {townName}!</p>
    </div>
  );
}
