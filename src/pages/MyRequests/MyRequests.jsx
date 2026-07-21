import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MyRequests.css";
import toast from "react-hot-toast";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      await api.delete(`/requests/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchRequests();
      toast.success("Request deleted successfully.");
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to delete request.");
    }
  };

  const completeRequest = async (id) => {
    try {
      await api.put(
        `/requests/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchRequests();
      toast.success("Request marked as completed.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update request.");
    }
  };

  return (
    <div className="myrequests">
      <h1>📋 My Blood Requests</h1>

      {requests.length === 0 ? (
        <h3>No Requests Found</h3>
      ) : (
        requests.map((request) => (
          <div className="request-card" key={request._id}>
            <h2>{request.patientName}</h2>

            <p>
              <strong>Blood Group:</strong> {request.bloodGroup}
            </p>

            <p>
              <strong>Hospital:</strong> {request.hospital}
            </p>

            <p>
              <strong>City:</strong> {request.city}
            </p>

            <p>
              <strong>Status:</strong> {request.status}
            </p>

            {request.status === "Open" && (
              <button onClick={() => completeRequest(request._id)}>
                ✔ Mark Completed
              </button>
            )}

            <button
              className="delete-btn"
              onClick={() => deleteRequest(request._id)}>
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRequests;
