import "./EmptyState.css";

function EmptyState({
  icon = "📭",
  title = "Nothing Found",
  message = "There is no data to display.",
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>

      <h2>{title}</h2>

      <p>{message}</p>
    </div>
  );
}

export default EmptyState;