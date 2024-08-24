import "./CardsCollectedCounter.scss";
import deckImg from "../../assets/images/deck.svg";

export default function CardsCollectedCounter({ fishedCards }) {
  return (
    <div className="player-area__cards-collected">
      <img className="deck-img" src={deckImg} alt="" />
      <div className="player-area__cards-collected-counter">{fishedCards}</div>
    </div>
  );
}
