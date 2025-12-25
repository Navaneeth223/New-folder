import { useEffect, useState } from "react";

export default function Timer() {
  const totalTime = 1 * 60; // 25 minutes
  const [time, setTime] = useState(totalTime);
  const [running, setRunning] = useState(false);
  const [mute, setMute] = useState(false);

  // === circle setup ===
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (time / totalTime) * circumference;

  // === dynamic color based on remaining time ===
  let ringColor = "#10b981"; // green default
  const percentage = time / totalTime;

  if (percentage < 0.2) {
    ringColor = "#ef4444"; // red
  } else if (percentage < 0.5) {
    ringColor = "#fcd34d"; // yellow
  }

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRunning(false);
          playSound();
          updateStats();
          return totalTime;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const playSound = () => {
    if (mute) return;
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.play();
  };

  const updateStats = () => {
    const today = new Date().toDateString();
    localStorage.setItem("lastFocusDay", today);

    const count = Number(localStorage.getItem("focusCount")) || 0;
    localStorage.setItem("focusCount", count + 1);
  };

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="card">
      {/* --- Circular Timer UI --- */}
      <div className="circle-container">
        <svg width="200" height="200">
          <circle
            className="track"
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#ddd"
            strokeWidth="10"
          />
          
          <circle
  className="progress"
  cx="100"
  cy="100"
  r={radius}
  fill="none"
  stroke={ringColor}
  strokeWidth="10"
  strokeDasharray={circumference}
  strokeDashoffset={circumference - progress}
  strokeLinecap="round"
/>

        </svg>

        <div className="time-label">{minutes}:{seconds}</div>
      </div>

      <button onClick={() => setRunning(!running)}>
        {running ? "Pause" : "Start Focus"}
      </button>

      <button onClick={() => setTime(totalTime)}>Reset</button>

      <button onClick={() => setMute(!mute)}>
        {mute ? "🔇 Muted" : "🔊 Sound On"}
      </button>
    </div>
  );
}
