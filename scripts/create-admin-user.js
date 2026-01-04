require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tech-challenge-blog';

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@escola.com' });
    
    if (existingAdmin) {
      console.log('Usuário admin já existe!');
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@escola.com',
      password: 'admin123', // Será hashada automaticamente pelo pre('save')
      name: 'Administrador',
      role: 'admin',
      active: true
    });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log('Email:', adminUser.email);
    console.log('Nome:', adminUser.name);
    console.log('Role:', adminUser.role);
    console.log('\n📝 Credenciais de login:');
    console.log('Email: admin@escola.com');
    console.log('Senha: admin123');

    await mongoose.connection.close();
    console.log('\nConexão fechada');
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
    process.exit(1);
  }
}

createAdminUser();

