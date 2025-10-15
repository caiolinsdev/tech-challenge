const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Post = require('../models/Post');

describe('API de Posts', () => {
  // Limpar banco antes de cada teste
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  // Clean up after all tests
  afterAll(async () => {
    // Connection cleanup is handled in setup.js
  });

  describe('GET /api/posts', () => {
    it('deve retornar lista vazia quando não há posts', async () => {
      const res = await request(app)
        .get('/api/posts')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.posts).toEqual([]);
      expect(res.body.data.pagination.totalPosts).toBe(0);
    });

    it('deve retornar lista de posts', async () => {
      // Criar posts de teste
      const posts = [
        {
          titulo: 'Post 1',
          conteudo: 'Conteúdo do primeiro post',
          autor: 'Autor 1'
        },
        {
          titulo: 'Post 2',
          conteudo: 'Conteúdo do segundo post',
          autor: 'Autor 2'
        }
      ];

      await Post.insertMany(posts);

      const res = await request(app)
        .get('/api/posts')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.posts).toHaveLength(2);
      expect(res.body.data.pagination.totalPosts).toBe(2);
    });
  });

  describe('POST /api/posts', () => {
    it('deve criar um novo post com dados válidos', async () => {
      const postData = {
        titulo: 'Novo Post',
        conteudo: 'Este é o conteúdo do novo post',
        autor: 'João Silva',
        tags: ['tecnologia', 'programação']
      };

      const res = await request(app)
        .post('/api/posts')
        .send(postData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.titulo).toBe(postData.titulo);
      expect(res.body.data.autor).toBe(postData.autor);
      expect(res.body.data.tags).toEqual(postData.tags);
    });

    it('deve retornar erro ao criar post sem título', async () => {
      const postData = {
        conteudo: 'Conteúdo sem título',
        autor: 'João Silva'
      };

      const res = await request(app)
        .post('/api/posts')
        .send(postData)
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Dados inválidos');
    });

    it('deve retornar erro ao criar post sem conteúdo', async () => {
      const postData = {
        titulo: 'Título sem conteúdo',
        autor: 'João Silva'
      };

      const res = await request(app)
        .post('/api/posts')
        .send(postData)
        .expect(400);

      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/posts/:id', () => {
    it('deve retornar um post específico', async () => {
      const post = await Post.create({
        titulo: 'Post para teste',
        conteudo: 'Conteúdo do post',
        autor: 'Autor Teste'
      });

      const res = await request(app)
        .get(`/api/posts/${post._id}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.titulo).toBe(post.titulo);
      expect(res.body.data.visualizacoes).toBe(1); // Deve incrementar visualizações
    });

    it('deve retornar 404 para post inexistente', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .get(`/api/posts/${fakeId}`)
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Post não encontrado');
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('deve atualizar um post existente', async () => {
      const post = await Post.create({
        titulo: 'Post Original',
        conteudo: 'Conteúdo original',
        autor: 'Autor Original'
      });

      const updateData = {
        titulo: 'Post Atualizado',
        conteudo: 'Conteúdo atualizado'
      };

      const res = await request(app)
        .put(`/api/posts/${post._id}`)
        .send(updateData)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.titulo).toBe(updateData.titulo);
      expect(res.body.data.conteudo).toBe(updateData.conteudo);
    });

    it('deve retornar 404 para post inexistente', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const res = await request(app)
        .put(`/api/posts/${fakeId}`)
        .send({ titulo: 'Novo título' })
        .expect(404);

      expect(res.body.success).toBe(false);
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('deve excluir um post (soft delete)', async () => {
      const post = await Post.create({
        titulo: 'Post para exclusão',
        conteudo: 'Conteúdo do post',
        autor: 'Autor'
      });

      const res = await request(app)
        .delete(`/api/posts/${post._id}`)
        .expect(200);

      expect(res.body.success).toBe(true);

      // Verificar se o post foi marcado como inativo
      const deletedPost = await Post.findById(post._id);
      expect(deletedPost.ativo).toBe(false);
    });
  });

  describe('GET /api/posts/search', () => {
    it('deve buscar posts por termo', async () => {
      const posts = [
        {
          titulo: 'JavaScript Avançado',
          conteudo: 'Aprenda JavaScript avançado',
          autor: 'João'
        },
        {
          titulo: 'Python para Iniciantes',
          conteudo: 'Introdução ao Python',
          autor: 'Maria'
        }
      ];

      await Post.insertMany(posts);

      const res = await request(app)
        .get('/api/posts/search?q=JavaScript')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.posts).toHaveLength(1);
      expect(res.body.data.posts[0].titulo).toBe('JavaScript Avançado');
    });

    it('deve retornar erro quando termo de busca não for fornecido', async () => {
      const res = await request(app)
        .get('/api/posts/search')
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('obrigatório');
    });
  });

  describe('GET /api/health', () => {
    it('deve retornar status de saúde da API', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('API está funcionando corretamente');
      expect(res.body.timestamp).toBeDefined();
      expect(res.body.uptime).toBeDefined();
    });
  });
});
