import { useEffect, useState } from "react";
import api from "../../services/api";
import "./MyRequests.css";
import toast from "react-hot-toast";
import EmptyState from "../../components/Common/EmptyState";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [showResponses, setShowResponses] = useState(false);

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
        <EmptyState
          icon="🩸"
          title="No Blood Requests Yet"
          message="Create your first blood request to help patients find donors."
        />
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
            <button
              className="response-btn"
              onClick={() => {
                setSelectedResponses(request.responses || []);
                setShowResponses(true);
              }}>
              👥 View Responses ({request.responses?.length || 0})
            </button>

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
      {showResponses && (
        <div className="response-modal-overlay">
          <div className="response-modal">
            <h2>Donor Responses</h2>

            {selectedResponses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">❤️</div>

                <h3>No Donor Responses Yet</h3>

                <p>
                  Nobody has volunteered for this request yet. Once a donor
                  clicks "I Can Donate", they will appear here.
                </p>
              </div>
            ) : (
              selectedResponses.map((donor) => (
                <div key={donor._id} className="response-card">
                  <h3>{donor.name}</h3>

                  <p>
                    <strong>Blood Group:</strong> {donor.bloodGroup}
                  </p>

                  <p>
                    <strong>Email:</strong> {donor.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {donor.phone}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {donor.available ? "Available" : "Unavailable"}
                  </p>
                </div>
              ))
            )}

            <button
              className="close-btn"
              onClick={() => {
                setShowResponses(false);
                setSelectedResponses([]);
              }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRequests;
