import OpponentCard from "../OpponentCard/OpponentCard";
import "./OpponentHand.scss";

export default function OpponentHand({ player }) {
  return (
    <div className="opponent-area__hand">
      {player.hand.map((card, index) => (
        <OpponentCard
          className={`
          opponent-card opponent-card__${card.color}
          ${[3, 4, 5, 6, 7].includes(card.number) ? "opponent-card--net" : ""}
          opponent-card--${index}
          `}
          key={index}
          color={card.color}
          number={card.number}
        />
      ))}
    </div>
  );
}
