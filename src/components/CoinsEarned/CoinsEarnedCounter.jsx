import "./CoinsEarnedCounter.scss";
import deckImg from "../../assets/images/coin.svg";

export default function CoinsEarnedCounter({ coins }) {
  return (
    <div className="player-area__coins-earned">
      <img className="player-area__coins-img" src={deckImg} alt="" />
      <div className="player-area__cards-emoji">🪙</div>
      <div className="player-area__coins-earned-counter">{coins}</div>
    </div>
  );
}
