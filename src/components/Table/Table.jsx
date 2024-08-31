import Card from "../Card/Card";
// import { useState, useEffect } from "react";
import "./Table.scss";
import { useNavigate } from "react-router-dom";

export default function Table({
  cards,
  handleTableCardSelection,
  handleThemeChange,
  theme,
}) {
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    navigate("/");
  };

  return (
    <div className={`table table--${theme}`}>
      <div className="table__theme-button" onClick={handleThemeChange}>
        {theme === "light" ? "🌑" : "☀️"}
      </div>
      <div className="table__home-button" onClick={handleGoToHomePage}>
        Home
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
