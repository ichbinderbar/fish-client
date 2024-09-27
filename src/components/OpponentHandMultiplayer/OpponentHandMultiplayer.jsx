import OpponentCard from "../OpponentCard/OpponentCard";

export default function OpponentHandMultiplayer({ opponent }) {
  return (
    <div className="opponent-area__hand">
      {opponent.hand.map((card, index) => (
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
