# Setup do Front-End - Tech Challenge Blog

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ e npm instalados
- Back-end da aplicação rodando na porta 3000

### Instalação e Execução

```bash
# 1. Navegar para a pasta do cliente
cd client

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em: **http://localhost:3001**

## 📋 Páginas e Rotas

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Lista de posts com busca | Público |
| `/post/:id` | Detalhes do post | Público |
| `/login` | Login para professores | Público |
| `/create` | Criar novo post | Autenticado |
| `/edit/:id` | Editar post existente | Autenticado |
| `/admin` | Painel administrativo | Autenticado |

## 🔐 Credenciais de Teste

Para acessar as páginas protegidas, use uma das seguintes credenciais:

- **Email**: `professor@escola.com` | **Senha**: `professor123`
- **Email**: `admin@escola.com` | **Senha**: `admin123`

## 📁 Estrutura do Front-End

```
client/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas da aplicação
│   ├── contexts/        # Context API (autenticação)
│   ├── services/        # Serviços e APIs
│   └── styles/          # Estilos globais
├── package.json
├── vite.config.js
└── README.md
```

## 🛠 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build de produção
npm run lint         # Executa ESLint
```

## 📚 Documentação Completa

Para mais informações, consulte o [README do cliente](./client/README.md).

