import { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRunning(false);
          playSound();
          updateStats();
          return 25 * 60;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const playSound = () => {
    if (mute) return;
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );
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
      <h2>{minutes}:{seconds}</h2>

      <button onClick={() => setRunning(!running)}>
        {running ? "Pause" : "Start Focus"}
      </button>

      <button onClick={() => setTime(25 * 60)}>Reset</button>

      <button onClick={() => setMute(!mute)}>
        {mute ? "🔇 Muted" : "🔊 Sound On"}
      </button>
    </div>
  );
}
