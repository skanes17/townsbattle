export default interface StartState {
  onStartPage: boolean;
  townName: string;
  defaultTownName: string;
  difficulty: Difficulty;
  tutorials: boolean;
}

export type Difficulty = "easy" | "normal" | "hard";
