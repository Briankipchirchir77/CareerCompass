import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme";
import { UserContext } from "../context/userContext";
import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    navigate(`/recommendations?q=${encodeURIComponent(term)}`);
    setQuery("");
  }

  function handleLogout() {
    logout();
    setShowProfileMenu(false);
    navigate("/login");
  }

  const displayName = user?.name || "Future Star";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="navbar">
      <div className="navbar-intro">
        <p className="eyebrow">Student portal</p>
        <h2>Hello, {displayName}</h2>
      </div>

      <div className="navbar-actions">
        <form className="search-box" onSubmit={handleSearch} role="search">
          <FaSearch />
          <label className="sr-only" htmlFor="site-search">Search careers and pathways</label>
          <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search careers, pathways..." />
        </form>

        <div className="navbar-right">
          <button className="notification-btn" onClick={toggleTheme} aria-label="Toggle color theme">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button className="notification-btn" type="button" onClick={() => setShowNotifications((visible) => !visible)} aria-label="Show notifications" aria-expanded={showNotifications}>
            <FaBell />
            <span className="notification-badge">3</span>
          </button>

          <div className="profile-menu-wrapper">
            <button
              type="button"
              className="profile-menu"
              onClick={() => setShowProfileMenu((visible) => !visible)}
              aria-expanded={showProfileMenu}
              aria-label="Open profile menu"
            >
              <div className="profile-avatar">{initials}</div>
              <div>
                <strong>{displayName}</strong>
                <p>Career explorer</p>
              </div>
            </button>

            {showProfileMenu ? (
              <div className="profile-dropdown" role="menu">
                <button type="button" className="profile-dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt /> Log out
                </button>
              </div>
            ) : null}
          </div>

          {showNotifications ? (
            <div className="notification-menu" role="status">
              <strong>Updates</strong>
              <p>Your coach session is this Thursday.</p>
              <p>New recommendations are ready to review.</p>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;