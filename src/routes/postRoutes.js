const express = require('express');
const router = express.Router();
const {
  listPosts,
  searchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  forceDeletePost,
  restorePost
} = require('../controllers/postController');

const {
  validateCreatePost,
  validateUpdatePost,
  validateId,
  validateSearch
} = require('../middleware/validation');

// Public routes
router.get('/', validateSearch, listPosts);
router.get('/search', validateSearch, searchPosts);
router.get('/:id', validateId, getPost);
router.post('/', validateCreatePost, createPost);
router.put('/:id', validateUpdatePost, updatePost);
router.delete('/:id', validateId, deletePost);

// Administrative routes (optional for advanced management)
router.delete('/:id/force', validateId, forceDeletePost);
router.patch('/:id/restore', validateId, restorePost);

module.exports = router;
