const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data
let users = [
  { id: 1, name: "Yash" }
];

// GET API
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST API
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json({ message: "User added", data: newUser });
});

// Server run
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});