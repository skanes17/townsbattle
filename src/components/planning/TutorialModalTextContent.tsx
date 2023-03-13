import React, { ReactNode } from "react";

interface TutorialModalTextContentProps {
  children: ReactNode;
}

export default function TutorialModalTextContent({
  children,
}: TutorialModalTextContentProps) {
  return <div className="space-y-2">{children}</div>;
}
