import "./styles/RequestTable.css";
import { useState } from "react";

function RequestTable({ requests, onDelete, onComplete }) {
  const [selectedResponses, setSelectedResponses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Blood</th>
            <th>Hospital</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Responses</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.patientName}</td>

              <td>{request.bloodGroup}</td>

              <td>{request.hospital}</td>

              <td>{request.createdBy?.name || "Unknown"}</td>

              <td>
                <span
                  className={
                    request.status === "Completed"
                      ? "status-completed"
                      : "status-open"
                  }>
                  {request.status}
                </span>
              </td>

              <td>
                <button
                  className="view-response-btn"
                  onClick={() => {
                    setSelectedResponses(request.responses || []);
                    setShowModal(true);
                  }}>
                  View ({request.responses?.length || 0})
                </button>
              </td>

              <td>
                {request.status === "Open" && (
                  <button
                    className="complete-btn"
                    onClick={() => onComplete(request._id)}>
                    Complete
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => onDelete(request._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="response-modal-overlay">
          <div className="response-modal">
            <h2>Donor Responses</h2>

            {selectedResponses.length === 0 ? (
              <p>No donor has responded yet.</p>
            ) : (
              selectedResponses.map((donor) => (
                <div key={donor._id} className="response-card">
                  <h4>{donor.name}</h4>

                  <p>
                    <strong>Email:</strong> {donor.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {donor.phone}
                  </p>

                  <p>
                    <strong>Blood Group:</strong> {donor.bloodGroup}
                  </p>
                </div>
              ))
            )}

            <button
              className="close-btn"
              onClick={() => {
                setShowModal(false);
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

export default RequestTable;
