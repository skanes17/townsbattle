import { Unit } from "../../types/Unit";

interface CombatCardFooterProps {
  unit: Unit;
}

export default function CombatCardFooter({ unit }: CombatCardFooterProps) {
  /* FIXME: Get this higher up in the chain to flow down, DRY */
  const percentHealth = (unit.currentHealth / unit.maxHealth) * 100;

  let healthTextColor;
  if (percentHealth <= 25) {
    healthTextColor = "text-red-700";
  } else if (percentHealth <= 50) {
    healthTextColor = "text-red-400";
  } else if (percentHealth <= 75) {
    healthTextColor = "text-orange-600";
  }

  return (
    <div className="grid-cols-auto grid w-full grid-cols-3 justify-between">
      <div className={`grid-rows-auto col-start-1 grid text-center`}>
        <p>🗡️</p>
        {/* special styling for attack bonus */}
        {unit.currentHealth === unit.maxHealth &&
        unit.fullHealthAttackBonus > 0 ? (
          <p className="text-amber-400">
            {unit.attack + unit.fullHealthAttackBonus}
          </p>
        ) : (
          <p>{unit.attack}</p>
        )}
      </div>
      {unit.armor > 0 ? (
        <div className={`grid-rows-auto col-start-2 grid text-center`}>
          <p>🛡️</p> <p>{unit.armor}</p>
        </div>
      ) : null}

      {/* TODO: REMOVE?? Health on Card -- Conditional green for full, orange for damaged, red for critical */}
      <div className={`grid-rows-auto col-start-3 grid text-center`}>
        <p>❤️</p>
        <p>
          <span className={`${healthTextColor}`}>{unit.currentHealth}</span>
          <span className="text-[0.33rem] sm:text-xs md:text-base lg:text-lg">
            /{unit.maxHealth}
          </span>
        </p>
      </div>
    </div>
  );
}
