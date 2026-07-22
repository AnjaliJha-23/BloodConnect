import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import RequestTable from "../../components/Admin/RequestTable";
import api from "../../services/api";
import toast from "react-hot-toast";

const REQUESTS_PER_PAGE = 5;

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/admin/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/requests/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Request deleted successfully");

      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete request");
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/admin/requests/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Request marked as completed");

      fetchRequests();
    } catch (err) {
      console.error(err);
      toast.error("Unable to update request");
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(
      (request) =>
        request.patientName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        request.bloodGroup
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        request.hospital
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [requests, search]);

  const totalPages = Math.ceil(
    filteredRequests.length / REQUESTS_PER_PAGE
  );

  const indexOfLast = currentPage * REQUESTS_PER_PAGE;
  const indexOfFirst = indexOfLast - REQUESTS_PER_PAGE;

  const currentRequests = filteredRequests.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <AdminLayout>
      <div className="users-page">
        <div className="users-header">
          <h1>Blood Requests</h1>

          <p>Total Requests: {filteredRequests.length}</p>
        </div>

        <div className="admin-toolbar">
          <input
            type="text"
            className="admin-search"
            placeholder="Search patient, blood group or hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <RequestTable
              requests={currentRequests}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
                }
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default Requests;