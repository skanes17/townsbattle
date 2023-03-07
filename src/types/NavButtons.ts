export interface NavButtons {
  [key: string]: {
    active: boolean;
    bgImage: string;
  };
}

export type NavButtonType =
  | "score"
  | "resources"
  | "units"
  | "army"
  | "tips"
  | "planning";
