import { berserkerHealthTrigger } from "../../gameData";
import { Unit } from "../../types/Unit";
import { AttackValueType, calculatedAttackValue } from "../../utils";
import { allAttackBonusesCheck } from "../../utils/attackBonusCheck";

interface CombatCardFooterProps {
  unit: Unit;
}

export default function CombatCardFooter({ unit }: CombatCardFooterProps) {
  const {
    attack,
    currentHealth,
    maxHealth,
    armor,
    fullHealthBonus,
    fullHealthAttackBonus,
    berserker,
    berserkerAttackMultiplier,
  } = unit;

  /* FIXME: Get this higher up in the chain to flow down, DRY */
  const percentHealth = (currentHealth / maxHealth) * 100;

  let healthTextColor;
  if (percentHealth <= 25) {
    healthTextColor = "text-red-700";
  } else if (percentHealth <= 50) {
    healthTextColor = "text-red-400";
  } else if (percentHealth <= 75) {
    healthTextColor = "text-orange-600";
  }

  const totalAttackValue = calculatedAttackValue(AttackValueType.card, unit);

  return (
    <div className="grid-cols-auto grid w-full grid-cols-3 justify-between">
      <div className={`grid-rows-auto col-start-1 grid text-center`}>
        <p className="font-emoji">🗡️</p>
        {allAttackBonusesCheck(unit) ? (
          <p className="font-semibold text-amber-400">{totalAttackValue}</p>
        ) : (
          <p>{totalAttackValue}</p>
        )}
      </div>
      {armor > 0 ? (
        <div className={`grid-rows-auto col-start-2 grid text-center`}>
          <p className="font-emoji">🛡️</p> <p>{armor}</p>
        </div>
      ) : null}

      <div className={`grid-rows-auto col-start-3 grid text-center`}>
        <p className="font-emoji">❤️</p>
        <p>
          <span className={`${healthTextColor}`}>{currentHealth}</span>
          <span className="text-[0.5rem] sm:text-xs md:text-sm lg:text-lg">
            /{maxHealth}
          </span>
        </p>
      </div>
    </div>
  );
}
