import React from "react";
import { Unit } from "../../types/Unit";
import { UnitCounts } from "../../types/UnitCounts";

interface PreCombatCardTemplateProps {
  headerText: "Your Army" | "Enemy Army";
  army: Unit[];
  unitCounts: UnitCounts;
}

export default function CombatCardTemplate({
  headerText,
  army,
  unitCounts,
}: PreCombatCardTemplateProps) {
  return (
    <div className="grid h-full w-full auto-rows-auto grid-cols-1 place-items-center items-center gap-1 overflow-y-auto overflow-x-hidden rounded-md border-4 border-blue-900 bg-white/5 p-2 text-xs text-white shadow-md shadow-gray-500/50 sm:text-xl md:text-2xl lg:text-3xl">
      <p className="text-sm font-bold sm:text-2xl md:text-3xl lg:text-4xl">
        {headerText}
      </p>
      {/* TODO: Incorporate DRY here */}
      <p className="pl-2">⚔️ {unitCounts.melee} melee</p>
      <p className="pl-2">🏹 {unitCounts.pewpew} pewpew</p>
      <p className="pl-2">🛡️ {unitCounts.tanky} tanky</p>
      <p className="pl-2 opacity-50">
        ({unitCounts.melee + unitCounts.pewpew + unitCounts.tanky} total)
      </p>
    </div>
  );
}
