import React, { useState } from "react";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";
import { lisaBot, juanBot, dumbBot } from "../../game/PlayerObjects";

export default function Modal({
  isVisible,
  onConfirm,
  onCancel,
  message,
  modifier,
  setInputValue,
  setOpponentLevel,
  placeholder,
}) {
  const navigate = useNavigate();
  const [inputValue, setLocalInputValue] = useState("");

  if (!isVisible) return null;

  const handleLevelSelect = (bot) => {
    setOpponentLevel(bot);
    navigate("/game");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalInputValue(value);
    if (setInputValue) {
      setInputValue(value);
    }
  };

  const isContinueDisabled = modifier === "start-game" && !inputValue.trim();

  return (
    <div className={`modal__container modal__container--${modifier}`}>
      <div className={`modal modal--${modifier}`}>
        <div className={`modal__content modal__content--${modifier}`}>
          <p>{message}</p>
          <input
            className={`modal__input modal__input--${modifier}`}
            onChange={handleInputChange}
            value={inputValue}
            placeholder={placeholder}
          />
          <button
            className={`modal__button modal__button--${modifier}`}
            onClick={() => handleLevelSelect(lisaBot)}
          >
            Pro
          </button>
          <button
            className={`modal__button modal__button--${modifier}`}
            onClick={() => handleLevelSelect(juanBot)}
          >
            Amateur
          </button>
          <button
            className={`modal__button modal__button--${modifier}`}
            onClick={() => handleLevelSelect(dumbBot)}
          >
            Practice
          </button>
          <button
            className={`modal__confirm modal__confirm--${modifier}`}
            onClick={onConfirm}
            disabled={isContinueDisabled}
          >
            {modifier === "start-game" ? "Continue" : "Quit Game"}
          </button>
          <button
            className={`modal__cancel modal__cancel--${modifier}`}
            onClick={onCancel}
          >
            {modifier === "start-game" || modifier === "level"
              ? "Go back"
              : "Continue Playing"}
          </button>
        </div>
      </div>
    </div>
  );
}
