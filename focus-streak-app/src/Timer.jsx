import { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRunning(false);
          updateStreak();
          return 25 * 60;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const updateStreak = () => {
    const today = new Date().toDateString();
    localStorage.setItem("lastFocusDay", today);
  };

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="card">
      <h2>{minutes}:{seconds}</h2>
      <button onClick={() => setRunning(!running)}>
        {running ? "Pause" : "Start Focus"}
      </button>
      <button onClick={() => setTime(25 * 60)}>Reset</button>
    </div>
  );
}
