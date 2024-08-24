import "./CoinsEarnedCounter.scss";

export default function CoinsEarnedCounter() {
  return (
    <div className="player-area__coins-earned">
      <img className="deck-img" src="./assets/images/coins.svg" alt="" />
      <div className="player-area__coins-earned-counter">0</div>
    </div>
  );
}
