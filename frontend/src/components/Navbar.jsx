import React from "react";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="search-box">
        <input type="text" placeholder="Search careers, skills, roadmaps..." />
      </div>
      <div className="navbar-actions">
        <button className="notification-btn" aria-label="Notifications">
          🔔
          <span className="notification-badge">3</span>
        </button>
        <div className="profile-menu">
          <span>👤</span>
        </div>
      </div>
    </header>
  );
}