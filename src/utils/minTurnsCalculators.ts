import { Difficulty } from "../types";
import { randomNumberBetweenMinAndMax } from "./randomNumberBetweenMinAndMax";

export function calcMinPlanningTurnsUntilArmyGen(
  difficulty: Difficulty
): number {
  // enemy will not be generated before reaching this turn number
  let minPlanningTurnsUntilArmyGenn;
  switch (difficulty) {
    case "easy":
      minPlanningTurnsUntilArmyGenn = randomNumberBetweenMinAndMax(5, 8);
      break;
    case "normal":
      minPlanningTurnsUntilArmyGenn = randomNumberBetweenMinAndMax(4, 6);
      break;
    case "hard":
      minPlanningTurnsUntilArmyGenn = randomNumberBetweenMinAndMax(3, 5);
      break;
    case "nightmare":
      minPlanningTurnsUntilArmyGenn = randomNumberBetweenMinAndMax(3, 4);
      break;
    default:
      minPlanningTurnsUntilArmyGenn = randomNumberBetweenMinAndMax(4, 6);
      break;
  }
  return minPlanningTurnsUntilArmyGenn;
}

export function calcMinTurnsBetweenArmyGenAndCombat(
  difficulty: Difficulty
): number {
  // how long to wait to start combat after enemies are generated
  let minimumTurnsBetweenEnemyArmyGenAndCombat;
  switch (difficulty) {
    case "easy":
      minimumTurnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(
        4,
        6
      );
      break;
    case "normal":
      minimumTurnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(
        3,
        4
      );
      break;
    case "hard":
      minimumTurnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(
        2,
        4
      );
      break;
    case "nightmare":
      minimumTurnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(
        2,
        3
      );
      break;
    default:
      minimumTurnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(
        3,
        4
      );
      break;
  }
  return minimumTurnsBetweenEnemyArmyGenAndCombat;
}
