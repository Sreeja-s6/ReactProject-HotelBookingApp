import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Title({ title, subTitle, align, font }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center text-center ${
        align === "left" ? "align-items-md-start text-md-start" : ""
      }`}
    >
      <h1
        className={`fw-bold fs-2 fs-md-1 ${font || "font-playfair"}`}
        style={{
          color: theme === "dark" ? "#f5f5f5" : "#111",
        }}
      >
        {title}
      </h1>

      <p
        className="mt-2"
        style={{
          fontSize: "0.9rem",
          maxWidth: "600px",
          color: theme === "dark" ? "#ccc" : "#6c757d", // ✅ visible subtitle
        }}
      >
        {subTitle}
      </p>
    </div>
  );
}

export default Title;
