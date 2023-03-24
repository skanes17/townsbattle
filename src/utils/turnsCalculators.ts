import { Difficulty } from "../types";
import { randomNumberBetweenMinAndMax } from "./randomNumberBetweenMinAndMax";

export function calcPlanningTurnsUntilArmyGen(difficulty: Difficulty): number {
  // enemy will not be generated before reaching this turn number
  let planningTurnsUntilArmyGen;
  switch (difficulty) {
    case "easy":
      planningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(4, 6);
      break;
    case "normal":
      planningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(3, 4);
      break;
    case "hard":
      planningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(3, 4);
      break;
    case "nightmare":
      planningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(3, 4);
      break;
    default:
      planningTurnsUntilArmyGen = randomNumberBetweenMinAndMax(3, 4);
      break;
  }
  return planningTurnsUntilArmyGen;
}

export function calcTurnsBetweenArmyGenAndCombat(
  difficulty: Difficulty
): number {
  // how long to wait to start combat after enemies are generated
  let turnsBetweenEnemyArmyGenAndCombat;
  switch (difficulty) {
    case "easy":
      turnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(3, 4);
      break;
    case "normal":
      turnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(2, 3);
      break;
    case "hard":
      turnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(2, 3);
      break;
    case "nightmare":
      turnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(1, 2);
      break;
    default:
      turnsBetweenEnemyArmyGenAndCombat = randomNumberBetweenMinAndMax(2, 3);
      break;
  }
  return turnsBetweenEnemyArmyGenAndCombat;
}
