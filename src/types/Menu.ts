export interface MenuItemProps {
  text: "Start" | "Leaderboard" | "Options" | "How to Play" | "About";
  /* TODO: Replace with image */
  icon: "▶️" | "🏆" | "🔧" | "❓" | "⭐";
  onClick?: any;
}

export type MenuIcon = Pick<MenuItemProps, "icon">;
