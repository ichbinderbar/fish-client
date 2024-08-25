import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import Hand from "../Hand/Hand";
import "./PlayerArea.scss";

export default function PlayerArea({
  player,
  handleHandCardSelection,
  fishedCards,
  coins,
}) {
  return (
    <div className="player-area">
      <Hand player={player} handleHandCardSelection={handleHandCardSelection} />
      <div className="player-area__stat-container">
        <CardsCollectedCounter
          fishedCards={fishedCards}
        ></CardsCollectedCounter>
        <CoinsEarnedCounter coins={coins}></CoinsEarnedCounter>
      </div>
    </div>
  );
}
