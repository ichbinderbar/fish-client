import Card from "../Card/Card";
import "./Table.scss";

export default function Table({ cards, handleTableCardSelection }) {
  return (
    <div className="table">
      {cards.map((card, index) => (
        <Card
          className={`card card__${card.color}
          ${card.hook ? "card__hook" : ""}
          ${card.selected ? `card__${card.color}--selected` : ""}`}
          onClick={() => handleTableCardSelection(card)}
          key={index}
          color={card.color}
          number={card.number}
        />
      ))}
    </div>
  );
}
