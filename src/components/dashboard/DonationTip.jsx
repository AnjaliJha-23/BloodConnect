import "./DonationTip.css";

function DonationTip() {
  return (
    <div className="dashboard-card donation-tip">

      <div className="tip-content">

        {/* Left Side */}
        <div className="tip-text">
          <h2>🩸 Donation Tip of the Day</h2>

          <p>✔ Drink plenty of water before donating.</p>
          <p>✔ Eat an iron-rich meal before your donation.</p>
          <p>✔ Get a good night's sleep before donating.</p>
          <p>✔ Avoid smoking or alcohol before donating.</p>
          <p>✔ Rest for 10–15 minutes after donating.</p>
          <p>✔ Have a healthy snack after your donation.</p>
        </div>

        {/* Right Side */}
        <div className="tip-image">
          <img src="/DonationTip.png" alt="Donation Tip" />
        </div>

      </div>

    </div>
  );
}

export default DonationTip;