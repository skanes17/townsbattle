import { Difficulty } from "../types";
import { randomNumberBetweenMinAndMax } from "./randomNumberBetweenMinAndMax";

export function calcMinPlanningTurnsUntilArmyGen(
  difficulty: Difficulty
): number {
  // enemy will not be generated before reaching this turn number
  let minPlanningTurnsUntilArmyGen;
  switch (difficulty) {
    case "easy":
      minPlanningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(3, 4);
      break;
    case "normal":
      minPlanningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(2, 3);
      break;
    case "hard":
      minPlanningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(2, 3);
      break;
    case "nightmare":
      minPlanningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(1, 2);
      break;
    default:
      minPlanningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(2, 3);
      break;
  }
  return minPlanningTurnsUntilArmyGen;
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
