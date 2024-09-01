import Card from "../Card/Card";
// import { useState, useEffect } from "react";
import "./Table.scss";
import { useNavigate } from "react-router-dom";

export default function Table({
  cards,
  handleTableCardSelection,
  handleThemeChange,
  theme,
  gameOver,
  player,
}) {
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    navigate("/");
  };

  return (
    <div className={`table table--${theme}`}>
      <div className="table__theme-button" onClick={handleThemeChange}>
        {theme === "light" ? "🌙" : "☀️"}
      </div>
      <div className="table__home-button" onClick={handleGoToHomePage}>
        Home
      </div>
      {gameOver ? (
        <div className="table__game-over">
          Game Over.
          <br />
          {`${player.coins >= 20 ? "You win!" : "Better luck next time..."}`}
        </div>
      ) : null}
      {cards.map((card, index) => (
        <Card
          className={`card card__${card.color} card--${
            [3, 4, 5, 6, 7].includes(card.number) ? "net" : card.number
          }
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
