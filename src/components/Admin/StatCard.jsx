import "./styles/StatCard.css";

function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="stat-card"
      style={{
        borderLeft: `6px solid ${color}`,
      }}>
      <div className="stat-content">
        <p>{title}</p>

        <h2>{value}</h2>
      </div>

      <div
        className="stat-icon"
        style={{
          color,
        }}>
        {icon}
      </div>
    </div>
  );
}

export default StatCard;
