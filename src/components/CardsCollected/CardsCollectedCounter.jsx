import "./CardsCollectedCounter.scss";
import deckImg from "../../assets/images/deck.svg";

export default function CardsCollectedCounter({ fishedCards }) {
  return (
    <div className="player-area__cards-collected-container">
      <img className="player-area__cards-img" src={deckImg} alt="" />
      <div className="player-area__cards-emoji">🃏</div>
      <div className="player-area__cards-collected-counter">{fishedCards}</div>
    </div>
  );
}
