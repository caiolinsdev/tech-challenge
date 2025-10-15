const mongoose = require('mongoose');

// Configurações globais para testes
beforeAll(async () => {
  // Conectar ao banco de dados de teste
  const mongoUri = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/tech-challenge-blog-test';
  
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  // Limpar banco de dados de teste
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

// Configurar timeout para testes
jest.setTimeout(30000);
