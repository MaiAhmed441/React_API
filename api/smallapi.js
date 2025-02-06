const express = require('express');
const cors = require('cors');  // Import the CORS package
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Sample data (like a mini-database)
let users = [
    // { id: 1, name: 'Alice' },
    // { id: 2, name: 'Bob' }
];

// GET: Fetch all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST: Add a new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT: Update a user's name
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        user.name = req.body.name;
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// DELETE: Remove a user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId);
    res.json({ message: "User deleted" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
