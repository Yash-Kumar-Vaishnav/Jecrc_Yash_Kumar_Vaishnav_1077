import React, { useState } from "react";

function DisplayCard({ title, value, onChange, style }) {
  const [internalCount, setInternalCount] = useState(0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px",
        width: "220px",
        textAlign: "center",
        ...style
      }}
    >
      <h3>{title}</h3>

      <p>Props Value: {value}</p>
      <p>Internal Count: {internalCount}</p>

      <button
        onClick={() => setInternalCount((prev) => prev + 1)}
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "8px",
          margin: "5px",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Update Internal Count
      </button>

      <button
        onClick={onChange}
        style={{
          background: "#2196F3",
          color: "white",
          padding: "8px",
          margin: "5px",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Update Parent Count
      </button>
    </div>
  );
}

function StateVsPropsDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [parentStep, setParentStep] = useState(1);
  const [displayColor, setDisplayColor] = useState("lightblue");

  const handleParentCountChange = () => {
      setParentCount((prev) => prev + parentStep);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>State vs Props Demo</h2>

      <h3>Parent Count: {parentCount}</h3>

      <button
        onClick={() =>
          setParentStep((prev) => prev + 1)
        }
        style={{
          background: "#007bff",
          color: "white",
          padding: "10px",
          margin: "10px",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Increase Step (Current: {parentStep})
      </button>

      <button
        onClick={() =>
          setDisplayColor((prev) =>
            prev === "lightblue"
              ? "lightcoral"
              : "lightblue"
          )
        }
        style={{
          background: "#007bff",
          color: "white",
          padding: "10px",
          margin: "10px",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Toggle Color
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <DisplayCard
          title="Child 1"
          value={parentCount}
          onChange={handleParentCountChange}
          style={{ backgroundColor: displayColor }}
        />

        <DisplayCard
          title="Child 2"
          value={parentCount}
          onChange={handleParentCountChange}
          style={{ backgroundColor: displayColor }}
        />
      </div>
    </div>
  );
}

export default StateVsPropsDemo;