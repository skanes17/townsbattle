export type Phase = "pre" | "combat" | "post";

export enum Phases {
  PreCombat,
  Combat,
  PostCombat,
}

export type SubPhase = "fight" | "victoryCheck";

export enum SubPhases {
  Fight,
  VictoryCheck,
}
