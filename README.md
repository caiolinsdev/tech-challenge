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

- **Backend**: Node.js 18+
- **Framework**: Express.js
- **Banco de Dados**: MongoDB 7.0
- **Validação**: Express Validator
- **Testes**: Jest + Supertest
- **Containerização**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Segurança**: Helmet, CORS, Rate Limiting

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

```bash
# Iniciar MongoDB (se não estiver rodando)
mongod

# Executar em modo desenvolvimento
npm run dev

# Ou executar normalmente
npm start
```

A API estará disponível em: `http://localhost:3000`

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

## 🐳 Docker

### Desenvolvimento com Docker

```bash
# Iniciar ambiente de desenvolvimento
npm run docker:dev

# Parar ambiente de desenvolvimento
npm run docker:dev:stop
```

### Produção com Docker

```bash
# Construir e executar em produção
npm run docker:build
npm run docker:run

# Parar containers
npm run docker:stop
```

### Docker Compose Completo

```bash
# Iniciar todos os serviços (incluindo MongoDB Express)
docker-compose --profile tools up -d

# Apenas aplicação e MongoDB
docker-compose up -d
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
├── src/
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
├── package.json                # Dependências e scripts
└── README.md                   # Documentação
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

## 🚀 Deploy

### Opções de Deploy

1. **AWS ECS/Fargate**
2. **Google Cloud Run**
3. **Azure Container Instances**
4. **DigitalOcean App Platform**
5. **Heroku**
6. **Railway**

### Exemplo de Deploy no Heroku

```bash
# Instalar Heroku CLI
# Login
heroku login

# Criar app
heroku create tech-challenge-blog

# Configurar variáveis
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=mongodb+srv://...

# Deploy
git push heroku main
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

Desenvolvido pela equipe do Tech Challenge para conectar professores e alunos através da tecnologia.

## 📞 Suporte

Para dúvidas ou suporte, abra uma issue no repositório ou entre em contato com a equipe.

---

**Tech Challenge Blog API** - Conectando conhecimento através da tecnologia 🚀
