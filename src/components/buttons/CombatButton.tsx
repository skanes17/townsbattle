interface CombatButtonProps {
  buttonText: string;
  onClick: () => void;
}

export default function CombatButton({
  buttonText,
  onClick,
}: CombatButtonProps) {
  return (
    <button
      type="button"
      className="text-md h-8 w-16 rounded border border-white/40 bg-blue-600 font-bold text-white duration-75 hover:bg-blue-800 sm:h-12 sm:w-20 sm:text-lg md:h-16 md:w-24 md:text-2xl lg:h-20 lg:w-32 lg:text-3xl xl:h-24 xl:w-40
                   xl:text-4xl"
      onClick={() => onClick()}
    >
      {buttonText}
    </button>
  );
}
