export interface NavButtons {
  [key: string]: {
    active: boolean;
    bgImage: string;
  };
}

export type NavButtonType =
  | "score"
  | "resources"
  | "training"
  | "army"
  | "tips"
  | "planning";
