import { AoeOnDeathEvent, Unit } from "../types";

export function produceBombirdAoeOnDeathEvent(
  destroyedUnit: Unit,
  opposingUnit: Unit,
  indexesOfUnitsAffectedByAoeDamage: number[],
  randomNamesOfUnitsAffectedByAoeDamage: string[]
) {
  const { randomName, damageToOpponentOnDeath, areaOfEffectDamageOnDeath } =
    destroyedUnit;

  const { randomName: randomNameOfOpposingUnit } = opposingUnit;

  const aoeOnDeathEvent: AoeOnDeathEvent = {
    type: "aoeOnDeath",
    data: {
      destroyedUnit: {
        randomName,
        damageToOpponentOnDeath,
        areaOfEffectDamageOnDeath,
      },
      opposingUnit: { randomName: randomNameOfOpposingUnit },
      numberOfUnitsAffected: indexesOfUnitsAffectedByAoeDamage.length,
      randomNamesOfUnitsAffectedByAoeDamage,
    },
  };

  // bombird aoe event index
  const eventIndex = 0;

  const bombirdCombatState = { event: aoeOnDeathEvent, idx: eventIndex };
  return bombirdCombatState;
}
