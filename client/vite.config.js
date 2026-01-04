import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Determinar o target da API baseado no ambiente
// No Docker: usa o nome do serviço 'app' na rede Docker
// Localmente: usa localhost
const getApiTarget = () => {
  // Se estiver rodando no Docker, usa o nome do serviço
  if (process.env.DOCKER_ENV === 'true') {
    return 'http://app:3000'
  }
  // Para desenvolvimento local, usa localhost
  return 'http://localhost:3000'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acesso de fora do container
    port: 3001,
    proxy: {
      '/api': {
        target: getApiTarget(),
        changeOrigin: true,
      },
    },
  },
})
