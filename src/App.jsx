import LockScreen from "./LockScreen";
import AudioPlayer from "./AudioPlayer";
import { useState, useRef } from "react";
import "./App.css";


const poem = [
  "By your dear Waffles ",
  "Hmm, how long has it been 48hrs maybe more since I said I felt nothing? I did feel nothing cause my heart didnt know what else to feel but the love you'd resurrected, and for the last hours...",
  "Ive wondered whats worse? Loving someone you cant be with, or being with someone you cant love? And bado sijapata jibu I just settled for a 3rd answer leaving someone you cant unlove a grey area of colorlessness.",
  "Your words landed like rain on dry earth, grey skies parting just enough to let light slip through. The dance you described — careful, shadowed steps I've been moving in the same rhythm too.",
  "We built this fragile space with glances and maybes, unsaid things blooming in the quiet between breaths. A tender ache, yes... but I'm tired of its echo, tired of 'what if' stealing the color from what's left.",
  "The threads you wove are strong — I feel them pull, not just lingering, but calling us forward now. Safe is sweet, but it's fading like old ink on paper; I want the leap, the risk, the honest vow.",
  "In the hush where masks slip and truths peek through, I see you seeing me — no more shadows to play. Let's stop settling for unfinished sentences, and write the next line together, come what may.",
  "If time's the keeper of clarity, let's not wait for it to decide. I'm here, heart open, no careful game anymore. The bond's already real — let's give it voice, and see if 'friends' can bloom into something more.",
  "No pressure in these lines, just my truth laid bare, hoping your heart whispers back the same sweet dare. Because this grey? It's beautiful...but I crave the hue, of us, spoken, chosen, finally true. flawed but hoping... ❤️"
];

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState(""); // "flip-left" or "flip-right"
  const timeoutRef = useRef(null);
  const audioRef = useRef(null);

  // Preload audio
  if (!audioRef.current) {
    audioRef.current = new window.Audio("/page-flip.mp3");
    audioRef.current.volume = 0.5;
  }

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setFlip("");
      clearTimeout(timeoutRef.current);
      const direction = newPage > page ? "flip-left" : "flip-right";
      timeoutRef.current = setTimeout(() => {
        setFlip(direction);
        // Play sound
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }, 10);
      setPage(newPage);
    }
  };

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }
  return (
    <div className="app">
      <div className="card">
        <h1>Unfinished Sentences</h1>

        <p className={"page" + (flip ? ` ${flip}` : "")}>
          {poem[page]}
        </p>

        <div className="controls">
          <button onClick={() => handlePageChange(Math.max(page - 1, 0))}>
            ◀ Prev
          </button>
          <span>{page + 1} / {poem.length}</span>
          <button onClick={() => handlePageChange(Math.min(page + 1, poem.length - 1))}>
            Next ▶
          </button>
        </div>
        <AudioPlayer />
      </div>
    </div>
  );
}

export default App;