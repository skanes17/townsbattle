import React from "react";
import { Unit } from "../../types/Unit";
import CombatCardFooter from "./CombatCardFooter";
import CombatCardHeader from "./CombatCardHeader";
import CombatCardSymbol from "./CombatCardSymbol";

interface CombatCardTemplateProps {
  unit: Unit;
}

export default function CombatCardTemplate({ unit }: CombatCardTemplateProps) {
  return (
    <div className="grid h-full w-full auto-rows-auto grid-cols-3 gap-1 rounded-md border-4 border-blue-900 bg-white/5 p-2 text-white shadow-md shadow-gray-500/50">
      <CombatCardHeader unit={unit} />
      <CombatCardSymbol unit={unit} />
      <CombatCardFooter unit={unit} />
    </div>
  );
}
