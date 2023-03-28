import { AoeOnDeathEvent, Unit } from "../types";

export enum UnitDestroyed {
  Friendly,
  Enemy,
}

export function produceBombirdAoeOnDeathEvent(
  unitDestroyed: UnitDestroyed,
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

  let eventIndex;
  // bombird aoe event index
  switch (unitDestroyed) {
    case UnitDestroyed.Friendly:
      eventIndex = 0;
      break;
    case UnitDestroyed.Enemy:
      eventIndex = 1;
      break;
  }

  const bombirdCombatState = { event: aoeOnDeathEvent, idx: eventIndex };
  return bombirdCombatState;
}
