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
        <p className={`font-bold ${textColor}`}>{headerText}</p>
        <p className="ml-2 font-semibold">
          {unitCounts.total ?? totalUnitCount} total
        </p>
        {/* BODY */}

        {unitTypes!.map((unitType) => {
          const bg = BASE_UNIT_DATA[unitType as UnitType].bgImageSm ?? ``;

          // only show unit types that were defeated
          return (
            unitCounts[unitType!] > 0 && (
              <div className="mt-1 inline-flex flex-wrap capitalize sm:flex-nowrap">
                <div
                  className={`group mr-2 h-7 w-7 rounded-lg border border-zinc-700 sm:h-8 sm:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
                ></div>
                <span>
                  {unitCounts[unitType as UnitType]} {unitType}
                  {unitCounts[unitType as UnitType] > 1 && `s`}
                </span>
              </div>
            )
          );
        })}
      </div>
    </>
  );
}