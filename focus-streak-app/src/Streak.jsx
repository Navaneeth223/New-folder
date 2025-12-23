export default function Streak() {
  const lastDay = localStorage.getItem("lastFocusDay");
  const today = new Date().toDateString();

  return (
    <div className="card">
      <h3>🔥 Daily Streak</h3>
      <p>
        {lastDay === today
          ? "You focused today! 💪"
          : "No focus session today yet"}
      </p>
    </div>
  );
}
