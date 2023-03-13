import React from "react";

interface TutorialModalHeaderProps {
  headerText: string;
}

export default function TutorialModalHeader({
  headerText,
}: TutorialModalHeaderProps) {
  return (
    <h4 className="text-lg font-medium text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
      {headerText}
    </h4>
  );
}
