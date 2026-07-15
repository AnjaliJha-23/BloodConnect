import "./Dashboard.css";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <h1>
          Welcome, {user?.name} 👋
        </h1>

        <p>
          Thank you for being part of BloodConnect.
        </p>

      </div>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Name</h3>
          <p>{user?.name}</p>
        </div>

        <div className="card">
          <h3>Email</h3>
          <p>{user?.email}</p>
        </div>

        <div className="card">
          <h3>Blood Group</h3>
          <p>Not Updated</p>
        </div>

        <div className="card">
          <h3>City</h3>
          <p>Not Updated</p>
        </div>

      </div>

      <div className="dashboard-actions">

        <button>Edit Profile</button>

        <button>Find Donors</button>

        <button>Request Blood</button>

      </div>

    </div>
  );
}

export default Dashboard;