import "./Leaderboard.scss";

export default function Leaderboard() {
  return (
    <div className="leaderboard__main-container">
      <h1 className="leaderboard__title">Highest Scores:</h1>
      <div className="leaderboard__subcontainer">
        <div className="leaderboard__content"></div>
      </div>
    </div>
  );
}
