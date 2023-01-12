export type Phase = "pre" | "combat" | "post";

export enum Phases {
  Pre,
  Combat,
  Post,
}

export type Subphase = "fight" | "victoryCheck";

export enum SubPhases {
  Fight,
  Resolve,
  VictoryCheck,
}
