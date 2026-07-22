import { useEffect, useState } from "react";
import AdminLayout from "../../components/Admin/AdminLayout";
import RequestTable from "../../components/Admin/RequestTable";
import api from "../../services/api";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(res.data.requests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <AdminLayout>
      <h1>Blood Requests</h1>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <RequestTable
          requests={requests}
          refresh={fetchRequests}
        />
      )}
    </AdminLayout>
  );
}

export default Requests;