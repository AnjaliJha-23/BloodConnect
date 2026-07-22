import "./styles/AdminNavbar.css";

function AdminNavbar() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="admin-navbar">

      <h2>Admin Dashboard</h2>

      <div className="admin-user">
        Welcome, {user?.name}
      </div>

    </header>
  );
}

export default AdminNavbar;