import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const appStyle = {
    backgroundColor: isDark ? "#121212" : "#ffffff",
    color: isDark ? "#ffffff" : "#000000",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginTop: "20px",
    border: "none",
    cursor: "pointer",
    backgroundColor: isDark ? "#ffffff" : "#000000",
    color: isDark ? "#000000" : "#ffffff",
  };

  return (
    <div style={appStyle}>
      <h1>Mode: {isDark ? "Dark" : "Light"}</h1>

      <button style={buttonStyle} onClick={toggleTheme}>
        {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default App;