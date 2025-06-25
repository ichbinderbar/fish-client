import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import OpponentHandMultiplayer from "../OpponentHandMultiplayer/OpponentHandMultiplayer";
import OpponentsLastMoveBanner from "../OpponentsLastMoveBanner/OpponentsLastMoveBanner";

export default function OpponentAreaMultiplayer({
  opponent,
  theme,
  cardsCollected,
}) {
  return (
    <div className={`opponent-area opponent-area--${theme}`}>
      <OpponentHandMultiplayer opponent={opponent} />
      <OpponentsLastMoveBanner cardsCollected={cardsCollected} />
      <div className="opponent-area__stat-container">
        <CardsCollectedCounter
          fishedCards={opponent.fishedCards}
        ></CardsCollectedCounter>
        <CoinsEarnedCounter coins={opponent.coins}></CoinsEarnedCounter>
      </div>
    </div>
  );
}
