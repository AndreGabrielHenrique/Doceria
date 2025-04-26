import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Configuração inicial do React com Strict Mode para detecção de práticas inseguras
createRoot(document.getElementById('root')).render(
  <StrictMode>  {/* Habilita verificações extras de desenvolvimento */}
    <App />      {/* Componente raiz da aplicação */}
  </StrictMode>,
)