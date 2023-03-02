import { Unit } from "../../types/Unit";

interface CombatCardFooterProps {
  unit: Unit;
}

export default function CombatCardFooter({ unit }: CombatCardFooterProps) {
  /* FIXME: Get this higher up in the chain to flow down, DRY */
  const percentHealth = (unit.currentHealth / unit.maxHealth) * 100;

  let healthTextColor;
  if (percentHealth <= 25) {
    healthTextColor = "text-red-600";
  } else if (percentHealth <= 50) {
    healthTextColor = "text-orange-600";
  }

  return (
    <div className="col-span-3 flex justify-between">
      <div
        className={`self-end text-center text-xl sm:m-3 sm:text-2xl md:text-4xl lg:text-5xl`}
      >
        🗡️
        {/* special styling for attack bonus */}
        {unit.currentHealth === unit.maxHealth &&
        unit.fullHealthAttackBonus > 0 ? (
          <span className="text-amber-400">
            {unit.attack + unit.fullHealthAttackBonus}
          </span>
        ) : (
          unit.attack
        )}
      </div>
      {/* TODO: Conditional green for full, orange for damaged, red for critical */}
      <div
        className={`self-end text-center text-xl sm:m-3 sm:text-2xl md:text-4xl lg:text-5xl`}
      >
        ❤️<span className={`${healthTextColor}`}>{unit.currentHealth}</span>
        <span className="text-xs sm:text-sm md:text-base lg:text-lg">
          /{unit.maxHealth}
        </span>
      </div>
    </div>
  );
}
