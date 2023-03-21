import {
  activeNavButtonsData,
  buildingsData,
  defaultPlayerName,
  defaultTownName,
  resourceData,
  resourcePoolData,
  tipsSeenData,
} from ".";
import { GameState } from "../types";

export const defaultGameState: GameState = {
  devTools: false,
  score: 0,
  playerName: defaultPlayerName,
  townName: defaultTownName,
  difficulty: "normal",
  tutorials: true,
  turn: 1,
  nextCombatTurn: 1,
  numberOfCombatsStarted: 0,
  inCombat: false,
  resources: resourceData,
  resourcePool: resourcePoolData,
  buildings: buildingsData,
  friendlyUnits: [],
  friendlyTrainingUnits: [],
  enemyUnits: [],
  unitId: 0,
  activeNavButtons: activeNavButtonsData,
  tipsSeen: tipsSeenData,
};
