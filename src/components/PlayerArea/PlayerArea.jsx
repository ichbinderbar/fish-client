import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import Hand from "../Hand/Hand";
import "./PlayerArea.scss";
import { useState, useEffect } from "react";

export default function PlayerArea({
  player,
  handleHandCardSelection,
  fishedCards,
  coins,
}) {
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      return;
    }
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "ligh") {
      setTheme("light");
    }
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    }
  }, []);

  return (
    <div onClick={handleClick} className={`player-area player-area--${theme}`}>
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
