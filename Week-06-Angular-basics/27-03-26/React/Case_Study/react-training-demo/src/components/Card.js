import React from "react";

function Card({ title, content, icon, isFeaured = false}){
  return (
    <div style={{
      border: isFeaured ? "2px solid gold" : "1px solid #ccc",
      borderRadius: "8px",
      padding: "20px",
      margin: "10px",
      boxShadow: isFeaured ? "0 4px 8px rgba(255, 215, 0, 0.5)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white",
      width: "300px",
      textAlign: "center"
    }}
  >
    {icon && (
      <div style={{ fontSize: "24px", marginBottom: "10px" }}>
        {icon}
      </div>
    )}
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
  );
}

export default Card;