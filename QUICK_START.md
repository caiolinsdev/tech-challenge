# 🚀 Guia de Início Rápido

Este guia te ajudará a colocar a aplicação rodando em poucos minutos!

## ⚡ Início Super Rápido (5 minutos)

### 1. Clone e Instale
```bash
git clone https://github.com/seu-usuario/tech-challenge.git
cd tech-challenge
npm install
```

### 2. Configure Variáveis
```bash
cp env.example .env
# Edite o .env se necessário (padrões funcionam para desenvolvimento local)
```

### 3. Inicie com Docker (Recomendado)
```bash
npm run docker:dev
```

### 4. Popule com Dados de Exemplo
```bash
npm run populate
```

### 5. Teste a API
```bash
curl http://localhost:3000/api/health
```

🎉 **Pronto! Sua API está rodando em http://localhost:3000**

## 🔧 Início Manual (Sem Docker)

### Pré-requisitos
- Node.js 18+
- MongoDB rodando localmente

### Passos
```bash
# 1. Instalar dependências
npm install

# 2. Iniciar MongoDB (se não estiver rodando)
mongod

# 3. Iniciar aplicação
npm run dev

# 4. Popular banco (em outro terminal)
npm run populate
```

## 🧪 Testando a API

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Listar Posts
```bash
curl http://localhost:3000/api/posts
```

### Criar Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Meu Primeiro Post",
    "conteudo": "Este é o conteúdo do meu primeiro post educacional!",
    "autor": "Professor Teste",
    "tags": ["teste", "educação"]
  }'
```

### Buscar Posts
```bash
curl "http://localhost:3000/api/posts/search?q=educação"
```

## 📊 Verificando Funcionamento

### URLs Importantes
- **API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health
- **Posts**: http://localhost:3000/api/posts
- **Busca**: http://localhost:3000/api/posts/search?q=matemática

### Comandos Úteis
```bash
# Ver logs da aplicação
docker-compose logs -f app

# Parar containers
npm run docker:stop

# Executar testes
npm test

# Ver cobertura de testes
npm run test:coverage
```

## 🐛 Resolução de Problemas

### Porta 3000 já em uso
```bash
# Verificar o que está usando a porta
lsof -i :3000

# Matar processo (substitua PID pelo número retornado)
kill -9 PID
```

### MongoDB não conecta
```bash
# Verificar se MongoDB está rodando
brew services list | grep mongodb

# Iniciar MongoDB
brew services start mongodb-community
```

### Erro de permissão no Docker
```bash
# Dar permissão ao script
chmod +x scripts/populate-db.js
```

## 📚 Próximos Passos

1. **Explore a API**: Use o Postman ou Insomnia para testar todos os endpoints
2. **Leia a Documentação**: Consulte [README.md](README.md) para detalhes completos
3. **Veja Exemplos**: Consulte [API_EXAMPLES.md](API_EXAMPLES.md) para exemplos práticos
4. **Execute Testes**: Rode `npm test` para verificar se tudo está funcionando
5. **Personalize**: Modifique o código conforme suas necessidades

## 🆘 Precisa de Ajuda?

- 📖 **Documentação Completa**: [README.md](README.md)
- 🔍 **Exemplos de API**: [API_EXAMPLES.md](API_EXAMPLES.md)
- 🐛 **Issues**: Abra uma issue no GitHub
- 💬 **Suporte**: Entre em contato com a equipe

---

**Bem-vindo ao Tech Challenge Blog API!** 🎓✨
