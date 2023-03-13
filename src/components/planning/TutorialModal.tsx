import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface TutorialModalProps {
  bgImage?: string;
  headerText: string;
  setShowTip: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function TutorialModal({
  bgImage,
  headerText,
  setShowTip,
  children,
}: TutorialModalProps) {
  return (
    <div className="fixed inset-0 z-50 text-sm sm:text-base lg:text-xl xl:text-2xl">
      {/* allows user to click outside to close the modal when paired with an onClick event */}
      <div
        className="fixed inset-0 h-full w-full bg-black/50"
        onClick={() => setShowTip((prev) => !prev)}
      ></div>

      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto max-h-[70vh] w-full max-w-sm overflow-y-auto rounded-2xl border-2 border-zinc-600 bg-zinc-800/[98%] p-4 shadow-md sm:h-auto  sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
          <div className="mt-3 max-h-[80%] p-2 sm:flex sm:max-h-[90%]">
            <div className="mx-auto flex h-12 w-12 flex-none items-center justify-center rounded-full bg-blue-100"></div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 className="text-lg font-medium text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                {headerText}
              </h4>
              <div className="space-x-2">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
