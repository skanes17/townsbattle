export function calcTurnsToDelayCombat(
  nextCombatTurn: number,
  numberOfCombatsStartedUntilEnemyGenGetsDelayedByOne: number
) {
  const turnsAdded = Math.floor(
    (nextCombatTurn - 1) / numberOfCombatsStartedUntilEnemyGenGetsDelayedByOne
  );
  return turnsAdded;
}
