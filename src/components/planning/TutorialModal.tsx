import React, { Dispatch, ReactNode, SetStateAction } from "react";
import TutorialModalHeader from "./TutorialModalHeader";
import TutorialModalTextContent from "./TutorialModalTextContent";

interface TutorialModalProps {
  bgImage?: string;
  setShowTip: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

export default function TutorialModal({
  bgImage,
  setShowTip,
  children,
}: TutorialModalProps) {
  return (
    <div className="fixed inset-0 z-50 text-sm sm:text-base lg:text-xl xl:text-2xl">
      {/* allows user to click outside to close the modal when paired with an onClick event */}
      <div
        className="pointer-events-auto fixed inset-0 h-full w-full bg-black/50"
        /* turn off the tip after it's seen once */
        onClick={() => setShowTip(false)}
      ></div>

      <div className="flex min-h-screen items-center">
        <div className="relative mx-auto max-h-[70vh] w-full max-w-sm overflow-y-auto rounded-2xl border-2 border-zinc-600 bg-zinc-800/[98%] p-4 shadow-md sm:h-auto sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
          <div className="mt-3 max-h-[80%] p-2 sm:max-h-[90%]">
            {/* header and text content should go here, as components */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
