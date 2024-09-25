import { useRef, useState } from "react";
import "./AudioPlayer.scss";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button className="audio-button" onClick={togglePlayPause}>
      {isPlaying ? "🔊" : "🔈"}
      <audio ref={audioRef} loop>
        <source src="/background-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </button>
  );
}
