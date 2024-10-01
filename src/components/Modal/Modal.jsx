import React from "react";
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

  if (!isVisible) return null;

  const handleLevelSelect = (bot) => {
    setOpponentLevel(bot);
    navigate("/game");
  };

  return (
    <div className={`modal__container modal__container--${modifier}`}>
      <div className={`modal modal--${modifier}`}>
        <div className={`modal__content modal__content--${modifier}`}>
          <p>{message}</p>
          <input
            className={`modal__input modal__input--${modifier}`}
            onChange={(e) => setInputValue(e.target.value)}
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
          >
            Continue
          </button>
          <button
            className={`modal__cancel modal__cancel--${modifier}`}
            onClick={onCancel}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
