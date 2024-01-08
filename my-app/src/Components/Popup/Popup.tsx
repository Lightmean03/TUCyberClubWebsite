import { useEffect, useRef } from "react";
import "./Popup.css";

export default function Popup({
  title,
  text,
  closePopup,
}: {
  title: string;
  text: string;
  closePopup: () => void;
}) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
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
}
