// src/App.jsx

import React from 'react'
import './styles/global.sass'
import { Header } from './components/Header/Header'
import { Banner } from './components/Banner/Banner'
import { BemVindo } from './components/BemVindo/BemVindo'
import { Sobre } from './components/Sobre/Sobre'
import { Variacao } from './components/Variacao/Variacao'
import { Visual } from './components/Visual/Visual'
import { Festa } from './components/Festa/Festa'
import { Contato } from './components/Contato/Contato'

// Componente principal da aplicação
function App() {
  return (
    <>
      {/* Cabeçalho fixo com logo e menu de navegação */}
      <Header />
      <main>
        {/* Banner principal da página */}
        <Banner />

        {/* Seção de boas-vindas com imagem lateral e botão */}
        <BemVindo />

        {/* Seção "Sobre nós" com texto descritivo e imagem */}
        <Sobre />

        {/* Seção de variações de doces com imagens */}
        <Variacao />

        {/* Seção com destaque visual de doces */}
        <Visual />

        {/* Seção com doces para festas (galeria de imagens) */}
        <Festa />

        {/* Formulário de contato com validação */}
        <Contato />
      </main>
    </>
  )
}

export default App