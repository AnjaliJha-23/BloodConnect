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

  const handleAction = (path, state = null, isDisabled = false) => {
    if (isDisabled) return;
    if (state) {
      navigate(path, { state });
    } else {
      navigate(path);
    }
  };

  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>

      <div className="action-grid">
        {/* Edit Profile */}
        <div
          className="action-card"
          role="button"
          tabIndex={0}
          onClick={() => handleAction("/profile")}
          onKeyDown={(e) => e.key === "Enter" && handleAction("/profile")}
        >
          <FaUserEdit className="action-icon" aria-hidden="true" />
          <h3>Edit Profile</h3>
        </div>

        {/* Find Donors */}
        <div
          className={`action-card ${!profileComplete ? "disabled" : ""}`}
          role="button"
          tabIndex={!profileComplete ? -1 : 0}
          aria-disabled={!profileComplete}
          title={
            !profileComplete
              ? "Complete your profile to search for donors"
              : "Find Donors"
          }
          onClick={() =>
            handleAction("/", { scrollTo: "find-donor" }, !profileComplete)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleAction("/", { scrollTo: "find-donor" }, !profileComplete)
          }
        >
          <FaSearch className="action-icon" aria-hidden="true" />
          <h3>Find Donors</h3>
        </div>

        {/* Request Blood */}
        <div
          className={`action-card ${!profileComplete ? "disabled" : ""}`}
          role="button"
          tabIndex={!profileComplete ? -1 : 0}
          aria-disabled={!profileComplete}
          title={
            !profileComplete
              ? "Complete your profile to request blood"
              : "Request Blood"
          }
          onClick={() =>
            handleAction("/request-blood", null, !profileComplete)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleAction("/request-blood", null, !profileComplete)
          }
        >
          <FaTint className="action-icon" aria-hidden="true" />
          <h3>Request Blood</h3>
        </div>

        {/* My Requests */}
        <div
          className="action-card"
          role="button"
          tabIndex={0}
          onClick={() => handleAction("/my-requests")}
          onKeyDown={(e) => e.key === "Enter" && handleAction("/my-requests")}
        >
          <FaClipboardList className="action-icon" aria-hidden="true" />
          <h3>My Requests</h3>
        </div>
      </div>
    </div>
  );
}

export default QuickActions;