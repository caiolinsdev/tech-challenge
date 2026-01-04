# Tech Challenge Blog API

Uma aplicação de blogging dinâmico desenvolvida com Node.js, Express e MongoDB para conectar professores e alunos através de uma plataforma educacional centralizada.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)
- [Testes](#testes)
- [CI/CD](#cicd)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)

## 🎯 Sobre o Projeto

Esta aplicação foi desenvolvida como parte do Tech Challenge, visando resolver o problema da falta de plataformas centralizadas para professores da rede pública compartilharem conhecimento com seus alunos. A API fornece uma base sólida para uma aplicação de blogging educacional, permitindo a criação, edição, busca e gestão de conteúdo acadêmico.

## 🛠 Tecnologias Utilizadas

### Back-End
- **Backend**: Node.js 18+
- **Framework**: Express.js
- **Banco de Dados**: MongoDB 7.0
- **Validação**: Express Validator
- **Testes**: Jest + Supertest
- **Containerização**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Segurança**: Helmet, CORS, Rate Limiting

### Front-End
- **React 18.2+**: Biblioteca JavaScript para construção de interfaces
- **React Router 6**: Roteamento e navegação
- **Styled Components 6**: Estilização com CSS-in-JS
- **Axios**: Cliente HTTP para requisições à API
- **Vite**: Build tool e dev server moderno
- **React Icons**: Biblioteca de ícones

## 📝 Requisitos Funcionais

### Endpoints Implementados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/posts` | Lista todos os posts (com paginação) |
| `GET` | `/api/posts/:id` | Obtém um post específico |
| `POST` | `/api/posts` | Cria um novo post |
| `PUT` | `/api/posts/:id` | Atualiza um post existente |
| `DELETE` | `/api/posts/:id` | Exclui um post (soft delete) |
| `GET` | `/api/posts/search` | Busca posts por palavra-chave |
| `GET` | `/api/health` | Health check da API |

### Funcionalidades Extras

- **Paginação**: Todos os endpoints de listagem suportam paginação
- **Busca Avançada**: Busca por título, conteúdo e resumo
- **Soft Delete**: Posts não são deletados permanentemente
- **Contador de Visualizações**: Tracking automático de visualizações
- **Validação Robusta**: Validação completa de dados de entrada
- **Rate Limiting**: Proteção contra abuso da API

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- MongoDB 7.0+
- Docker (opcional)
- Git

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/tech-challenge.git
cd tech-challenge
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

```bash
cp env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações do MongoDB
MONGODB_URI=mongodb://localhost:27017/tech-challenge-blog
MONGODB_TEST_URI=mongodb://localhost:27017/tech-challenge-blog-test

# Configurações de Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## ▶️ Executando a Aplicação

### Desenvolvimento Local

#### Back-End (API)

```bash
# Iniciar MongoDB (se não estiver rodando)
mongod

# Executar em modo desenvolvimento
npm run dev

# Ou executar normalmente
npm start
```

A API estará disponível em: `http://localhost:3000`

#### Front-End (React)

```bash
# Navegar para a pasta do cliente
cd client

# Instalar dependências (primeira vez)
npm install

# Executar em modo desenvolvimento
npm run dev
```

O front-end estará disponível em: `http://localhost:3001`

**Nota**: O front-end está configurado para fazer proxy das requisições `/api` para `http://localhost:3000`, então é necessário que o back-end esteja rodando simultaneamente.

### Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage

# Executar testes para CI
npm run test:ci
```

## 📚 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### 1. Listar Posts
```http
GET /posts?page=1&limit=10&q=termo
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "posts": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalPosts": 50,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 10
    }
  },
  "message": "Total de 50 posts"
}
```

### 2. Criar Post
```http
POST /posts
Content-Type: application/json

{
  "titulo": "Título do Post",
  "conteudo": "Conteúdo completo do post...",
  "autor": "Nome do Autor",
  "resumo": "Resumo opcional do post",
  "tags": ["tag1", "tag2"]
}
```

### 3. Obter Post
```http
GET /posts/:id
```

### 4. Atualizar Post
```http
PUT /posts/:id
Content-Type: application/json

