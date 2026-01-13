// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Configuração básica do Vite para React
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),  // Habilita suporte ao React
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/Imagens/*',   // Todas as imagens da Doceria
          dest: 'legacy/Imagens'
        },
        {
          src: 'legacy/script.js',
          dest: 'legacy'
        },
        {
          src: 'legacy/style.css',
          dest: 'legacy'
        }
      ]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        legacy: resolve(__dirname, 'legacy/index.html')
      }
    }
  },
  resolve: {}
})