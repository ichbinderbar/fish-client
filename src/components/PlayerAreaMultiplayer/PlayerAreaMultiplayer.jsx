import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import Hand from "../Hand/Hand";

export default function PlayerAreaMultiplayer({
  player,
  handleHandCardSelection,
  theme,
}) {
  return (
    <div className={`player-area player-area--${theme}`}>
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
