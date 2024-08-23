import Counter from "../Counter/Counter";
import Hand from "../Hand/Hand";
import "./PlayerArea.scss";

export default function PlayerArea({ player, handleHandCardSelection }) {
  return (
    <div className="player-area">
      <div className="player-area__stat-container">
        <Counter className={"player-area__coins-earned"}></Counter>
        <Counter className={"player-area__cards-collected"}></Counter>
      </div>
      <Hand player={player} handleHandCardSelection={handleHandCardSelection} />
    </div>
  );
}
