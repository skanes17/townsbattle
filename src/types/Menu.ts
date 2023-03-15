export interface MenuItemProps {
  // routerLink expects a React Router Link to to={} such as "/play"
  routerLink?: string;
  text:
    | "Play"
    | "New Game"
    | "Load Game"
    | "Leaderboards"
    | "Options"
    | "How to Play"
    | "About";
  /* TODO: Replace with image? */
  icon: "▶️" | "🆕" | "💾" | "🏆" | "🔧" | "❓" | "⭐";
}

export type MenuText = Pick<MenuItemProps, "text">;
export type MenuIcon = Pick<MenuItemProps, "icon">;
