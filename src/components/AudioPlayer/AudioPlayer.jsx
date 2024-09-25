import "./AudioPlayer.scss";

export default function AudioPlayer() {
  return (
    <audio
      className="game-music"
      controls
      autoplay
      controlsList="nodownload noplaybackrate"
    >
      <source src="/background-song.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
