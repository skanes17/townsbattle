import React from "react";

interface ModalHeaderProps {
  headerText: string;
}

export function ModalHeader({ headerText }: ModalHeaderProps) {
  return (
    <h2 className="mb-2 text-lg font-medium text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      {headerText}
    </h2>
  );
}
