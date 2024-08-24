import "./CoinsEarnedCounter.scss";
import deckImg from "../../assets/images/coin.svg";

export default function CoinsEarnedCounter() {
  return (
    <div className="player-area__coins-earned">
      <img className="deck-img" src={deckImg} alt="" />
      <div className="player-area__coins-earned-counter">0</div>
    </div>
  );
}
