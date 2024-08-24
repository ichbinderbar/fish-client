import "./CardsCollectedCounter.scss";

export default function CardsCollectedCounter() {
  return (
    <div className="player-area__cards-collected">
      <img className="deck-img" src="./assets/images/deck.svg" alt="" />
      <div className="player-area__cards-collected-counter">0</div>
    </div>
  );
}
