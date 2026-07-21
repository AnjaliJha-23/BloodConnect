import { useEffect, useState } from "react";
import api from "../../services/api";

import Sidebar from "./Sidebar";
import SummaryCards from "./SummaryCards";
import QuickActions from "./QuickActions";
import DonationTip from "./DonationTip";

import "./DashboardLayout.css";

function DashboardLayout({ user, profileComplete }) {
  const [requestsMade, setRequestsMade] = useState(0);

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
        />

        <QuickActions
          profileComplete={profileComplete}
        />

        <DonationTip />
      </div>
    </div>
  );
}

export default DashboardLayout;