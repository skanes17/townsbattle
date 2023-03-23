import { ReactNode } from "react";
import { GameSave } from "../../types";
import { SaveFileLink } from "./SaveFileLink";

interface SaveFileLinkContainerProps {
  children: ReactNode;
}

export function SaveFileLinkContainer({
  children,
}: SaveFileLinkContainerProps) {
  return <div className="grid-rows-auto mt-2 grid">{children}</div>;
}
