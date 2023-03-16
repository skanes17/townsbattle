import {
  Buildings,
  Difficulty,
  NavButtons,
  ResourcePool,
  Resources,
  TipsSeen,
  Unit,
} from ".";

export interface GameOptions {
  playerName: string;
  townName: string;
  difficulty: Difficulty;
  tutorials: boolean;
}

export interface GameState {
  devTools: boolean;
  score: number;
  playerName: string;
  townName: string;
  difficulty: Difficulty;
  tutorials: boolean;
  turn: number;
  nextCombatTurn: number;
  numberOfCombatsStarted: number;
  inCombat: boolean;
  resources: Resources;
  resourcePool: ResourcePool;
  buildings: Buildings;
  friendlyUnits: Unit[];
  friendlyTrainingUnits: Unit[];
  enemyUnits: Unit[];
  unitId: number;
  activeNavButtons: NavButtons;
  tipsSeen: TipsSeen;
}
