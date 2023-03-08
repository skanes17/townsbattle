import { BaseUnit, UnitCounts, UnitType } from "../../types";

interface PostCombatUnitsStatBoxProps {
  headerText: string;
  headerTextColor: "red" | "amber" | "green" | "blue";
  BASE_UNIT_DATA: BaseUnit;
  unitCounts: UnitCounts;
  unitTypes: (UnitType | undefined)[];
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

  const totalUnitCount = Object.values(unitCounts).reduce(
    (acc, cur) => acc + cur,
    0
  );

  /* FIXME: unitType assertions below */
  return (
    <>
      <div className="grid auto-rows-min">
        <p>
          <span className={`${textColor}`}>{headerText}</span>:{" "}
          {unitCounts.total ?? totalUnitCount}
        </p>
        {/* BODY */}
        {unitTypes!.map((unitType) => {
          // only show unit types that were defeated
          return (
            unitCounts[unitType!] > 0 && (
              <p className="ml-2">
                {BASE_UNIT_DATA[unitType!].symbol} {unitCounts[unitType!]}{" "}
                {unitType}
                {unitCounts[unitType!] > 1 && `s`}
              </p>
            )
          );
        })}
      </div>
    </>
  );
}
