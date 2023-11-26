import React, { useEffect, useRef } from "react";
import "./Popup.css";

export const Popup = ({ title, text, closePopup }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closePopup]);

  return (
    <div className="popup-container">
      <div ref={popupRef} className="popup-body">
        <h1 className="popup-title">{title}</h1>
        <br />
        <br />
        <p>{text}</p>
        <br />
        <button className="popup-close-button" onClick={closePopup}>
          Close
        </button>
      </div>
    </div>
  );
};
