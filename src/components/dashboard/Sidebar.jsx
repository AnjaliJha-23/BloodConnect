import React, { useState } from "react";
import "./Sidebar.css";
import {
  FaTint,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaCamera,
  FaPencilAlt,
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
  // 1. Safe state initialization checking localStorage first, then falling back to user data
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("sidebar_avatar") || user?.profilePicture || null;
  });

  // 2. Persistent upload handler converting raw images into persistent strings
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String); // Updates the UI instantly
        localStorage.setItem("sidebar_avatar", base64String); // Saves image through browser refreshes
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sidebar">
      {/* Clickable image picker region wrapper */}
      <label htmlFor="avatar-upload" className="avatar-upload-label">
        <div className="avatar-container">
          
          <div
            className="sidebar-avatar"
            style={{
              backgroundColor: profileImage ? "transparent" : getAvatarColor(user?.name),
            }}
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="avatar-img" />
            ) : (
              user?.name ? user.name.charAt(0).toUpperCase() : "U"
            )}
            
            {/* Hover overlay hint */}
            <div className="avatar-overlay">
              <FaCamera />
            </div>
          </div>

          {/* Floating edit helper anchor badge */}
          <div className="avatar-edit-badge">
            <FaPencilAlt />
          </div>

        </div>
      </label>

      {/* Hidden browser file target field */}
      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <h2>{user?.name || "User"}</h2>
      <p className="sidebar-email">{user?.email || "No Email Provided"}</p>
      
      <div
        className={`status-badge ${
          user?.available ? "badge-available" : "badge-unavailable"
        }`}
      >
        {user?.available ? "🟢 Available" : "🔴 Unavailable"}
      </div>

      <div className="sidebar-divider"></div>

      <div className="sidebar-info">
        <div className="info-row">
          <span>
            <FaTint className="info-icon" />
            Blood Group
          </span>
          <strong>{user?.bloodGroup || "N/A"}</strong>
        </div>

        <div className="info-row">
          <span>
            <FaMapMarkerAlt className="info-icon" />
            State
          </span>
          <strong>{user?.state || "N/A"}</strong>
        </div>

        <div className="info-row">
          <span>
            {user?.available ? (
              <FaCheckCircle className="info-icon available" />
            ) : (
              <FaTimesCircle className="info-icon unavailable" />
            )}
            Status
          </span>
          <strong className={user?.available ? "available" : "unavailable"}>
            {user?.available ? "Available" : "Unavailable"}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
