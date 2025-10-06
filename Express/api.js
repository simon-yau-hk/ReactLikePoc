// api.js - Advanced Express API
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Data storage (in-memory)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

let posts = [
  { id: 1, title: 'Hello World', content: 'This is my first post', userId: 1 },
  { id: 2, title: 'Express API', content: 'Building APIs with Express', userId: 2 }
];

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express API!',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      posts: '/api/posts',
      status: '/api/status'
    }
  });
});

// Users API
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser
  });
});

// Posts API
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    data: posts,
    count: posts.length
  });
});

app.post('/api/posts', (req, res) => {
  const { title, content, userId } = req.body;
  
  if (!title || !content || !userId) {
    return res.status(400).json({
      success: false,
      error: 'Title, content, and userId are required'
    });
  }
  
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    userId: parseInt(userId)
  };
  
  posts.push(newPost);
  
  res.status(201).json({
    success: true,
    data: newPost
  });
});

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

module.exports = app;