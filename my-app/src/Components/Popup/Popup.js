import React from "react";
import "./Popup.css";
export const Popup = ({ title, text, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1>{title}</h1>
        <p>{text}</p>
        <button onClick={closePopup}>Close X</button>
      </div>
    </div>
  );
};
