const express = require('express');
const router = express.Router();

// Import routes
const postRoutes = require('./postRoutes');

// Logging middleware for routes
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
router.use('/posts', postRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API está funcionando corretamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bem-vindo à API do Tech Challenge Blog',
    version: '1.0.0',
    endpoints: {
      posts: '/api/posts',
      search: '/api/posts/search',
      health: '/api/health'
    },
    documentation: 'Consulte o README.md para mais informações'
  });
});

module.exports = router;
