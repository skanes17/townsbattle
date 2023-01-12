export type Phase = "pre" | "combat" | "post";

export enum Phases {
  Pre,
  Combat,
  Post,
}

export type SubPhase = "fight" | "victoryCheck";

export enum SubPhases {
  Fight,
  Resolve,
  VictoryCheck,
}
