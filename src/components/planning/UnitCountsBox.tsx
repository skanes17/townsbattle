import { BaseUnitData, UnitCounts, UnitType } from "../../types";
import { calcTotalUnitCount } from "../../utils/calcTotalUnitCount";

interface UnitCountsBoxProps {
  headerText: string;
  headerTextColor: "red" | "amber" | "green" | "blue";
  BASE_UNIT_DATA: BaseUnitData;
  unitCounts: UnitCounts;
  unitTypes: (UnitType | undefined)[];
}

export default function UnitCountsBox({
  headerText,
  headerTextColor,
  BASE_UNIT_DATA,
  unitCounts,
  unitTypes,
}: UnitCountsBoxProps) {
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

  const totalUnitCount = calcTotalUnitCount(unitCounts);

  /* FIXME: unitType assertions below */
  return (
    <>
      <div className="grid auto-rows-min">
        <p className="text-center">
          <span className={`${textColor}`}>{headerText}</span>:{" "}
          {unitCounts.total ?? totalUnitCount}
        </p>
        {/* BODY */}

        {unitTypes!.map((unitType) => {
          const bg = BASE_UNIT_DATA[unitType as UnitType].bgImageSm ?? ``;
          // only show unit types that were defeated
          return (
            unitCounts[unitType as UnitType as UnitType] > 0 && (
              <div className="mt-1 inline-flex capitalize">
                <div
                  className={`group mr-2 h-7 w-7 rounded-lg border border-zinc-700 group-hover:border-yellow-300 sm:h-8 sm:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
                ></div>
                <span className="group-hover:text-yellow-300">
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

{
  /* <div className="grid h-7 auto-rows-min align-middle sm:h-8 lg:h-9">
  <p>
    <span className={`${textColor}`}>{headerText}</span>:{" "}
    {unitCounts.total ?? totalUnitCount}
  </p>

  {unitTypes!.map((unitType) => {
    const bg: string = BASE_UNIT_DATA[unitType!].bgImageSm;
    return (
      unitCounts[unitType!] > 0 && (
        <>
          <div
            className={`h-7 w-7 rounded-lg border border-zinc-700 group-hover:border-yellow-300 sm:h-8 sm:w-8 lg:h-9 lg:w-9 ${bg} bg-cover bg-center`}
          ></div>
          <span className="text-right group-hover:text-yellow-300">
            {unitCounts[unitType!]} {unitType}
            {unitCounts[unitType!] > 1 && `s`}
          </span>
        </>
      )
    );
  })}
</div> */
}
