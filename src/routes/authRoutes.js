const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { validateLogin } = require('../middleware/validation');

// Public routes
router.post('/login', validateLogin, login);

// Protected routes (if needed in the future)
// router.get('/me', authenticate, getMe);

module.exports = router;

