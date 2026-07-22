import "./styles/AdminNavbar.css";
import { Link } from "react-router-dom";

function AdminNavbar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="admin-navbar">
      <h2>Admin Dashboard</h2>

      <div className="admin-navbar-right">
        <Link to="/" className="back-site-btn">
          🏠 Website
        </Link>

        <div className="admin-user">Welcome, {user?.name}</div>
      </div>
    </header>
  );
}

export default AdminNavbar;
