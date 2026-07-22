import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

import "./styles/AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        <AdminNavbar />

        <main className="admin-main">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;