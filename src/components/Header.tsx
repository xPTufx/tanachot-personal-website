import { NavLink } from "react-router-dom";
import { useTheme } from "../theme";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <nav className="topbar-inner shell" aria-label="Top bar">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "topbar-link active" : "topbar-link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/works"
          className={({ isActive }) => (isActive ? "topbar-link active" : "topbar-link")}
        >
          My Works
        </NavLink>
        <button
          type="button"
          className="pill-btn topbar-theme"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </header>
  );
}
