// Componente React para a seção de Boas-Vindas
// Local: src/components/BemVindo/BemVindo.jsx

// Importações necessárias do React e assets
import React, { useState, useEffect, useRef } from 'react'
import './BemVindo.sass' // Estilos específicos do componente (SASS)
import banner3 from '../../assets/Imagens/banner3.jpg' // Imagem local

// Componente funcional principal
export const BemVindo = () => {
  // Estado para controlar a mensagem exibida pelo botão "Leia mais"
  const [mensagem, setMensagem] = useState('')
  
  // Referência para o botão para manipulação de eventos de clique externo
  const botaoRef = useRef(null)
  
  // Efeito que gerencia o comportamento de fechar a mensagem ao clicar fora
  useEffect(() => {
    // Se não há mensagem, não configura os listeners
    if (!mensagem) return

    // Função que fecha a mensagem ao detectar clique ou foco fora do botão
    const fechar = (e) => {
      // Verifica se o clique foi dentro do botão (mantém mensagem aberta)
      if (botaoRef.current && botaoRef.current.contains(e.target)) return
      
      // Fecha a mensagem se clique/foco foi fora
      setMensagem('')
    }

    // Adiciona listeners para clique e eventos de foco (Tab/Shift+Tab)
    document.addEventListener('click', fechar)
    document.addEventListener('focusin', fechar) // Captura navegação por teclado

    // Cleanup function: remove listeners quando componente desmonta ou mensagem muda
    return () => {
      document.removeEventListener('click', fechar)
      document.removeEventListener('focusin', fechar)
    }
  }, [mensagem]) // Dependência: executa efeito sempre que mensagem mudar
  
  // Retorno do JSX que compõe o componente
  return (
    <section className="bemvindo">
      {/* Título da seção com âncora para navegação interna */}
      <h2><a id="bemvindo">Seja bem vindo a Doceria</a></h2>
      
      {/* Container flexível: layout linha (desktop) ou coluna (mobile) via CSS */}
      <div>
        {/* Imagem decorativa responsiva com classe para estilização */}
        <img 
          src={banner3} 
          className="imagemlateral"  // Classe CSS para controle de dimensões
          alt="Boas vindas"  // Texto alternativo para acessibilidade (screen readers)
        />
        
        {/* Container de conteúdo textual */}
        <aside>
          {/* Parágrafos descritivos sobre a doceria */}
          <p>Com localização na cidade de Docelândia, trazemos toda nossa tradição e dedicação em dar um toque adocicado em sua vida.</p>
          <p>Em uma variedade infindável de doces um mundo de puro açúcar chega até sua casa com toda comodidade e cordialidade da casa.</p>
          <p>Venha entrar em contato conosco, garantimos que sua vida será sempre doce e açucarada.</p>
          
          {/* Botão interativo com ref para controle de eventos */}
          <button 
            ref={botaoRef}  // Referência para manipulação DOM
            type="button" 
            onClick={(e) => {
              e.stopPropagation()  // Previne propagação do evento para elementos pai
              setMensagem('Ainda não disponível')  // Atualiza estado com mensagem
            }}
          >
            Leia mais
          </button>
          
          {/* Container dinâmico que exibe a mensagem baseada no estado */}
          <div id="naodisponivel">{mensagem}</div>
        </aside>
      </div>
    </section>
  )
}