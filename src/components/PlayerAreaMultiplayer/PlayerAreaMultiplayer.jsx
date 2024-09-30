import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import Hand from "../Hand/Hand";
import IsActiveAlert from "../IsActiveAlert/IsActiveAlert";

export default function PlayerAreaMultiplayer({
  player,
  handleHandCardSelection,
  theme,
}) {
  return (
    <div className={`player-area player-area--${theme}`}>
      <IsActiveAlert player={player} />
      <div className="player-area__stat-container">
        <CardsCollectedCounter
          fishedCards={player.fishedCards}
        ></CardsCollectedCounter>
        <CoinsEarnedCounter coins={player.coins}></CoinsEarnedCounter>
      </div>
      <Hand player={player} handleHandCardSelection={handleHandCardSelection} />
    </div>
  );
}
