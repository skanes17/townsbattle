import {
  Buildings,
  Difficulty,
  NavButtons,
  ResourcePool,
  Resources,
  TipsSeen,
  TrainingUnit,
  Unit,
} from ".";

export interface GameSave {
  gameId?: string;
  timestamp?: string;
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
  friendlyTrainingUnits: TrainingUnit[];
  enemyUnits: Unit[];
  unitId: number;
  activeNavButtons: NavButtons;
  tipsSeen: TipsSeen;
}
