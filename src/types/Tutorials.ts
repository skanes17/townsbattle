import { ReactNode } from "react";

export interface Tutorials {
  [sectionType: string]: {
    category: string;
    tutorial: ReactNode;
  };
}
