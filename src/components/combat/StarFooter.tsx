import React from "react";

interface StarDisplayProps {
  combatsSurvivedOrTierNumber: number;
}

export function StarDisplay({ combatsSurvivedOrTierNumber }: StarDisplayProps) {
  const numberOfStars = combatsSurvivedOrTierNumber;
  const survivalIcon = "⭐";
  // const stars = Array(numberOfStars ?? 0).fill(survivalIcon);
  // If tier is less than 4, show the stars. Otherwise show one star and the number
  const starDisplay =
    (numberOfStars ?? 0) < 4 ? (
      <p>
        {Array(numberOfStars ?? 0)
          .fill(survivalIcon)
          .join("")}
      </p>
    ) : (
      <>
        <span className="font-emoji">{survivalIcon}</span>
        <span>{numberOfStars}</span>
      </>
    );

  return <>{starDisplay}</>;
}
