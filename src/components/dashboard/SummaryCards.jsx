import "./SummaryCards.css";
import {
  FaTint,
  FaClipboardList,
  FaHeartbeat,
  FaBell,
} from "react-icons/fa";

function SummaryCards({ user, requestsMade, activeRequests }) {
  return (
    <div className="summary-grid">
      <div className="summary-card">
        <h3>
          <FaTint />
          Blood Group
        </h3>
        <p>{user.bloodGroup || "N/A"}</p>
      </div>

      <div className="summary-card">
        <h3>
          <FaBell />
          Active Requests
        </h3>
        <p>{activeRequests}</p>
      </div>

      <div className="summary-card">
        <h3>
          <FaClipboardList />
          Requests Made
        </h3>
        <p>{requestsMade}</p>
      </div>

      <div className="summary-card">
        <h3>
          <FaHeartbeat />
          Availability
        </h3>
        <p>{user.available ? "Available" : "Unavailable"}</p>
      </div>
    </div>
  );
}

export default SummaryCards;
