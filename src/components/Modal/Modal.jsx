import React from "react";
import "./Modal.scss";

export default function Modal({
  isVisible,
  onConfirm,
  onCancel,
  message,
  modifier,
  setInputValue,
}) {
  if (!isVisible) return null;

  return (
    <div className={`modal__container modal__container--${modifier}`}>
      <div className={`modal modal--${modifier}`}>
        <div className={`modal__content modal__content--${modifier}`}>
          <p>{message}</p>
          <input
            className={`modal__input modal__input--${modifier}`}
            onChange={(e) => setInputValue(e.target.value)}
          />
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
