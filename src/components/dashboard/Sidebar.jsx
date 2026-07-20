import "./Sidebar.css";
import {
  FaUser,
  FaTint,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
const avatarColors = [
  "#E53935",
  "#1E88E5",
  "#43A047",
  "#8E24AA",
  "#FB8C00",
  "#00897B",
  "#5E35B1",
  "#3949AB",
];
const getAvatarColor = (name) => {
  if (!name) return avatarColors[0];

  const index = name.charCodeAt(0) % avatarColors.length;

  return avatarColors[index];
};

function Sidebar({ user }) {
  return (
    <div className="sidebar">

      <div
  className="sidebar-avatar"
  style={{
    backgroundColor: getAvatarColor(user.name),
  }}
>
  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
</div>

      <h2>{user.name}</h2>

      <p className="sidebar-email">
        {user.email}
      </p>
      <div
  className={`status-badge ${
    user.available ? "badge-available" : "badge-unavailable"
  }`}
>
  {user.available ? "🟢 Available" : "🔴 Unavailable"}
</div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-info">

        <div className="info-row">
          <span>
            <FaTint className="info-icon" />
            Blood Group
          </span>
          <strong>{user.bloodGroup || "N/A"}</strong>
        </div>

        <div className="info-row">
          <span>
                <FaMapMarkerAlt className="info-icon" />
                City
          </span>
          <strong>{user.city || "N/A"}</strong>
        </div>

        <div className="info-row">
          <span>
            {user.available ? (
            <FaCheckCircle className="info-icon available" />
          ) : (
    <FaTimesCircle className="info-icon unavailable" />
  )}
  Status
</span>

          <strong
            className={
              user.available
                ? "available"
                : "unavailable"
            }
          >
            {user.available ? "Available" : "Unavailable"}
          </strong>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;