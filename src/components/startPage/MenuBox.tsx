import React, { ReactNode } from "react";

interface MenuBoxProps {
  /* FIXME: Import this icon from the type -- DRY */
  icon: "▶️" | "🏆" | "🔧" | "❓" | "⭐";
  headerText: string;
  children: ReactNode;
}

export default function MenuBox({ icon, headerText, children }: MenuBoxProps) {
  return (
    <div className="fixed inset-0 z-10 text-sm sm:text-base">
      {/*
    allows user to click outside to close the modal when paired with an onClick event
    <div className="fixed inset-0 h-full w-full bg-black opacity-40"></div>
    */}
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto max-h-[70vh] w-full max-w-lg overflow-y-auto rounded-md bg-white p-4 shadow-lg sm:h-auto">
          <div className="mt-3 max-h-[80%] p-2 sm:flex sm:max-h-[90%]">
            <div className="mx-auto flex h-12 w-12 flex-none items-center justify-center rounded-full bg-blue-100">
              {icon}
            </div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 className="text-base font-medium text-gray-800 sm:text-lg">
                {headerText}
              </h4>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
