import React from "react";
import "./loader.css";
interface ShowProp {
  show: boolean;
}
export default function Loader({ show }: ShowProp) {
  return (
    <div className={`${show ? "loader d-flex" : "d-none"}`}>
      <div className="loading-animation">
        <div>
          <img src="/assert/infinity.gif" alt="infinity" className="giif" />
        </div>
      </div>
    </div>
  );
}
