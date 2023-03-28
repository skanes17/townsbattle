import { Unit } from "../types";
import { Matchups } from "../types/conditionalsInCombat";

export function determineMatchups(
  selectedFriendly: Unit,
  selectedEnemy: Unit
): Matchups {
  return {
    onlyTheFriendlyHitsFirst:
      selectedFriendly.hitsFirst && !selectedEnemy.hitsFirst,
    onlyTheEnemyHitsFirst:
      selectedEnemy.hitsFirst && !selectedFriendly.hitsFirst,
    unitsHitSimultaneously:
      selectedFriendly.hitsFirst === selectedEnemy.hitsFirst,
  };
}
