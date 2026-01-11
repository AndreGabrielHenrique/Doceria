// Configuração do ESLint para o projeto React com padrões modernos
// Local: eslint.config.js (na raiz do projeto)
// ESLint é uma ferramenta de linting estático para identificar padrões problemáticos no código JavaScript/JSX

// Importações dos plugins e configurações necessárias
import js from '@eslint/js'                 // Configurações recomendadas do JavaScript vanilla
import globals from 'globals'               // Definições de variáveis globais para diferentes ambientes
import reactHooks from 'eslint-plugin-react-hooks' // Plugin para regras dos React Hooks
import reactRefresh from 'eslint-plugin-react-refresh' // Plugin para regras do React Refresh (Fast Refresh)

// Exporta array de configurações do ESLint (configuração em formato flat config - ESLint v9+)
export default [
  // Primeira configuração: Ignora arquivos no diretório legacy (código antigo)
  {
    ignores: ['legacy/**'], // Ignora recursivamente todo conteúdo do diretório 'legacy/'
  },
  
  // Segunda configuração: Ignora diretório de build
  { ignores: ['dist'] }, // Ignora diretório 'dist' (build de produção)
  
  // Configuração principal para arquivos JavaScript/JSX
  {
    files: ['**/*.{js,jsx}'], // Aplica regras a todos os arquivos .js e .jsx em qualquer diretório
    
    languageOptions: {
      ecmaVersion: 2020, // Versão do ECMAScript suportada (ES2020)
      globals: globals.browser, // Define variáveis globais do ambiente browser (window, document, etc.)
      parserOptions: {
        ecmaVersion: 'latest', // Última versão do ECMAScript para parsing
        ecmaFeatures: { jsx: true }, // Habilita suporte a JSX no parser
        sourceType: 'module', // Usa módulos ES6 (import/export)
      },
    },
    
    plugins: {
      'react-hooks': reactHooks, // Plugin para regras dos React Hooks
      'react-refresh': reactRefresh, // Plugin para regras do React Refresh (Hot Reloading)
    },
    
    rules: {
      // Herda regras recomendadas do JavaScript
      ...js.configs.recommended.rules,
      
      // Herda regras recomendadas dos React Hooks
      ...reactHooks.configs.recommended.rules,
      
      // Regra personalizada: Previne variáveis não utilizadas (com exceção para padrões específicos)
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]' // Permite variáveis não utilizadas que começam com letra maiúscula ou underscore
        // Isso permite componentes React não utilizados durante desenvolvimento e constantes em maiúsculo
      }],
      
      // Regra do React Refresh: Garante que apenas componentes sejam exportados
      'react-refresh/only-export-components': [
        'warn', // Nível de severidade: warning (não quebra o build)
        { 
          allowConstantExport: true, // Permite exportação de constantes (além de componentes)
          // Útil para exportar configurações, constantes, etc.
        },
      ],
    },
  },
]