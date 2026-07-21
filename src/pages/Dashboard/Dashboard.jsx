import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const profileComplete = Boolean(
    user &&
      user.bloodGroup &&
      user.phone &&
      user.city &&
      user.state &&
      user.age &&
      user.gender
  );

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) {
          setUser(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-error">
        <h2>Unable to load user profile.</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <WelcomeBanner user={user} />
      <DashboardLayout user={user} profileComplete={profileComplete} />
    </div>
  );
}

export default Dashboard;