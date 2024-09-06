import OpponentCard from "../OpponentCard/OpponentCard";
import "./OpponentHand.scss";

export default function OpponentHand({ player, handleHandCardSelection }) {
  const playerCards = player.hand;

  return (
    <div className="opponent-area__hand">
      {playerCards.map((card, index) => (
        <OpponentCard
          className={`
          opponent-card opponent-card__${card.color}
          ${[3, 4, 5, 6, 7].includes(card.number) ? "opponent-card--net" : ""}
          opponent-card--${index}
          `}
          // onClick={() => handleHandCardSelection(card)}
          key={index}
          color={card.color}
          number={card.number}
        />
      ))}
    </div>
  );
}
