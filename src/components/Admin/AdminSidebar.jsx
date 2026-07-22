import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaTint,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

import "./styles/AdminSidebar.css";

function AdminSidebar() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside className="admin-sidebar">

      <h2 className="admin-logo">
        BloodConnect
      </h2>

      <nav>

        <NavLink to="/admin">
          <FaChartBar />
          Dashboard
        </NavLink>

        <NavLink to="/admin/users">
          <FaUsers />
          Users
        </NavLink>

        <NavLink to="/admin/requests">
          <FaTint />
          Requests
        </NavLink>

        <NavLink to="/admin/analytics">
          <FaChartLine />
          Analytics
        </NavLink>

      </nav>

      <button
        onClick={logout}
        className="logout-btn"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </aside>
  );
}

export default AdminSidebar;