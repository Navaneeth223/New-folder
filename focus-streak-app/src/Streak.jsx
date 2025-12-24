export default function Streak() {
  const today = new Date().toDateString();
  const lastDay = localStorage.getItem("lastFocusDay");
  const count = localStorage.getItem("focusCount") || 0;

  return (
    <div className="card">
      <h3>🔥 Progress</h3>
      <p>{lastDay === today ? "Focused today 💪" : "No focus today yet"}</p>
      <p>🎯 Sessions today: {count}</p>
    </div>
  );
}
