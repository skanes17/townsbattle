interface AutoButtonProps {
  buttonText: "Auto";
  onClick: () => void;
}

export default function AutoButton({ buttonText, onClick }: AutoButtonProps) {
  return (
    <button
      type="button"
      className="h-6 w-10 rounded bg-red-600 text-sm font-bold text-white shadow-md shadow-red-600/50 duration-75 hover:bg-red-800 sm:h-6 sm:w-12 sm:text-sm md:h-10 md:w-20 md:text-base lg:h-12 lg:w-20 lg:text-xl xl:h-14 xl:w-24
                   xl:text-2xl"
      onClick={() => onClick()}
    >
      {buttonText}
    </button>
  );
}
