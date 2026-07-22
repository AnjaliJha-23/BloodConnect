import "./styles/RequestTable.css";

function RequestTable({
  requests,
  onDelete,
  onComplete,
}) {
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.patientName}</td>

              <td>{request.bloodGroup}</td>

              <td>{request.hospital}</td>

              <td>
                {request.createdBy?.name || "Unknown"}
              </td>

              <td>
                <span
                  className={
                    request.status === "Completed"
                      ? "status-completed"
                      : "status-open"
                  }
                >
                  {request.status}
                </span>
              </td>

              <td>
                {request.status === "Open" && (
                  <button
                    className="complete-btn"
                    onClick={() =>
                      onComplete(request._id)
                    }
                  >
                    Complete
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    onDelete(request._id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestTable;