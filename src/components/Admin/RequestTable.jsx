import api from "../../services/api";
import "./styles/RequestTable.css";

function RequestTable({ requests, refresh }) {

  const updateStatus = async (id, status) => {
    try {

      const token = localStorage.getItem("token");

      await api.put(
        `/admin/requests/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refresh();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-table-container">

      <table className="admin-table">

        <thead>
          <tr>
            <th>Patient</th>
            <th>Blood</th>
            <th>City</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {requests.map((request) => (

            <tr key={request._id}>

              <td>{request.patientName}</td>

              <td>{request.bloodGroup}</td>

              <td>{request.city}</td>

              <td>{request.status}</td>

              <td>

                {request.status === "Open" ? (

                  <button
                    className="complete-btn"
                    onClick={() =>
                      updateStatus(request._id, "Completed")
                    }
                  >
                    Mark Complete
                  </button>

                ) : (

                  <button
                    className="reopen-btn"
                    onClick={() =>
                      updateStatus(request._id, "Open")
                    }
                  >
                    Reopen
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RequestTable;