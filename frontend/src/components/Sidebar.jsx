import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaLightbulb,
  FaRoute,
  FaChartBar,
  FaRobot,
  FaUserFriends,
  FaCalendarCheck,
  FaUser,
  FaCog,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Assessment", path: "/assessment", icon: <FaClipboardList /> },
    { name: "Recommendations", path: "/recommendations", icon: <FaLightbulb /> },
    { name: "Roadmap", path: "/roadmap", icon: <FaRoute /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
    { name: "AI Coach", path: "/ai-coach", icon: <FaRobot /> },
    { name: "Coaches", path: "/coaches", icon: <FaUserFriends /> },
    { name: "Booking", path: "/booking", icon: <FaCalendarCheck /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "CBC", path: "/cbc", icon: <FaGraduationCap /> },
    { name: "Parents", path: "/parent-portal", icon: <FaUsers /> },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">C</div>
        <div className="logo">
          <h2>Career<span>Compass</span></h2>
          <p>Student workspace</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer-dot" />
        <div>
          <strong>Profile in progress</strong>
          <small>82% complete</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
