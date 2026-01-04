const User = require('../models/User');

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    // Find user by email (including password field)
    const user = await User.findOne({ email: email.toLowerCase(), active: true })
      .select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciais inválidas'
      });
    }

    // Remove password from response
    const userData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    res.json({
      success: true,
      data: userData,
      message: 'Login realizado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || !user.active) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    const userData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    res.json({
      success: true,
      data: userData,
      message: 'Usuário encontrado'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe
};

