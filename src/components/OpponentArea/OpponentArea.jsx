import CardsCollectedCounter from "../CardsCollected/CardsCollectedCounter";
import CoinsEarnedCounter from "../CoinsEarned/CoinsEarnedCounter";
import Hand from "../Hand/Hand";
import OpponentHand from "../OpponentHand/OpponentHand";
import OpponentsLastMoveBanner from "../OpponentsLastMoveBanner/OpponentsLastMoveBanner";
import "./OpponentArea.scss";
import { useState, useEffect } from "react";

export default function OpponentArea({
  player,
  handleHandCardSelection,
  fishedCards,
  coins,
  theme,
  cardsCollected,
}) {
  return (
    <div className={`opponent-area opponent-area--${theme}`}>
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
