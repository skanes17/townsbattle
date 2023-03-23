import React, { ReactNode } from "react";

interface MenuBoxProps {
  // TODO: DRY
  icon: "▶️" | "🆕" | "💾" | "🏆" | "🔧" | "❓" | "⭐";
  headerText: string;
  children: ReactNode;
}

export default function MenuBox({ icon, headerText, children }: MenuBoxProps) {
  return (
    <div className="fixed inset-0 z-50 text-sm sm:text-base">
      {/*
    allows user to click outside to close the modal when paired with an onClick event
    <div className="fixed inset-0 h-full w-full bg-black opacity-40"></div>
    */}
      <div className="flex min-h-screen items-center bg-black/25 px-4 py-8 backdrop-blur-[2px]">
        <div className="relative mx-auto max-h-[70vh] w-full max-w-lg overflow-y-auto rounded-lg border-2 border-zinc-600 bg-zinc-800 p-4 shadow-lg sm:h-auto sm:max-w-xl">
          <div className="mt-3 max-h-[80%] p-2 sm:flex sm:max-h-[90%]">
            <div className="mx-auto flex h-12 w-12 flex-none items-center justify-center rounded-full bg-blue-100">
              {icon}
            </div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 className="text-base font-medium sm:text-lg">{headerText}</h4>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
