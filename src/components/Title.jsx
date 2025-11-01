import React from 'react'

function Title({title, subTitle, align, font}) {
  return (
    <div className={`d-flex flex-column justify-content-center align-items-center text-center ${align === "left" ? "align-items-md-start text-md-start" : ""}`}>
        <h1 className={`fw-bold fs-2 fs-md-1 ${font || "font-playfair"}`}>{title}</h1>
        <p className="text-muted mt-2" style={{ fontSize: "0.9rem", maxWidth: "600px" }}>{subTitle}</p>
    </div>
  )
}

export default Title