import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const profileComplete =
    user &&
    user.bloodGroup &&
    user.phone &&
    user.city &&
    user.state &&
    user.age &&
    user.gender;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </h2>
    );
  }

  return (
  <div className="dashboard">

    <WelcomeBanner user={user} />

    <DashboardLayout
      user={user}
      profileComplete={profileComplete}
    />

  </div>
);
}

export default Dashboard;