import { BaseUnit, UnitCounts, UnitType } from "../../types";

interface PostCombatUnitsStatBoxProps {
  headerText: string;
  headerTextColor: "red" | "amber" | "green" | "blue";
  BASE_UNIT_DATA: BaseUnit;
  unitCounts: UnitCounts;
  unitTypes: UnitType[];
}

export default function PostCombatUnitsStatBox({
  headerText,
  headerTextColor,
  BASE_UNIT_DATA,
  unitCounts,
  unitTypes,
}: PostCombatUnitsStatBoxProps) {
  let textColor;

  switch (headerTextColor) {
    case "red":
      textColor = "text-red-500";
      break;
    case "amber":
      textColor = "text-amber-500";
      break;
    case "green":
      textColor = "text-green-500";
      break;
    case "blue":
      textColor = "text-blue-500";
      break;
  }

  return (
    <>
      <div className="grid auto-rows-min">
        <p>
          <span className={`${textColor}`}>{headerText}</span>:{" "}
          {unitCounts.total}
        </p>
        {/* BODY */}
        {unitTypes.map((unitType) => {
          // only show unit types that were defeated
          return (
            unitCounts[unitType] > 0 && (
              <p className="ml-2">
                {BASE_UNIT_DATA[unitType].symbol} {unitCounts[unitType]}{" "}
                {unitType} (
                {Math.round((unitCounts[unitType] / unitCounts.total) * 100)}
                %)
              </p>
            )
          );
        })}
      </div>
    </>
  );
}
