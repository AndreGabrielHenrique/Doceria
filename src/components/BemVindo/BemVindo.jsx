// src/components/BemVindo/BemVindo.jsx

import React, { useState } from 'react'
import './BemVindo.sass'
import banner3 from '../../assets/Imagens/banner3.jpg'

// Seção principal de boas-vindas
export const BemVindo = () => {
  // Estado para controlar mensagem do botão
  const [mensagem, setMensagem] = useState('')  
  
  return (
    <section className="bemvindo">
      {/* Título âncora para navegação */}
      <h2><a id="bemvindo">Seja bem vindo a Doceria</a></h2>
      
      {/* Container flexível desktop/tablet */}
      <div>
        {/* Imagem decorativa responsiva */}
        <img 
          src={banner3} 
          className="imagemlateral"  // Classe para dimensionamento
          alt="Boas vindas"  // Descrição para screen readers
        />
        
        {/* Bloco de conteúdo textual */}
        <aside>
          <p>Com localização na cidade de Docelândia, trazemos toda nossa tradição e dedicação em dar um toque adocicado em sua vida.</p>
          <p>Em uma variedade infindável de doces um mundo de puro açúcar chega até sua casa com toda comodidade e cordialidade da casa.</p>
          <p>Venha entrar em contato conosco, garantimos que sua vida será sempre doce e açucarada.</p>
          
          {/* Botão com feedback visual */}
          <button 
            type="button" 
            onClick={() => setMensagem('Ainda não disponível')}  // Atualização de estado
          >
            Leia mais
          </button>
          
          {/* Container dinâmico para mensagem */}
          <div id="naodisponivel">{mensagem}</div>  {/* Exibe estado local */}
        </aside>
      </div>
    </section>
  )
}