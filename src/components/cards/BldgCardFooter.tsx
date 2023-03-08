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
  return (
    /* FIXME: Text breaking on mobile */
    <div className="grid h-7 auto-cols-auto grid-cols-3  gap-1 border-t border-white/10 pt-1 text-xs backdrop-blur-sm sm:h-8 sm:gap-2 sm:text-lg">
      <div></div>
      <div className="flex items-center justify-center rounded-t-lg bg-black/50 px-1 text-white">
        Tier {tier}
      </div>
      <div className="flex items-center justify-center rounded-lg bg-black/50 px-1 text-white">
        {/* TODO: Make this health change color when damaged (like army grid colors) */}
        ❤️{currentHealth}
      </div>
    </div>
  );
}
