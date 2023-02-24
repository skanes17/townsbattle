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
    <div className="grid auto-cols-auto grid-cols-3 gap-2 border-t border-white/10 pt-1 backdrop-blur-sm">
      <div></div>
      <div className="text-md flex items-center justify-center rounded-t-lg bg-black/50 px-1 text-white">
        Tier {tier}
      </div>
      <div className="text-md flex items-center justify-center rounded-lg bg-black/50 px-1 text-white">
        {/* TODO: Make this health change color when damaged (like army grid colors) */}
        ❤️{currentHealth}
      </div>
    </div>
  );
}
