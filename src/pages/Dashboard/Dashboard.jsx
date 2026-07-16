import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
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
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user.name} 👋</h1>

        <p>Thank you for being part of BloodConnect.</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Name</h3>
          <p>{user.name}</p>
        </div>

        <div className="card">
          <h3>Email</h3>
          <p>{user.email}</p>
        </div>

        <div className="card">
          <h3>Blood Group</h3>
          <p>{user.bloodGroup || "Not Updated"}</p>
        </div>

        <div className="card">
          <h3>City</h3>
          <p>{user.city || "Not Updated"}</p>
        </div>
        <div className="card">

  <h3>Profile Status</h3>

  <p
    style={{
      color: profileComplete ? "green" : "red",
      fontWeight: "bold"
    }}
  >
    {profileComplete ? "✅ Complete" : "❌ Incomplete"}
  </p>

</div>
      </div>

      <div className="dashboard-actions">

  <button onClick={() => navigate("/profile")}>
    Edit Profile
  </button>

  <button
    disabled={!profileComplete}
    onClick={() =>
  navigate("/", {
    state: { scrollTo: "find-donor" },
  })
}
  >
    Find Donors
  </button>

  <button
    disabled={!profileComplete}
    onClick={() => navigate("/request-blood")}
  >
    Request Blood
  </button>

</div>
    </div>
  );
}

export default Dashboard;