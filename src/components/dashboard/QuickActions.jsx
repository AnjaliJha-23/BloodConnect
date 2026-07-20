import { useNavigate } from "react-router-dom";
import "./QuickActions.css";
import {
  FaUserEdit,
  FaSearch,
  FaTint,
  FaClipboardList,
} from "react-icons/fa";

function QuickActions({ profileComplete }) {
  const navigate = useNavigate();

  return (
    <div className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="action-grid">

        <div
          className="action-card"
          onClick={() => navigate("/profile")}
        >
          <FaUserEdit className="action-icon" />
          <h3>Edit Profile</h3>
        </div>

        <div
          className={`action-card ${!profileComplete ? "disabled" : ""}`}
          onClick={() => {
            if (!profileComplete) return;

            navigate("/", {
              state: { scrollTo: "find-donor" },
            });
          }}
        >
          <FaSearch className="action-icon" />
          <h3>Find Donors</h3>
        </div>

        <div
          className={`action-card ${!profileComplete ? "disabled" : ""}`}
          onClick={() => {
            if (!profileComplete) return;

            navigate("/request-blood");
          }}
        >
          <FaTint className="action-icon" />
          <h3>Request Blood</h3>
        </div>

        <div
          className="action-card"
          onClick={() => navigate("/my-requests")}
        >
          <FaClipboardList className="action-icon" />
          <h3>My Requests</h3>
        </div>

      </div>

    </div>
  );
}

export default QuickActions;