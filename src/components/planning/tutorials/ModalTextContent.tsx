import React, { ReactNode } from "react";

interface ModalTextContentProps {
  children: ReactNode;
}

export function ModalTextContent({ children }: ModalTextContentProps) {
  return <article className="mb-4 space-y-2 pb-4">{children}</article>;
}
