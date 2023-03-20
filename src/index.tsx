import { StrictMode, MouseEvent } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/App";

const handleRightClick = (event: MouseEvent<HTMLDivElement>) => {
  // prevent the default behavior of the right-click context menu
  event.preventDefault();
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <div
      className="routerBranch select-none bg-zinc-900 font-sans text-stone-200"
      onContextMenu={handleRightClick}
    >
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
