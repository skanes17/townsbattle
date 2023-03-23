import { generateStars } from "../../utils";

interface BldgCardFooterProps {
  /* could add attack here */
  tier: number;
  currentHealth: number;
  maxHealth: number;
}

export default function BldgCardFooter({
  tier,
  currentHealth,
  maxHealth,
}: BldgCardFooterProps) {
  const percentHealth = (currentHealth / maxHealth) * 100;

  let healthTextColor = "text-white";
  if (percentHealth <= 25) {
    healthTextColor = "text-red-600";
  } else if (percentHealth < 100) {
    healthTextColor = "text-amber-600";
  }

  const tierDisplay = generateStars(tier);

  return (
    <div className="grid h-7 grid-flow-col gap-1 border-t border-white/10 pt-1 text-sm backdrop-blur-[2px] sm:h-8 sm:gap-2 sm:text-lg">
      <div className="relative rounded-tr-lg rounded-bl-lg bg-black/50 px-1 text-center text-white sm:text-xs">
        <div className="text-[0.5rem] sm:text-lg">
          <span className="font-emoji">{tierDisplay}</span>
        </div>
        {/* aligned to bottom of the container, then shifted up by its height */}
        <div className="absolute bottom-0 h-7 -translate-y-1/2 font-bold opacity-0 transition-all ease-in-out group-hover:opacity-100 sm:-translate-y-full sm:pl-2 sm:text-lg">
          Tier {tier}
        </div>
      </div>
      <div className="rounded-tl-lg rounded-br-lg bg-black/50 px-1 text-center text-white">
        <span className="font-emoji">❤️</span>
        <span
          className={`${
            percentHealth < 100 ? `font-semibold` : ``
          } ${healthTextColor}`}
        >
          {currentHealth}
        </span>
        <span className="text-[0.5rem] sm:text-sm">/{maxHealth}</span>
      </div>
    </div>
  );
}

{
  /* 
      <div className="rounded-lg bg-black/50 px-1 text-white"> */
}
/* ❤️<span className={`${healthTextColor}`}>{currentHealth}</span>
        <span className="text-xs sm:text-sm">/{maxHealth}</span>
      </div> */
