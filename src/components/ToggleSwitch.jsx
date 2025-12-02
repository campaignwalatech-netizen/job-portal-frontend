import React from "react";

export default function ToggleSwitch({ value, onChange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: "44px",
        height: "24px",
        borderRadius: "24px",
        background: value ? "#0b63f8" : "#cbd5e1",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s ease",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: "2px",
          left: value ? "22px" : "2px",
          transition: "left 0.2s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      ></div>
    </div>
  );
}
