import React from "react";

interface MenuButtonProps {
  buttonText: string;
  isSelected: boolean;
  buttonColor: "green" | "blue" | "red";
  onClick?: () => void;
}

export default function MenuButton({
  buttonText,
  isSelected,
  buttonColor,
  onClick,
}: MenuButtonProps) {
  /* TODO: Could colors and color numbers be made into variables, concatenated when used in cLassName? */
  let textStyle: string;
  let buttonColors: string;
  let bgColor;

  isSelected ? (textStyle = "text-white") : (textStyle = "text-gray-800");

  switch (buttonColor) {
    case "green":
      buttonColors = "ring-green-600 active:bg-green-500";
      bgColor = isSelected ? "bg-green-600" : null;
      break;
    case "blue":
      buttonColors = "ring-blue-600 active:bg-blue-500";
      bgColor = isSelected ? "bg-blue-600" : null;
      break;
    case "red":
      buttonColors = "ring-red-600 active:bg-red-500";
      bgColor = isSelected ? "bg-red-600" : null;
      break;
  }

  return (
    <>
      <button
        type="button"
        className={`w-full flex-1 rounded-md border ${bgColor} ${buttonColors} ${textStyle} p-2.5 outline-none ring-offset-2 `}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
}
