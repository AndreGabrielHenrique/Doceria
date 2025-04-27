// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração básica do Vite para React
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],  // Habilita suporte ao React
})