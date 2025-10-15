// Script de inicialização do MongoDB
// Este script é executado automaticamente quando o container MongoDB é criado

// Criar usuário para a aplicação
db = db.getSiblingDB('tech-challenge-blog');

// Criar coleção de posts se não existir
db.createCollection('posts');

// Criar índices para melhorar performance
db.posts.createIndex({ titulo: 'text', conteudo: 'text', resumo: 'text' });
db.posts.createIndex({ autor: 1 });
db.posts.createIndex({ createdAt: -1 });
db.posts.createIndex({ tags: 1 });
db.posts.createIndex({ ativo: 1 });

// Inserir alguns dados de exemplo para desenvolvimento
db.posts.insertMany([
  {
    titulo: 'Bem-vindo ao Tech Challenge Blog',
    conteudo: 'Este é um post de exemplo criado automaticamente durante a inicialização do banco de dados. Aqui você pode começar a criar seus próprios posts educacionais.',
    autor: 'Sistema',
    resumo: 'Post de boas-vindas ao sistema de blogging educacional.',
    tags: ['bem-vindo', 'exemplo', 'educação'],
    visualizacoes: 0,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    titulo: 'Como Usar Esta Plataforma',
    conteudo: 'Esta plataforma foi desenvolvida para conectar professores e alunos através de conteúdo educacional. Os professores podem criar posts sobre diversos temas, e os alunos podem acessar e buscar por conteúdo relevante.',
    autor: 'Equipe Tech Challenge',
    resumo: 'Guia de como utilizar a plataforma de blogging educacional.',
    tags: ['tutorial', 'guia', 'plataforma'],
    visualizacoes: 0,
    ativo: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Banco de dados inicializado com sucesso!');
print('Posts de exemplo criados.');
