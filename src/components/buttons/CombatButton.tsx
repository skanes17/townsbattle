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
      className="text-md h-8 w-full rounded bg-blue-600 font-bold text-white shadow-md shadow-blue-600/50 duration-75 hover:bg-blue-800 sm:h-12 sm:text-lg md:h-16 md:text-2xl lg:h-20 lg:text-3xl xl:h-24
                   xl:text-4xl"
      onClick={() => onClick()}
    >
      {buttonText}
    </button>
  );
}
