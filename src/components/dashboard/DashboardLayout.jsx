import { useEffect, useState } from "react";
import api from "../../services/api";

import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";
import QuickActions from "./QuickActions";
import DonationTip from "./DonationTip";

import "./DashboardLayout.css";

function DashboardLayout({ user, profileComplete }) {
  const [requestsMade, setRequestsMade] = useState(0);
  const [activeRequests, setActiveRequests] = useState(0);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/requests/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequestsMade(res.data.length);
        const allRequests = await api.get("/requests");

        const openRequests = allRequests.data.filter(
          (req) => req.status === "Open",
        );

        setActiveRequests(openRequests.length);
      } catch (err) {
        console.error("Failed to fetch request count:", err);
      }
    };

    fetchMyRequests();
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar user={user} />

      <div className="dashboard-main">
        <SummaryCards
          user={user}
          requestsMade={requestsMade}
          activeRequests={activeRequests}
        />

        <div className="dashboard-status">
          <div className="status-card">
            <h3>🎯 Quick Status</h3>

            <ul>
              <li>
                Profile :
                <strong>
                  {profileComplete ? " Complete ✅" : " Incomplete ⚠️"}
                </strong>
              </li>

              <li>
                Blood Group :<strong> {user.bloodGroup || "Not Added"}</strong>
              </li>

              <li>
                Availability :
                <strong>
                  {user.available ? " Available 🟢" : " Unavailable 🔴"}
                </strong>
              </li>

              <li>
                Requests Made :<strong> {requestsMade}</strong>
              </li>
            </ul>
          </div>
        </div>

        <QuickActions profileComplete={profileComplete} />

        <DonationTip />
      </div>
    </div>
  );
}

export default DashboardLayout;
