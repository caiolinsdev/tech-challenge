const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true,
    minlength: [3, 'O título deve ter pelo menos 3 caracteres'],
    maxlength: [200, 'O título não pode exceder 200 caracteres']
  },
  conteudo: {
    type: String,
    required: [true, 'O conteúdo é obrigatório'],
    trim: true,
    minlength: [10, 'O conteúdo deve ter pelo menos 10 caracteres']
  },
  autor: {
    type: String,
    required: [true, 'O autor é obrigatório'],
    trim: true,
    minlength: [2, 'O nome do autor deve ter pelo menos 2 caracteres'],
    maxlength: [100, 'O nome do autor não pode exceder 100 caracteres']
  },
  resumo: {
    type: String,
    trim: true,
    maxlength: [300, 'O resumo não pode exceder 300 caracteres']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  visualizacoes: {
    type: Number,
    default: 0
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true, versionKey: false },
  toObject: { virtuals: true, versionKey: false }
});

// Indexes to improve search performance
postSchema.index({ titulo: 'text', conteudo: 'text', resumo: 'text' });
postSchema.index({ autor: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1 });

// Virtual for automatic summary if not provided
postSchema.pre('save', function(next) {
  if (!this.resumo && this.conteudo) {
    this.resumo = this.conteudo.substring(0, 200) + (this.conteudo.length > 200 ? '...' : '');
  }
  next();
});

// Method to increment views
postSchema.methods.incrementViews = function() {
  this.visualizacoes += 1;
  return this.save();
};

// Static method to search posts
postSchema.statics.searchPosts = function(term, limit = 10, page = 1) {
  const skip = (page - 1) * limit;
  
  const query = term 
    ? { $text: { $search: term }, ativo: true }
    : { ativo: true };
    
  return this.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-__v');
};

// Static method to count total posts
postSchema.statics.countPosts = function(term) {
  const query = term 
    ? { $text: { $search: term }, ativo: true }
    : { ativo: true };
    
  return this.countDocuments(query);
};

module.exports = mongoose.model('Post', postSchema);
