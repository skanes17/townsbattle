export interface MenuItemProps {
  // routerLink expects a React Router Link to to={} such as "/play"
  routerLink?: string;
  text:
    | "Play"
    | "Leaderboards"
    | "Options"
    | "How to Play"
    | "About"
    | "Load Game";
  /* TODO: Replace with image */
  icon: "▶️" | "🆕" | "💾" | "🏆" | "🔧" | "❓" | "⭐";
}

export type MenuText = Pick<MenuItemProps, "text">;
export type MenuIcon = Pick<MenuItemProps, "icon">;
