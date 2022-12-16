import React from "react";
import { Phase } from "../../types/CombatPhases";

interface CombatLogProps {
  phase: Phase;
}

/* TODO: Send new text to the top */
/* TODO: Remove table formatting, make only the newest line colored amber. */
export default function CombatLog({ phase }: CombatLogProps) {
  return (
    <tbody className="col-span-12 col-start-1 row-start-1 aspect-video max-h-32 w-full self-center overflow-y-auto rounded-lg bg-gray-500/10 p-4 text-sm sm:col-span-4 sm:col-start-5 sm:row-span-2 sm:row-start-1 sm:h-5/6 sm:max-h-full sm:w-full sm:text-sm lg:text-lg xl:aspect-[5/3]">
      {phase === "pre" && (
        <>
          <tr className="py-1 text-white odd:bg-white/5">
            The enemy has reached the gates of Gabenfort.
          </tr>
          {/* TODO: Incorporate this feature. eg If you have a Tier 1 scout post, you get a message. */}
          <tr className="py-1 text-sky-400 odd:bg-white/5">
            Scouts say the chance of winning is about 85%.
          </tr>
        </>
      )}
      {phase === "combat" && (
        <>
          {" "}
          <tr className="py-1 text-white odd:bg-white/5">
            The enemy army has reached Gabenfort!
          </tr>
          {/* TODO: Use subphase "select" to represent units here */}
          <tr className="py-1 text-amber-400 odd:bg-white/5">
            Gary Longshanks (melee) faces off against Orga Thrung (tanky).
          </tr>
          <tr className="py-1 text-green-400  odd:bg-white/5">
            Gary Longshanks does 3 damage to the enemy tanky.
          </tr>
          <tr className="py-1 text-red-600  odd:bg-white/5">
            Orga Thrung retaliates with a savage 7 damage.
          </tr>
          <tr className="py-1 text-red-300  odd:bg-white/5">
            Gary Longshanks falls!
          </tr>
          <tr className="py-1 text-amber-400  odd:bg-white/5">
            Peter Whislequill (pewpew) faces off against Gygor Grunch(melee).
          </tr>
          <tr className="py-1 text-green-400">
            Peter Whislequill does 7 damage to Gygor Grunch.
          </tr>
          <tr className="py-1 text-red-500">
            Gygor takes a mean swing back at Peter Whistlequill, but misses!
          </tr>
          <tr className="py-1 text-amber-400">
            Both units survive and return to their armies.
          </tr>
        </>
      )}
      {phase === "post" && (
        <>
          <tr className="py-1 text-green-500 odd:bg-white/5">
            You defeated the enemy army and live to fight another day!
          </tr>
          <tr className="py-1 text-white odd:bg-white/5">
            You enemy has retreated but is already regrouping.
          </tr>
          <tr className="py-1 text-white odd:bg-white/5">
            Plan your next moves carefully and prepare for another wave!
          </tr>
        </>
      )}
    </tbody>
  );
}
