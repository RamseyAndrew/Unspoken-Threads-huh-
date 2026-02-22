import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import "./App.css";

function getNairobiMidnight() {
  // Nairobi is UTC+3
  const now = new Date();
  const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  const nairobi = new Date(utc.getTime() + 3 * 60 * 60000);
  nairobi.setHours(0, 0, 0, 0);
  return nairobi;
}

function getNairobiNow() {
  const now = new Date();
  const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  return new Date(utc.getTime() + 3 * 60 * 60000);
}

export default function LockScreen({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [now, setNow] = useState(getNairobiNow());
  const [showWait, setShowWait] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(getNairobiNow()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Midnight window: 00:00 - 00:30 Nairobi time
  const midnight = getNairobiMidnight();
  const openWindowStart = new Date(midnight);
  const openWindowEnd = new Date(midnight.getTime() + 30 * 60 * 1000);
  const isOpen = now >= openWindowStart && now < openWindowEnd;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOpen) {
      setShowWait(true);
      setTimeout(() => setShowWait(false), 10000);
      return;
    }
    if (input.trim() === "Bible") {
      setError("");
      onUnlock();
    } else {
      setError("Wrong password. Try again.");
    }
  };

  const pad = (n) => n.toString().padStart(2, "0");
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return (
    <div className="lockscreen-bg">
      <div className="lockscreen-card">
        <h2>🔒 Locked</h2>
        <div className="lockscreen-timer">Nairobi Time: {timeStr}</div>
        <form className="lockscreen-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="lockscreen-input"
          />
          <button type="submit" className="lockscreen-btn">
            Unlock
          </button>
        </form>
        {error && <div className="lockscreen-error">{error}</div>}
        {showWait && (
          <div className="lockscreen-popup">Wait for the timer Pancakes dont be naughty in the meantime listen to this 😘🤭 🥞</div>
        )}
        {!isOpen && !showWait && (
          <div className="lockscreen-wait">You can unlock this masterpiece only from midnight to 12:30 Nairobi time.</div>
        )}
        <AudioPlayer />
      </div>
    </div>
  );
}
