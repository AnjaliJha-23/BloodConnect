import "./DonationTip.css";

function DonationTip() {
  const tips = [
    "Drink plenty of water before donating.",
    "Eat an iron-rich meal before your donation.",
    "Get a good night's sleep before donating.",
    "Avoid smoking or alcohol before donating.",
    "Rest for 10–15 minutes after donating.",
    "Have a healthy snack after your donation.",
  ];

  return (
    <section className="dashboard-card donation-tip">
      <div className="tip-content">
        {/* Left Side - Text & List */}
        <div className="tip-text">
          <h2>
            <span role="img" aria-label="blood drop">🩸</span> Donation Tip of the Day
          </h2>

          <ul className="tip-list">
            {tips.map((tip, index) => (
              <li key={index}>
                <span className="check-icon">✔</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Illustration */}
        <div className="tip-image">
          <img 
            src="/DonationTip.png" 
            alt="Illustration showing blood donation tips including hydration, nutrition, resting, and avoiding smoking" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default DonationTip;