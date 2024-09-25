import Card from "../Card/Card";
import { useState } from "react";
import "./Table.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

export default function Table({
  cards,
  handleTableCardSelection,
  handleThemeChange,
  theme,
  gameOver,
  player,
}) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGoToHomePage = () => {
    setIsModalVisible(true);
  };

  const handleConfirmNavigation = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  const handleCancelNavigation = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`table table--${theme}`}>
      <AudioPlayer />
      <div className="table__theme-button" onClick={handleThemeChange}>
        {theme === "light" ? "🌙" : "☀️"}
      </div>
      <div className="table__home-button" onClick={handleGoToHomePage}>
        🏠
      </div>
      <Modal
        isVisible={isModalVisible}
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelNavigation}
        message={
          <>
            Are you sure you want to leave?
            <br />
            The game will end.
          </>
        }
      />
      {gameOver ? (
        <div className="table__game-over">
          Game Over.
          <br />
          {`${player.coins >= 20 ? "You win!" : "Better luck next time..."}`}
        </div>
      ) : null}
      {!gameOver &&
        cards.map((card, index) => (
          <Card
            className={`card card__${card.color} card--${
              [8, 9, 10].includes(card.number) ? "net" : card.number
            } ${card.selected ? `card__${card.color}--selected` : ""}`}
            onClick={() => handleTableCardSelection(card)}
            key={index}
            color={card.color}
            number={card.number}
          />
        ))}
    </div>
  );
}
