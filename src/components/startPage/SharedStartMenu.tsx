import { Link, Outlet } from "react-router-dom";
import { routerLinkStyle } from "../../tailwindStyles/RouterLinkStyle";
import { MenuItem, MenuTitle } from "../startPage";

export default function SharedStartMenu() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-mainMenu bg-contain bg-center bg-no-repeat">
        <div className="m-1 grid auto-rows-min place-items-center gap-1 rounded-3xl p-4 shadow-inherit">
          <MenuTitle title="Townsbattle" subtitle="Rise of the Defenders" />
          <Link className={routerLinkStyle} to="/newGame">
            <MenuItem text="New Game" icon="🆕" />
          </Link>
          <Link className={routerLinkStyle} to="/leaderboard">
            <MenuItem text="Leaderboard" icon="🏆" />
          </Link>
          <Link className={routerLinkStyle} to="/options">
            <MenuItem text="Options" icon="⚙️" />
          </Link>
          <Link className={routerLinkStyle} to="/loadGame">
            <MenuItem text="Load Game" icon="💾" />
          </Link>
          {/* <Link className={routerLinkStyle} to="/howtoplay">
              <MenuItem text="How to Play" icon="❓" />
            </Link> */}
          {/* <Link className={routerLinkStyle} to="/about">
              <MenuItem text="About" icon="⭐" />
            </Link> */}
        </div>
      </div>
      {/* Outlet allows for shared components/structure for any child of the parent Route */}
      {/* Child components will render wherever you place Outlet */}
      <Outlet />
    </>
  );
}
