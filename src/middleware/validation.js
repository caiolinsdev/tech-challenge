const { body, param, query, validationResult } = require('express-validator');

// Middleware to check validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: errors.array()
    });
  }
  next();
};

// Validations for post creation
const validateCreatePost = [
  body('titulo')
    .notEmpty()
    .withMessage('O título é obrigatório')
    .isLength({ min: 3, max: 200 })
    .withMessage('O título deve ter entre 3 e 200 caracteres')
    .trim(),
  
  body('conteudo')
    .notEmpty()
    .withMessage('O conteúdo é obrigatório')
    .isLength({ min: 10 })
    .withMessage('O conteúdo deve ter pelo menos 10 caracteres')
    .trim(),
  
  body('autor')
    .notEmpty()
    .withMessage('O autor é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('O nome do autor deve ter entre 2 e 100 caracteres')
    .trim(),
  
  body('resumo')
    .optional()
    .isLength({ max: 300 })
    .withMessage('O resumo não pode exceder 300 caracteres')
    .trim(),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('As tags devem ser um array')
    .custom((tags) => {
      if (tags && tags.length > 10) {
        throw new Error('Máximo de 10 tags permitidas');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validations for post updates
const validateUpdatePost = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido'),
  
  body('titulo')
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage('O título deve ter entre 3 e 200 caracteres')
    .trim(),
  
  body('conteudo')
    .optional()
    .isLength({ min: 10 })
    .withMessage('O conteúdo deve ter pelo menos 10 caracteres')
    .trim(),
  
  body('autor')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('O nome do autor deve ter entre 2 e 100 caracteres')
    .trim(),
  
  body('resumo')
    .optional()
    .isLength({ max: 300 })
    .withMessage('O resumo não pode exceder 300 caracteres')
    .trim(),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('As tags devem ser um array')
    .custom((tags) => {
      if (tags && tags.length > 10) {
        throw new Error('Máximo de 10 tags permitidas');
      }
      return true;
    }),
  
  handleValidationErrors
];

// Validation for ID parameter
const validateId = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido'),
  
  handleValidationErrors
];

// Validation for search
const validateSearch = [
  query('q')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Termo de busca deve ter entre 1 e 100 caracteres')
    .trim(),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Página deve ser um número inteiro maior que 0'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limite deve ser um número entre 1 e 50'),
  
  handleValidationErrors
];

module.exports = {
  validateCreatePost,
  validateUpdatePost,
  validateId,
  validateSearch,
  handleValidationErrors
};
