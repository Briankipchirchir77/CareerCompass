import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme";
import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    navigate(`/recommendations?q=${encodeURIComponent(term)}`);
    setQuery("");
  }

  return (
    <header className="navbar">
      <div className="navbar-intro">
        <p className="eyebrow">Student portal</p>
        <h2>Welcome back, Jason</h2>
      </div>

      <div className="navbar-actions">
        <form className="search-box" onSubmit={handleSearch} role="search">
          <FaSearch />
          <label className="sr-only" htmlFor="site-search">Search careers and universities</label>
          <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search careers, universities..." />
        </form>

        <div className="navbar-right">
          <button className="notification-btn" onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button className="notification-btn" type="button" onClick={() => setShowNotifications((visible) => !visible)} aria-label="Show notifications" aria-expanded={showNotifications}>
            <FaBell />
            <span className="notification-badge">3</span>
          </button>

          <div className="profile-menu">
            <div className="profile-avatar">JJ</div>

            <div>
              <strong>Jason Jace</strong>
              <p>Student</p>
            </div>
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
