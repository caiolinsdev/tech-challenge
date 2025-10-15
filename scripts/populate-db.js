#!/usr/bin/env node

/**
 * Script para popular o banco de dados com dados de exemplo
 * Uso: node scripts/populate-db.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Importar o modelo
const Post = require('../src/models/Post');

// Conectar ao banco de dados
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tech-challenge-blog';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error.message);
    process.exit(1);
  }
};

// Função para popular o banco
const populateDatabase = async () => {
  try {
    console.log('🔄 Iniciando população do banco de dados...');

    // Ler dados de exemplo
    const sampleDataPath = path.join(__dirname, '..', 'sample-data.json');
    const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));

    // Limpar posts existentes (opcional)
    const shouldClear = process.argv.includes('--clear');
    if (shouldClear) {
      console.log('🗑️  Limpando posts existentes...');
      await Post.deleteMany({});
      console.log('✅ Posts existentes removidos');
    }

    // Verificar se já existem posts
    const existingPosts = await Post.countDocuments();
    if (existingPosts > 0 && !shouldClear) {
      console.log(`⚠️  Já existem ${existingPosts} posts no banco. Use --clear para limpar antes de popular.`);
      return;
    }

    // Inserir posts de exemplo
    console.log(`📝 Inserindo ${sampleData.posts.length} posts de exemplo...`);
    
    for (const postData of sampleData.posts) {
      const post = new Post(postData);
      await post.save();
      console.log(`✅ Post criado: "${post.titulo}"`);
    }

    console.log('🎉 Banco de dados populado com sucesso!');
    console.log(`📊 Total de posts: ${await Post.countDocuments()}`);

  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error.message);
  }
};

// Função para exibir estatísticas
const showStats = async () => {
  try {
    const totalPosts = await Post.countDocuments();
    const postsByAuthor = await Post.aggregate([
      { $group: { _id: '$autor', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const tagsCount = await Post.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    console.log('\n📈 Estatísticas do Banco de Dados:');
    console.log(`📝 Total de posts: ${totalPosts}`);
    
    console.log('\n👥 Posts por autor:');
    postsByAuthor.forEach(author => {
      console.log(`   ${author._id}: ${author.count} posts`);
    });

    console.log('\n🏷️  Top 10 tags mais usadas:');
    tagsCount.forEach(tag => {
      console.log(`   ${tag._id}: ${tag.count} posts`);
    });

  } catch (error) {
    console.error('❌ Erro ao exibir estatísticas:', error.message);
  }
};

// Função principal
const main = async () => {
  console.log('🚀 Script de População do Banco de Dados');
  console.log('=====================================\n');

  await connectDB();
  await populateDatabase();
  await showStats();

  console.log('\n✅ Script finalizado!');
  await mongoose.connection.close();
  process.exit(0);
};

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
  });
}

module.exports = { populateDatabase, showStats };
