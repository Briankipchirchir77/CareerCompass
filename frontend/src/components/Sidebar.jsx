import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        Career<span>Compass</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Dashboard
        </NavLink>
        <NavLink to="/assessment" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Assessment
        </NavLink>
        <NavLink to="/recommendations" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Recommendations
        </NavLink>
        <NavLink to="/roadmap" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Roadmap
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Analytics
        </NavLink>
        <NavLink to="/ai-coach" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          AI Coach
        </NavLink>
        <NavLink to="/coaches" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Human Mentors
        </NavLink>

        <hr style={{ border: "0.5px solid rgba(255,255,255,0.1)", margin: "12px 0" }} />

        <NavLink to="/cbc" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          CBC Portal
        </NavLink>
        <NavLink to="/parent-portal" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Parent Portal
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Profile
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}