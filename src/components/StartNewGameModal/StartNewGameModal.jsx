import React from "react";
import "./StartNewGameModal.scss";
import { useNavigate } from "react-router-dom";

export default function StartNewGameModal({
  isVisible,
  handleStartNewGameVsComputer,
  onCancel,
  message,
}) {
  if (!isVisible) return null;

  const navigate = useNavigate();

  return (
    <div className={`start-new-game-modal__container`}>
      <div className={`modal`}>
        <div className={`start-new-game-modal__content`}>
          <p>{message}</p>
          <button
            className={`start-new-game-modal__button`}
            onClick={() => navigate("/multiplayergame")}
          >
            Play a Friend
          </button>
          <button
            className={`start-new-game-modal__button`}
            onClick={handleStartNewGameVsComputer}
          >
            Play the Computer
          </button>
          <button className={`start-new-game-modal__cancel`} onClick={onCancel}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
