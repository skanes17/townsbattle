import { ReactNode } from "react";

export interface TipsSeen {
  [tutorialCategory: string]: boolean;
}

export type TutorialCategory =
  | "score"
  | "resources"
  | "training"
  | "buildings"
  | "army"
  | "tips"
  | "planning"
  | "combat";

export interface Tutorials {
  [sectionType: string]: {
    category: string;
    tutorial: ReactNode;
  };
}
