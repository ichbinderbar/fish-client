import Card from "../Card/Card";
import { useState, useEffect } from "react";
import "./Table.scss";

export default function Table({ cards, handleTableCardSelection }) {
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
    <div className={`table table--${theme}`}>
      <div className="table__theme-button" onClick={handleClick}>
        {theme === "light" ? "🌑" : "☀️"}
      </div>
      {cards.map((card, index) => (
        <Card
          className={`card card__${card.color}
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
