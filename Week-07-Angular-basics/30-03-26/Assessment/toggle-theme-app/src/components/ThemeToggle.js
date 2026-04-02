import React, { useState } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="card">
        <h3>
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </h3>

        <button className="toggle-btn" onClick={toggleTheme}>
          {darkMode ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
    </div>
  );
}

export default ThemeToggle;