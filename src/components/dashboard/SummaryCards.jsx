import "./SummaryCards.css";
import {
  FaTint,
  FaMapMarkerAlt,
  FaClipboardList,
  FaHeartbeat,
} from "react-icons/fa";

function SummaryCards({ user, requestsMade }) {
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
            <FaMapMarkerAlt />
            City
        </h3>
        <p>{user.city || "N/A"}</p>
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