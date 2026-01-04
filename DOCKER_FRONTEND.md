# Docker - Front-End Setup

Este documento descreve como usar Docker para rodar o front-end da aplicação.

## 🐳 Configuração Docker para Front-End

O projeto agora inclui configuração Docker completa para o front-end, tanto para desenvolvimento quanto para produção.

## 📋 Arquivos Docker Criados

### Front-End

- `client/Dockerfile` - Dockerfile para produção (multi-stage build com Nginx)
- `client/Dockerfile.dev` - Dockerfile para desenvolvimento (hot reload)
- `client/nginx.conf` - Configuração do Nginx para produção
- `client/.dockerignore` - Arquivos ignorados no build

### Docker Compose

- `docker-compose.yml` - Atualizado com serviço `client` (produção)
- `docker-compose.dev.yml` - Atualizado com serviço `client` (desenvolvimento)

## 🚀 Uso

### Desenvolvimento

Para rodar em modo desenvolvimento com hot reload:

```bash
# Rodar todos os serviços (back-end, front-end e MongoDB)
docker-compose -f docker-compose.dev.yml up

# Ou em background
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f client

# Parar serviços
docker-compose -f docker-compose.dev.yml down
```

**Acesso:**
- Front-end: http://localhost:3001
- Back-end API: http://localhost:3000
- MongoDB: localhost:27017

### Produção

Para rodar em modo produção:

```bash
# Build e iniciar todos os serviços
docker-compose up --build

# Ou em background
docker-compose up -d --build

# Ver logs
docker-compose logs -f client

# Parar serviços
docker-compose down
```

**Acesso:**
- Front-end: http://localhost (porta 80)
- Back-end API: http://localhost:3000
- MongoDB: localhost:27017

## 🔧 Configurações

### Desenvolvimento

No modo desenvolvimento, o front-end usa:
- **Vite dev server** com hot reload
- **Porta 3001** exposta
- **Proxy** configurado para `/api` apontando para `app:3000` (via Docker network)
- **Volumes** montados para hot reload do código

### Produção

No modo produção, o front-end usa:
- **Multi-stage build** para otimizar tamanho da imagem
- **Nginx** para servir os arquivos estáticos
- **Porta 80** exposta
- **Proxy** configurado no Nginx para `/api` (opcional)
- **Cache** de arquivos estáticos otimizado
- **Gzip** compression habilitado

## 📝 Variáveis de Ambiente

### Front-End (Desenvolvimento)

No `docker-compose.dev.yml`, a variável `DOCKER_ENV=true` é definida automaticamente para que o proxy do Vite funcione corretamente dentro do Docker (usando `http://app:3000`).

Para desenvolvimento local (fora do Docker), o proxy usa `http://localhost:3000` automaticamente.

### Back-End (CORS)

O back-end está configurado para aceitar requisições de:
- `http://localhost:3001` (desenvolvimento local)
- `http://client:3001` (Docker network - desenvolvimento)
- `http://client:80` (Docker network - produção)

## 🔍 Estrutura dos Serviços Docker

### Desenvolvimento (`docker-compose.dev.yml`)

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   client    │─────▶│     app     │─────▶│   mongodb   │
│  (Vite)     │      │  (Express)  │      │  (MongoDB)  │
│  Port 3001  │      │  Port 3000  │      │  Port 27017 │
└─────────────┘      └─────────────┘      └─────────────┘
```

### Produção (`docker-compose.yml`)

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   client    │─────▶│     app     │─────▶│   mongodb   │
│  (Nginx)    │      │  (Express)  │      │  (MongoDB)  │
│  Port 80    │      │  Port 3000  │      │  Port 27017 │
└─────────────┘      └─────────────┘      └─────────────┘
```

## 🛠 Comandos Úteis

### Build individual

```bash
# Build do front-end apenas
cd client
docker build -t tech-challenge-client .
docker build -f Dockerfile.dev -t tech-challenge-client-dev .
```

### Rebuild sem cache

```bash
docker-compose build --no-cache client
```

### Entrar no container

```bash
# Desenvolvimento
docker-compose -f docker-compose.dev.yml exec client sh

# Produção
docker-compose exec client sh
```

### Limpar tudo

```bash
# Parar e remover containers, networks e volumes
docker-compose down -v

# Remover imagens também
docker-compose down --rmi all -v
```

## ⚠️ Notas Importantes

1. **Proxy no Vite**: No desenvolvimento, o Vite faz proxy das requisições `/api` para o back-end através da rede Docker (`app:3000`).

2. **Proxy no Nginx**: Em produção, o Nginx pode fazer proxy das requisições `/api` para o back-end. A configuração está no `nginx.conf`.

3. **CORS**: O back-end está configurado para aceitar requisições do front-end em ambos os ambientes (Docker e local).

4. **Hot Reload**: No desenvolvimento, alterações no código do front-end são refletidas automaticamente graças aos volumes montados.

5. **Networking**: Todos os serviços estão na mesma rede Docker (`app-network`), permitindo comunicação interna entre containers.

## 🐛 Troubleshooting

### Front-end não conecta com o back-end

Verifique se:
- O serviço `app` está rodando
- A rede Docker está funcionando: `docker network inspect tech-challenge_app-network`
- As portas não estão em conflito

### Erros de CORS

Certifique-se de que o back-end está configurado para aceitar requisições do front-end (já está no código).

### Build falha

Verifique:
- Node.js 18+ está disponível na imagem
- Arquivos `package.json` e `package-lock.json` estão presentes
- Sem erros de sintaxe no código

## 📚 Referências

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Vite Documentation](https://vitejs.dev/)
- [Nginx Documentation](https://nginx.org/en/docs/)

