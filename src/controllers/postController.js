const Post = require('../models/Post');

// @desc    List all posts
// @route   GET /api/posts
// @access  Public
const listPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const term = req.query.q;

    // Search posts
    const posts = await Post.searchPosts(term, limit, page);
    const total = await Post.countPosts(term);
    
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts: total,
          hasNextPage,
          hasPrevPage,
          limit
        }
      },
      message: term ? `Encontrados ${total} posts para "${term}"` : `Total de ${total} posts`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search posts by term
// @route   GET /api/posts/search
// @access  Public
const searchPosts = async (req, res, next) => {
  try {
    const term = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (!term) {
      return res.status(400).json({
        success: false,
        message: 'Parâmetro de busca "q" é obrigatório'
      });
    }

    const posts = await Post.searchPosts(term, limit, page);
    const total = await Post.countPosts(term);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts: total,
          hasNextPage,
          hasPrevPage,
          limit
        },
        searchTerm: term
      },
      message: `Encontrados ${total} posts para "${term}"`
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a specific post
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    if (!post.ativo) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    // Increment views
    await post.incrementViews();

    res.json({
      success: true,
      data: post,
      message: 'Post encontrado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
const createPost = async (req, res, next) => {
  try {
    const { titulo, conteudo, autor, resumo, tags } = req.body;

    const post = await Post.create({
      titulo,
      conteudo,
      autor,
      resumo,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      data: post,
      message: 'Post criado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Public
const updatePost = async (req, res, next) => {
  try {
    const { titulo, conteudo, autor, resumo, tags } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    // Update only provided fields
    if (titulo !== undefined) post.titulo = titulo;
    if (conteudo !== undefined) post.conteudo = conteudo;
    if (autor !== undefined) post.autor = autor;
    if (resumo !== undefined) post.resumo = resumo;
    if (tags !== undefined) post.tags = tags;

    await post.save();

    res.json({
      success: true,
      data: post,
      message: 'Post atualizado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Public
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    // Soft delete - mark as inactive
    post.ativo = false;
    await post.save();

    res.json({
      success: true,
      message: 'Post excluído com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Permanently delete a post (hard delete)
// @route   DELETE /api/posts/:id/force
// @access  Public
const forceDeletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Post excluído permanentemente'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Restore a deleted post
// @route   PATCH /api/posts/:id/restore
// @access  Public
const restorePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    post.ativo = true;
    await post.save();

    res.json({
      success: true,
      data: post,
      message: 'Post restaurado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listPosts,
  searchPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  forceDeletePost,
  restorePost
};
