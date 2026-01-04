# Tech Challenge Blog - Front-End

Interface gráfica desenvolvida em React para a aplicação de blogging educacional do Tech Challenge.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos Funcionais](#requisitos-funcionais)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Páginas e Funcionalidades](#páginas-e-funcionalidades)
- [Autenticação](#autenticação)

## 🎯 Sobre o Projeto

Esta é a interface gráfica do Tech Challenge Blog, desenvolvida em React com foco em proporcionar uma experiência de usuário excelente tanto para professores quanto para estudantes. A aplicação permite visualizar, criar, editar e gerenciar posts educacionais através de uma interface moderna e responsiva.

## 🛠 Tecnologias Utilizadas

- **React 18.2+** - Biblioteca JavaScript para construção de interfaces
- **React Router 6** - Roteamento e navegação
- **Styled Components 6** - Estilização com CSS-in-JS
- **Axios** - Cliente HTTP para requisições à API
- **Vite** - Build tool e dev server moderno
- **React Icons** - Biblioteca de ícones

## 📝 Requisitos Funcionais

### ✅ Páginas Implementadas

1. **Página Principal (Lista de Posts)**
   - Exibe lista de todos os posts disponíveis
   - Mostra título, autor e descrição resumida
   - Campo de busca para filtrar posts por palavras-chave
   - Paginação de resultados
   - Design responsivo em cards

2. **Página de Leitura de Post**
   - Exibe conteúdo completo do post
   - Mostra informações do autor, data e visualizações
   - Exibe tags do post
   - Botão para voltar à lista

3. **Página de Criação de Postagens**
   - Formulário completo para criação de posts
   - Campos: título, autor, resumo, conteúdo e tags
   - Validação de campos
   - Feedback visual de sucesso/erro

4. **Página de Edição de Postagens**
   - Carrega dados atuais do post para edição
   - Formulário pré-preenchido
   - Validação de campos
   - Atualização via API

5. **Página Administrativa**
   - Lista completa de todas as postagens
   - Tabela com informações resumidas
   - Ações: visualizar, editar e excluir
   - Confirmação antes de excluir
   - Paginação

6. **Autenticação**
   - Página de login
   - Proteção de rotas (criação, edição e admin)
   - Gerenciamento de sessão via Context API
   - Persistência de autenticação

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ e npm
- Back-end da aplicação rodando (porta 3000)

### 1. Instalar Dependências

```bash
cd client
npm install
```

### 2. Configurar Variáveis de Ambiente (Opcional)

O front-end está configurado para se conectar ao back-end em `http://localhost:3000` por padrão. Se necessário, ajuste o proxy no arquivo `vite.config.js`.

## ▶️ Executando a Aplicação

### Modo de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3001`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview da Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
client/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Layout.jsx       # Layout principal (Header + Footer)
│   │   ├── Header.jsx       # Cabeçalho com navegação
│   │   ├── Footer.jsx       # Rodapé
│   │   ├── Loading.jsx      # Componente de loading
│   │   └── Button.jsx       # Botão reutilizável
│   ├── pages/               # Páginas da aplicação
│   │   ├── Home.jsx         # Lista de posts
│   │   ├── PostDetail.jsx   # Detalhes do post
│   │   ├── CreatePost.jsx   # Criar post
│   │   ├── EditPost.jsx     # Editar post
│   │   ├── Admin.jsx        # Painel administrativo
│   │   └── Login.jsx        # Login
│   ├── contexts/            # Context API
│   │   └── AuthContext.jsx  # Context de autenticação
│   ├── services/            # Serviços e APIs
│   │   └── api.js           # Cliente API e endpoints
│   ├── styles/              # Estilos globais
│   │   └── globalStyles.js  # Estilos globais com Styled Components
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point
├── index.html               # HTML template
├── package.json             # Dependências e scripts
├── vite.config.js           # Configuração do Vite
└── README.md                # Este arquivo
```

## 📄 Páginas e Funcionalidades

### Home (Página Principal)

- **Rota**: `/`
- **Acesso**: Público
- **Funcionalidades**:
  - Lista todos os posts em formato de cards
  - Busca em tempo real (debounce de 500ms)
  - Paginação
  - Informações: título, autor, data, visualizações, tags
  - Design responsivo

### Post Detail (Detalhes do Post)

- **Rota**: `/post/:id`
- **Acesso**: Público
- **Funcionalidades**:
  - Exibe conteúdo completo
  - Metadados (autor, data, visualizações)
  - Tags
  - Botão para voltar

### Create Post (Criar Post)

- **Rota**: `/create`
- **Acesso**: Autenticado (Professores)
- **Funcionalidades**:
  - Formulário completo
  - Validação de campos
  - Criação via API
  - Redirecionamento após criação

### Edit Post (Editar Post)

- **Rota**: `/edit/:id`
- **Acesso**: Autenticado (Professores)
- **Funcionalidades**:
  - Carrega dados do post
  - Formulário pré-preenchido
  - Atualização via API
  - Redirecionamento após atualização

### Admin (Painel Administrativo)

- **Rota**: `/admin`
- **Acesso**: Autenticado (Professores)
- **Funcionalidades**:
  - Lista completa de posts
  - Tabela com ações
  - Edição e exclusão
  - Modal de confirmação para exclusão
  - Paginação

### Login

- **Rota**: `/login`
- **Acesso**: Público
- **Funcionalidades**:
  - Autenticação de professores
  - Validação de credenciais
  - Redirecionamento após login

## 🔐 Autenticação

A autenticação é gerenciada através do `AuthContext` usando React Context API.

### Credenciais de Teste

Por padrão, as seguintes credenciais estão configuradas:

- **Email**: `professor@escola.com` | **Senha**: `professor123`
- **Email**: `admin@escola.com` | **Senha**: `admin123`

### Rotas Protegidas

As seguintes rotas requerem autenticação:

- `/create` - Criar post
- `/edit/:id` - Editar post
- `/admin` - Painel administrativo

### Funcionalidades de Autenticação

- Login/Logout
- Persistência de sessão (localStorage)
- Proteção de rotas
- Redirecionamento automático

## 🎨 Design e Estilização

A aplicação utiliza **Styled Components** para estilização, proporcionando:

- **Design Moderno**: Interface limpa e profissional
- **Responsividade**: Funciona bem em mobile e desktop
- **Temas**: Cores e gradientes consistentes
- **Componentes Estilizados**: Cada componente com seus próprios estilos
- **Transições**: Animações suaves para melhor UX

### Paleta de Cores

- **Primária**: Gradiente roxo (#667eea → #764ba2)
- **Sucesso**: Verde (#27ae60)
- **Erro**: Vermelho (#e74c3c)
- **Informação**: Azul (#3498db)
- **Fundo**: Cinza claro (#f5f5f5)

## 📱 Responsividade

A aplicação é totalmente responsiva, com breakpoints para:

- **Desktop**: > 768px
- **Tablet**: 768px
- **Mobile**: < 768px

Todos os componentes se adaptam automaticamente ao tamanho da tela.

## 🔄 Integração com Back-End

O front-end se integra com a API REST do back-end através do serviço `api.js`, que utiliza Axios para fazer requisições HTTP.

### Endpoints Utilizados

- `GET /api/posts` - Listar posts
- `GET /api/posts/:id` - Obter post específico
- `GET /api/posts/search` - Buscar posts
- `POST /api/posts` - Criar post
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Excluir post

### Proxy de Desenvolvimento

O Vite está configurado com proxy para redirecionar requisições `/api` para `http://localhost:3000` durante o desenvolvimento.

## 🧪 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build de produção
npm run lint         # Executa ESLint
```

## 📚 Próximos Passos

Melhorias futuras sugeridas:

- [ ] Implementar autenticação real com JWT
- [ ] Adicionar sistema de comentários nos posts
- [ ] Implementar upload de imagens
- [ ] Adicionar filtros avançados de busca
- [ ] Implementar favoritos/recursos salvos
- [ ] Adicionar modo escuro/claro
- [ ] Melhorar acessibilidade (ARIA labels)
- [ ] Adicionar testes unitários e de integração

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto faz parte do Tech Challenge e está sob a licença MIT.

---

**Tech Challenge Blog Front-End** - Conectando conhecimento através da tecnologia 🚀

