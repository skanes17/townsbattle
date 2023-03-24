import { Buildings } from "../../types";

interface PostCombatBldgStatBlockProps {
  headerText: string;
  headerTextColor: "red" | "amber" | "green" | "blue";
  buildings: Buildings;
}

export default function PostCombatBldgStatBox({
  headerText,
  headerTextColor,
  buildings,
}: PostCombatBldgStatBlockProps) {
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

  const damagedBuildings = Object.keys(buildings).filter(
    (key) => buildings[key].damage > 0
  );

  /* TODO: Add hover info on which units damaged the building? */
  return (
    <>
      <div className="grid auto-rows-min">
        {/* HEADER */}

        <p className={`font-bold ${textColor}`}>{headerText}</p>
        <p className={`ml-2 font-semibold`}>
          {(damagedBuildings.length ?? 0) > 0
            ? `${damagedBuildings.length} total`
            : `None!`}
        </p>
        {/* BODY */}
        {damagedBuildings.map((buildingType) => {
          // only show building types that were damaged
          return (
            buildings[buildingType].damage > 0 && (
              <div className="ml-2">
                {buildings[buildingType].name} ({buildings[buildingType].damage}{" "}
                dmg)
                {!buildings[buildingType].constructed ? (
                  <p className="ml-2 font-semibold text-red-400">Destroyed!</p>
                ) : null}
              </div>
            )
          );
        })}
      </div>
    </>
  );
}
