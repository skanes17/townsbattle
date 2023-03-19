import { Unit } from "../types";

export const addSurvivalPointsToSurvivingUnits = (survivingUnits: Unit[]) => {
  const updatedUnits = survivingUnits.map((unit) => {
    if (unit.combatsSurvived) {
      return { ...unit, combatsSurvived: unit.combatsSurvived + 1 };
    } else return { ...unit, combatsSurvived: 1 };
  });
  return updatedUnits;
};
