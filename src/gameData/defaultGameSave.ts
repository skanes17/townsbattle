import { GameSave } from "../types";
import { buildingsData } from "./buildings";
import { defaultPlayerName, defaultTownName } from "./names";
import { activeNavButtonsData } from "./navButtonsData";
import { resourceData, resourcePoolData } from "./resources";
import { tipsSeenData } from "./tipsSeenData";

export const defaultGameSave: GameSave = {
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
