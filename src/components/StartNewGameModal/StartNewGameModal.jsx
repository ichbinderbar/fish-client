import React from "react";
import "./StartNewGameModal.scss";
import { useNavigate } from "react-router-dom";

export default function StartNewGameModal({
  isVisible,
  handleStartNewGameVsComputer,
  onCancel,
  message,
}) {
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="start-new-game-modal__container">
      <div className="start-new-game-modal">
        <div className="start-new-game-modal__content">
          <p>{message}</p>
          <button
            className="start-new-game-modal__button"
            onClick={() => navigate("/multiplayergame")}
          >
            Play Online
          </button>
          <button
            className="start-new-game-modal__button"
            onClick={handleStartNewGameVsComputer}
          >
            Play an AI
          </button>
          <button className="start-new-game-modal__cancel" onClick={onCancel}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
