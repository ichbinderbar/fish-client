import React from "react";
import "./Modal.scss";

export default function Modal({ isVisible, onConfirm, onCancel, message }) {
  if (!isVisible) return null;

  return (
    <div className="modal__container">
      <div className="modal">
        <div className="modal__content">
          <p>{message}</p>
          <button className="modal__confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="modal__cancel" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
