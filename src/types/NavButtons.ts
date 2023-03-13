export interface NavButtons {
  [key: string]: {
    active: boolean;
    bgImage: string;
    tipSeen: boolean;
  };
}

export type NavButtonType =
  | "score"
  | "resources"
  | "training"
  | "buildings"
  | "army"
  | "tips"
  | "planning";
