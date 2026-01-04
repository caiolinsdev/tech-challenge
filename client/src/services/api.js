import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Posts API
export const postsAPI = {
  // Listar todos os posts
  getAll: (page = 1, limit = 10, searchTerm = '') => {
    const params = { page, limit }
    if (searchTerm) {
      params.q = searchTerm
    }
    return api.get('/posts', { params })
  },

  // Buscar posts
  search: (term, page = 1, limit = 10) => {
    return api.get('/posts/search', {
      params: { q: term, page, limit },
    })
  },

  // Obter um post específico
  getById: (id) => {
    return api.get(`/posts/${id}`)
  },

  // Registrar visualização de um post
  trackView: (id) => {
    return api.post(`/posts/${id}/view`)
  },

  // Criar um novo post
  create: (postData) => {
    return api.post('/posts', postData)
  },

  // Atualizar um post
  update: (id, postData) => {
    return api.put(`/posts/${id}`, postData)
  },

  // Excluir um post
  delete: (id) => {
    return api.delete(`/posts/${id}`)
  },
}

// Auth API
export const authAPI = {
  // Login
  login: (email, password) => {
    return api.post('/auth/login', { email, password })
  },
}

export default api