{
  "titulo": "Novo Título",
  "conteudo": "Conteúdo atualizado..."
}
```

### 5. Excluir Post
```http
DELETE /posts/:id
```

### 6. Buscar Posts
```http
GET /posts/search?q=termo&page=1&limit=10
```

### 7. Health Check
```http
GET /health
```

**Serviços Disponíveis:**
- **API**: http://localhost:3000
- **MongoDB**: localhost:27017
- **MongoDB Express**: http://localhost:8081 (admin/admin123)

## 🧪 Testes

A aplicação possui uma suíte completa de testes incluindo:

- Testes unitários para modelos
- Testes de integração para endpoints
- Testes de validação
- Testes de busca e paginação
- Cobertura de código

```bash
# Executar testes com cobertura
npm run test:coverage
```

## 🔄 CI/CD

O projeto inclui um pipeline completo de CI/CD com GitHub Actions:

### Pipeline Inclui:

1. **Testes**: Execução automática de testes
2. **Linting**: Verificação de código
3. **Segurança**: Auditoria de dependências
4. **Build Docker**: Construção de imagem
5. **Deploy**: Deploy automático (configurável)

### Workflows:

- **CI**: Executado em PRs e pushes
- **Deploy**: Executado apenas na branch main/master

## 📁 Estrutura do Projeto

```
tech-challenge/
├── client/                      # Front-End React
│   ├── src/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── Layout.jsx       # Layout principal
│   │   │   ├── Header.jsx       # Cabeçalho com navegação
│   │   │   ├── Footer.jsx       # Rodapé
│   │   │   ├── Loading.jsx      # Componente de loading
│   │   │   └── Button.jsx       # Botão reutilizável
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── Home.jsx         # Lista de posts
│   │   │   ├── PostDetail.jsx   # Detalhes do post
│   │   │   ├── CreatePost.jsx   # Criar post
│   │   │   ├── EditPost.jsx     # Editar post
│   │   │   ├── Admin.jsx        # Painel administrativo
│   │   │   └── Login.jsx        # Login
│   │   ├── contexts/            # Context API
│   │   │   └── AuthContext.jsx  # Context de autenticação
│   │   ├── services/            # Serviços e APIs
│   │   │   └── api.js           # Cliente API e endpoints
│   │   ├── styles/              # Estilos globais
│   │   │   └── globalStyles.js  # Estilos globais
│   │   ├── App.jsx              # Componente principal
│   │   └── main.jsx             # Entry point
│   ├── index.html               # HTML template
│   ├── package.json             # Dependências do front-end
│   ├── vite.config.js           # Configuração do Vite
│   └── README.md                # Documentação do front-end
├── src/                         # Back-End Node.js
│   ├── config/
│   │   └── database.js          # Configuração do MongoDB
│   ├── controllers/
│   │   └── postController.js    # Lógica de negócio dos posts
│   ├── middleware/
│   │   ├── errorHandler.js      # Tratamento de erros
│   │   └── validation.js        # Validações de entrada
│   ├── models/
│   │   └── Post.js              # Modelo do Post
│   ├── routes/
│   │   ├── index.js             # Rotas principais
│   │   └── postRoutes.js        # Rotas de posts
│   ├── tests/
│   │   ├── setup.js             # Configuração de testes
│   │   └── post.test.js         # Testes dos posts
│   └── server.js                # Servidor principal
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline CI/CD
├── docker-compose.yml           # Docker Compose produção
├── docker-compose.dev.yml       # Docker Compose desenvolvimento
├── Dockerfile                   # Docker produção
├── Dockerfile.dev              # Docker desenvolvimento
├── jest.config.js              # Configuração Jest
├── package.json                # Dependências e scripts do back-end
└── README.md                   # Documentação principal
```

## 🔧 Configurações Adicionais

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor | 3000 |
| `NODE_ENV` | Ambiente de execução | development |
| `MONGODB_URI` | URI de conexão MongoDB | mongodb://localhost:27017/tech-challenge-blog |
| `MONGODB_TEST_URI` | URI MongoDB para testes | mongodb://localhost:27017/tech-challenge-blog-test |
| `RATE_LIMIT_WINDOW_MS` | Janela de rate limiting | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests por janela | 100 |

### Scripts Disponíveis

```bash
npm start              # Iniciar em produção
npm run dev            # Iniciar em desenvolvimento
npm test               # Executar testes
npm run test:watch     # Testes em modo watch
npm run test:coverage  # Testes com cobertura
npm run lint           # Verificar código
npm run lint:fix       # Corrigir problemas de lint
npm run docker:build   # Construir imagem Docker
npm run docker:run     # Executar com Docker Compose
npm run docker:dev     # Executar ambiente de desenvolvimento
```


## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🎨 Front-End

O front-end foi desenvolvido em React e está localizado na pasta `client/`. Para mais informações sobre o front-end, consulte o [README do cliente](./client/README.md).

### Funcionalidades do Front-End

- ✅ Página principal com lista de posts e busca
- ✅ Página de leitura de post completo
- ✅ Página de criação de postagens (autenticado)
- ✅ Página de edição de postagens (autenticado)
- ✅ Página administrativa com gerenciamento completo (autenticado)
- ✅ Sistema de autenticação para professores
- ✅ Design responsivo e moderno
- ✅ Integração completa com API REST

## 👥 Equipe

Desenvolvido por Caio Lins Magno Ferreira, o Tech Challenge para conectar professores e alunos através da tecnologia.

---

**Tech Challenge Blog** - Conectando conhecimento através da tecnologia 🚀
