import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        <span className="sidebar-icon">⌂</span>
        <p>Home</p>
      </NavLink>

      <NavLink
        to="/devices"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        <span className="sidebar-icon">▣</span>
        <p>Devices</p>
      </NavLink>

      <NavLink
        to="/rooms"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        <span className="sidebar-icon">▦</span>
        <p>Rooms</p>
      </NavLink>

      <NavLink
        to="/automation"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        <span className="sidebar-icon">⚙</span>
        <p>Automation</p>
      </NavLink>

      <NavLink
        to="/energy"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        <span className="sidebar-icon">⚡</span>
        <p>Energy</p>
      </NavLink>

      <NavLink
        to="/logs"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        <span className="sidebar-icon">◷</span>
        <p>Logs</p>
      </NavLink>
    </aside>
  );
}