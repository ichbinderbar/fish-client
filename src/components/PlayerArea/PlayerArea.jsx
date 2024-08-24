import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import Hand from "../Hand/Hand";
import "./PlayerArea.scss";

export default function PlayerArea({ player, handleHandCardSelection }) {
  return (
    <div className="player-area">
      <Hand player={player} handleHandCardSelection={handleHandCardSelection} />
      <div className="player-area__stat-container">
        <CardsCollectedCounter></CardsCollectedCounter>
        <CoinsEarnedCounter></CoinsEarnedCounter>
      </div>
    </div>
  );
}
