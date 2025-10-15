# Exemplos de Uso da API

Este documento contém exemplos práticos de como usar a API do Tech Challenge Blog.

## 📋 Índice

- [Configuração Inicial](#configuração-inicial)
- [Exemplos de Requisições](#exemplos-de-requisições)
- [Cenários de Uso](#cenários-de-uso)
- [Tratamento de Erros](#tratamento-de-erros)

## 🔧 Configuração Inicial

### Base URL
```
http://localhost:3000/api
```

### Headers Recomendados
```http
Content-Type: application/json
Accept: application/json
```

## 📝 Exemplos de Requisições

### 1. Listar Todos os Posts

```http
GET /api/posts
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef0",
        "titulo": "Introdução ao JavaScript",
        "conteudo": "JavaScript é uma linguagem de programação...",
        "autor": "Prof. João Silva",
        "resumo": "Aprenda os conceitos básicos do JavaScript...",
        "tags": ["javascript", "programação", "iniciante"],
        "visualizacoes": 42,
        "ativo": true,
        "createdAt": "2023-07-01T10:30:00.000Z",
        "updatedAt": "2023-07-01T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalPosts": 1,
      "hasNextPage": false,
      "hasPrevPage": false,
      "limit": 10
    }
  },
  "message": "Total de 1 posts"
}
```

### 2. Criar um Novo Post

```http
POST /api/posts
Content-Type: application/json

{
  "titulo": "Matemática Básica - Operações Fundamentais",
  "conteudo": "As operações matemáticas fundamentais são a base de todo conhecimento matemático. Neste post, vamos explorar as quatro operações básicas: adição, subtração, multiplicação e divisão...",
  "autor": "Prof. Maria Santos",
  "resumo": "Aprenda as operações matemáticas fundamentais de forma simples e prática.",
  "tags": ["matemática", "básico", "operações", "educação"]
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef1",
    "titulo": "Matemática Básica - Operações Fundamentais",
    "conteudo": "As operações matemáticas fundamentais são a base de todo conhecimento matemático...",
    "autor": "Prof. Maria Santos",
    "resumo": "Aprenda as operações matemáticas fundamentais de forma simples e prática.",
    "tags": ["matemática", "básico", "operações", "educação"],
    "visualizacoes": 0,
    "ativo": true,
    "createdAt": "2023-07-01T11:00:00.000Z",
    "updatedAt": "2023-07-01T11:00:00.000Z"
  },
  "message": "Post criado com sucesso"
}
```

### 3. Buscar Posts por Termo

```http
GET /api/posts/search?q=javascript&page=1&limit=5
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "64a1b2c3d4e5f6789abcdef0",
        "titulo": "Introdução ao JavaScript",
        "conteudo": "JavaScript é uma linguagem de programação...",
        "autor": "Prof. João Silva",
        "resumo": "Aprenda os conceitos básicos do JavaScript...",
        "tags": ["javascript", "programação", "iniciante"],
        "visualizacoes": 42,
        "ativo": true,
        "createdAt": "2023-07-01T10:30:00.000Z",
        "updatedAt": "2023-07-01T10:30:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalPosts": 1,
      "hasNextPage": false,
      "hasPrevPage": false,
      "limit": 5
    },
    "searchTerm": "javascript"
  },
  "message": "Encontrados 1 posts para \"javascript\""
}
```

### 4. Obter um Post Específico

```http
GET /api/posts/64a1b2c3d4e5f6789abcdef0
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "titulo": "Introdução ao JavaScript",
    "conteudo": "JavaScript é uma linguagem de programação...",
    "autor": "Prof. João Silva",
    "resumo": "Aprenda os conceitos básicos do JavaScript...",
    "tags": ["javascript", "programação", "iniciante"],
    "visualizacoes": 43,
    "ativo": true,
    "createdAt": "2023-07-01T10:30:00.000Z",
    "updatedAt": "2023-07-01T10:30:00.000Z"
  },
  "message": "Post encontrado com sucesso"
}
```

### 5. Atualizar um Post

```http
PUT /api/posts/64a1b2c3d4e5f6789abcdef0
Content-Type: application/json

{
  "titulo": "JavaScript Avançado - Conceitos Modernos",
  "conteudo": "Este post foi atualizado para incluir conceitos mais avançados de JavaScript, incluindo ES6+, async/await, e padrões modernos de desenvolvimento...",
  "tags": ["javascript", "avançado", "es6", "async", "programação"]
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789abcdef0",
    "titulo": "JavaScript Avançado - Conceitos Modernos",
    "conteudo": "Este post foi atualizado para incluir conceitos mais avançados...",
    "autor": "Prof. João Silva",
    "resumo": "Aprenda os conceitos básicos do JavaScript...",
    "tags": ["javascript", "avançado", "es6", "async", "programação"],
    "visualizacoes": 43,
    "ativo": true,
    "createdAt": "2023-07-01T10:30:00.000Z",
    "updatedAt": "2023-07-01T12:00:00.000Z"
  },
  "message": "Post atualizado com sucesso"
}
```

### 6. Excluir um Post

```http
DELETE /api/posts/64a1b2c3d4e5f6789abcdef0
```

**Resposta:**
```json
{
  "success": true,
  "message": "Post excluído com sucesso"
}
```

### 7. Health Check

```http
GET /api/health
```

**Resposta:**
```json
{
  "success": true,
  "message": "API está funcionando corretamente",
  "timestamp": "2023-07-01T12:30:00.000Z",
  "uptime": 3600.123,
  "environment": "development"
}
```

## 🎯 Cenários de Uso

### Cenário 1: Professor Criando Conteúdo

```javascript
// 1. Criar post sobre História do Brasil
const novoPost = {
  titulo: "Independência do Brasil - 1822",
  conteudo: "A Independência do Brasil foi um processo histórico que culminou com a separação do Brasil de Portugal em 7 de setembro de 1822...",
  autor: "Prof. Ana Costa",
  resumo: "Entenda o processo de independência do Brasil e seus principais acontecimentos.",
  tags: ["história", "brasil", "independência", "1822", "educação"]
};

// 2. Atualizar post com mais informações
const atualizacao = {
  conteudo: "A Independência do Brasil foi um processo histórico complexo... [conteúdo expandido]",
  tags: ["história", "brasil", "independência", "1822", "educação", "D. Pedro I"]
};
```

### Cenário 2: Aluno Buscando Conteúdo

```javascript
// 1. Buscar posts sobre matemática
GET /api/posts/search?q=matemática&limit=10

// 2. Buscar posts por autor específico
GET /api/posts/search?q=Prof. Maria Santos

// 3. Listar posts mais recentes
GET /api/posts?page=1&limit=5
```

### Cenário 3: Gestão de Conteúdo

```javascript
// 1. Listar todos os posts para revisão
GET /api/posts?page=1&limit=20

// 2. Editar post com informações incorretas
PUT /api/posts/:id
{
  "titulo": "Título Corrigido",
  "conteudo": "Conteúdo corrigido..."
}

// 3. Excluir post desatualizado
DELETE /api/posts/:id
```

## ❌ Tratamento de Erros

### Erro de Validação

**Requisição:**
```http
POST /api/posts
Content-Type: application/json

{
  "titulo": "Título muito curto",
  "conteudo": "Conteúdo"
}
```

**Resposta:**
```json
{
  "success": false,
  "message": "Dados inválidos",
  "errors": [
    {
      "type": "field",
      "msg": "O título deve ter entre 3 e 200 caracteres",
      "path": "titulo",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "O conteúdo deve ter pelo menos 10 caracteres",
      "path": "conteudo",
      "location": "body"
    }
  ]
}
```

### Erro de Post Não Encontrado

**Requisição:**
```http
GET /api/posts/507f1f77bcf86cd799439011
```

**Resposta:**
```json
{
  "success": false,
  "message": "Post não encontrado"
}
```

### Erro de Busca Sem Termo

**Requisição:**
```http
GET /api/posts/search
```

**Resposta:**
```json
{
  "success": false,
  "message": "Parâmetro de busca \"q\" é obrigatório"
}
```

### Erro de Rate Limiting

**Resposta:**
```json
{
  "success": false,
  "message": "Muitas requisições deste IP, tente novamente em alguns minutos."
}
```

## 🔍 Dicas de Uso

### Paginação
- Use `page` para navegar entre páginas (começa em 1)
- Use `limit` para controlar quantos itens por página (máximo 50)
- Verifique `hasNextPage` e `hasPrevPage` para navegação

### Busca
- A busca é case-insensitive
- Busca em título, conteúdo e resumo
- Use termos específicos para resultados mais precisos

### Performance
- Use `limit` adequado para evitar carregamento lento
- A API implementa rate limiting para proteção
- Posts excluídos não aparecem nas listagens

### Validação
- Sempre valide dados antes de enviar
- Título: 3-200 caracteres
- Conteúdo: mínimo 10 caracteres
- Autor: 2-100 caracteres
- Máximo 10 tags por post

---

Para mais informações, consulte o [README.md](README.md) principal.
