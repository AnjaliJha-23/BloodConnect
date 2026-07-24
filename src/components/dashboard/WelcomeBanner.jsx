import "./WelcomeBanner.css";

function WelcomeBanner({ user }) {
  const today = new Date();

  const date = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="welcome-banner">
      <div>
        <h1>Welcome back, {user.name} 👋</h1>

        <p>
          Manage your profile, request blood, connect with donors, and make a
          difference by helping save lives.
        </p>
      </div>

      <div className="banner-date">{date}</div>
    </div>
  );
}

export default WelcomeBanner;
