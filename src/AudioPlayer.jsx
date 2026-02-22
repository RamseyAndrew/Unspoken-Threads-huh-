import { useRef, useState, useEffect } from "react";
import "./App.css";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(err => {
        console.error("Playback failed:", err);
      });
    }
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setProgress(seekTime);
  };

  const skip = (amount) => {
    const audio = audioRef.current;
    if (!audio) return;
    let newTime = audio.currentTime + amount;
    if (newTime < 0) newTime = 0;
    if (newTime > duration) newTime = duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div className="audio-player">
      {/* File is now in public/, so just reference it by name */}
      <audio ref={audioRef} src="/end-of-beginning.mp3" preload="auto" />
      <div className="audio-controls">
        <button className="audio-btn" onClick={() => skip(-10)}>&#9664;&#9664;</button>
        <button className="audio-btn playpause" onClick={togglePlay}>{playing ? "||" : "▶"}</button>
        <button className="audio-btn" onClick={() => skip(10)}>&#9654;&#9654;</button>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={duration ? (progress / duration) * 100 : 0}
        onChange={handleSeek}
        className="audio-seek"
      />
    </div>
  );
}
