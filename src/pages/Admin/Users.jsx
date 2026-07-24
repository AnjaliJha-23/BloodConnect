import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import UserTable from "../../components/Admin/UserTable";
import api from "../../services/api";
import toast from "react-hot-toast";
import Loader from "../../components/Common/Loader";
import EmptyState from "../../components/Common/EmptyState";

const USERS_PER_PAGE = 5;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully");

      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete user");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;

  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  return (
    <AdminLayout>
      <div className="users-page">
        <div className="users-header">
          <h1>Users Management</h1>
          <p>Total Users: {filteredUsers.length}</p>
        </div>

        <div className="admin-toolbar">
          <input
            type="text"
            className="admin-search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <Loader text="Loading..." />
        ) : currentUsers.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No Users Found"
            message="Try changing your search."
          />
        ) : (
          <>
            <UserTable users={currentUsers} onDelete={handleDelete} />

            <div className="pagination">
              {" "}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default Users;
