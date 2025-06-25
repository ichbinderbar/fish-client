import Card from "../Card/Card";
import "./Hand.scss";

export default function Hand({ player, handleHandCardSelection }) {
  const playerCards = player.hand;

  return (
    <div className="hand">
      {playerCards.map((card, index) => (
        <Card
          className={`card card__${card.color} card--${card.number}`}
          onClick={() => handleHandCardSelection(card)}
          key={index}
          color={card.color}
          number={card.number}
        />
      ))}
    </div>
  );
}
