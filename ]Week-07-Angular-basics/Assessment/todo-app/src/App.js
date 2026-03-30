import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Todo App</h1>

      {/* Input + Add Button */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Task"
        style={{ padding: "8px", width: "200px" }}
      />

      <button
        onClick={addTask}
        style={{ padding: "8px 12px", marginLeft: "10px" }}
      >
        Add
      </button>

      {/* Todo List */}
      <ul style={{ listStyle: "none", marginTop: "20px" }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                margin: "0 10px",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTask(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;