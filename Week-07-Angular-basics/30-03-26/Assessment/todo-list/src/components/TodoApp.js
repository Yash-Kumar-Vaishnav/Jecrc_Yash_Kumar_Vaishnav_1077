import React, { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTodos([...todos, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      
      <div className="todo-container">

        <div className="header">
          <h2>📝 Todo List</h2>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleTheme}
            />
            <span className="slider">
              <span className="icon">
                {darkMode ? "🌙" : "☀️"}
              </span>
            </span>
          </label>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter Task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">

              <span
                className={todo.completed ? "completed" : ""}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? "☑" : "☐"} {todo.text}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTask(todo.id)}
              >
                ❌
              </button>

            </li>
          ))}
        </ul>

      </div>

    </div>
  );
}

export default TodoApp;