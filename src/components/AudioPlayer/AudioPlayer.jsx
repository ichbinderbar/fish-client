import { useRef, useState, useEffect } from "react";
import "./AudioPlayer.scss";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const songs = [
    "/Manana Tepotzlan.mp3",
    "/Cumbia Del Olvido.mp3",
    "/Cumbia Sobre el Mar.mp3",
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [currentSongIndex]);

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
        audioRef.current.load();
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, isPlaying]);

  return (
    <button className="audio-button" onClick={togglePlayPause}>
      {isPlaying ? "🔊" : "🔈"}
      <audio ref={audioRef}>
        <source src={songs[currentSongIndex]} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </button>
  );
}
