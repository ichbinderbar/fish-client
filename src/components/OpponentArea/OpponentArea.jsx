import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import OpponentHand from "../OpponentHand/OpponentHand";
import OpponentsLastMoveBanner from "../OpponentsLastMoveBanner/OpponentsLastMoveBanner";
import "./OpponentArea.scss";

export default function OpponentArea({
  player,
  handleHandCardSelection,
  fishedCards,
  coins,
  theme,
  cardsCollected,
  commentary,
  animate,
}) {
  return (
    <div className={`opponent-area opponent-area--${theme}`}>
      <div className={`opponent-area__commentary ${animate ? "animate" : ""}`}>
        {commentary}
      </div>
      <OpponentHand
        player={player}
        handleHandCardSelection={handleHandCardSelection}
      />
      <OpponentsLastMoveBanner cardsCollected={cardsCollected} />
      <div className="opponent-area__stat-container">
        <CardsCollectedCounter
          fishedCards={fishedCards}
        ></CardsCollectedCounter>
        <CoinsEarnedCounter coins={coins}></CoinsEarnedCounter>
      </div>
    </div>
  );
}
