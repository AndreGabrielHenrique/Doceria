// Componente React para galeria de imagens "Delícia Visual" com modal interativo
// Local: src/components/Visual/Visual.jsx

import React, { useState, useEffect, useRef } from 'react'
import './Visual.sass'
// Importações otimizadas de imagens - bundler webpack trata como módulos
import galeria6 from '../../assets/Imagens/galeria6.jpg'
import galeria7 from '../../assets/Imagens/galeria7.jpg'
import galeria8 from '../../assets/Imagens/galeria8.jpg'
import swipe from '../../assets/Imagens/swipe.gif' // GIF animado para tutorial de swipe em dispositivos móveis

// Array estruturado com metadados das imagens (fonte e texto alternativo)
const imagens = [
  { src: galeria6, alt: 'De encher os olhos' },
  { src: galeria7, alt: 'Bolo' },
  { src: galeria8, alt: 'Mini cupcake' }
]

export const Visual = () => {
  const [indexAtivo, setIndexAtivo] = useState(null) // Índice da imagem atualmente aberta no modal (null = modal fechado)
  const [fechando, setFechando] = useState(false) // Estado para controlar animação de fechamento do modal

  // Estados para funcionalidade de swipe em dispositivos touch
  const [touchStartX, setTouchStartX] = useState(null) // Posição X inicial do toque
  const [touchEndX, setTouchEndX] = useState(null) // Posição X final do toque
  const [dragX, setDragX] = useState(0) // Valor de deslocamento horizontal durante arrasto
  const [arrastando, setArrastando] = useState(false) // Flag indicando se usuário está arrastando
  const [direcao, setDirecao] = useState(null) // 'left' | 'right' - direção da transição de navegação
  const [mostrarSwipe, setMostrarSwipe] = useState(false) // Controla exibição do hint de swipe

  const swipeTimer = useRef(null) // Referência para timer do tutorial de swipe

  // Fecha modal com animação de fade out
  const fecharModal = () => {
    setFechando(true)
    setTimeout(() => {
      setIndexAtivo(null)
      setFechando(false)
    }, 250)
  }

  // Navega para próxima imagem (comportamento circular)
  const proximo = () =>
    setIndexAtivo(i => (i + 1) % imagens.length)

  // Navega para imagem anterior (comportamento circular)
  const anterior = () =>
    setIndexAtivo(i => (i - 1 + imagens.length) % imagens.length)

  const minSwipeDistance = 50 // Distância mínima em pixels para considerar um swipe válido
  const isMobile = () => window.innerWidth < 800 // Função para detectar dispositivos móveis

  // Handler para início do toque (touchstart)
  const onTouchStart = (e) => {
    if (!isMobile()) return

    setArrastando(true)
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchEndX(null)
  }

  // Handler para movimento do toque (touchmove)
  const onTouchMove = (e) => {
    if (!isMobile() || !arrastando) return

    const currentX = e.targetTouches[0].clientX
    setTouchEndX(currentX)
    const delta = currentX - touchStartX
    setDragX(Math.max(Math.min(delta, 120), -120)) // Limita arrasto a ±120px para efeito visual
  }

  // Handler para término do toque (touchend)
  const onTouchEnd = () => {
    if (!isMobile()) return

    setArrastando(false)

    if (!touchStartX || !touchEndX) {
      setDragX(0)
      setTouchStartX(null)
      setTouchEndX(null)
      return
    }

    const distancia = touchStartX - touchEndX

    // Determina direção baseada na distância do swipe
    if (distancia > minSwipeDistance) {
      setDirecao('left')
      setTimeout(proximo, 200)
    } 
    else if (distancia < -minSwipeDistance) {
      setDirecao('right')
      setTimeout(anterior, 200)
    }

    // Reseta estados após animação de transição
    setTimeout(() => {
      setDragX(0)
      setDirecao(null)
      setTouchStartX(null)
      setTouchEndX(null)
    }, 350)
  }

  // Handler de clique que diferencia entre clique (fechar modal) e arrasto (navegar)
  const onClickImagem = () => {
    if (arrastando || Math.abs(dragX) > 5) return
    fecharModal()
  }

  // Efeito principal para gerenciar comportamentos quando modal está aberto
  useEffect(() => {
    // Trava scroll do body quando modal está aberto para evitar rolagem de fundo
    if (indexAtivo !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Handler para navegação por teclado
    const teclado = (e) => {
      if (indexAtivo === null) return
      if (e.key === 'Escape') fecharModal()
      if (e.key === 'ArrowRight') proximo()
      if (e.key === 'ArrowLeft') anterior()
    }

    // Handler para redimensionamento da janela
    const handleResize = () => {
      if (window.innerWidth >= 800) {
        setMostrarSwipe(false)
        clearTimeout(swipeTimer.current)
        swipeTimer.current = null
      } else {
        tentarMostrarSwipe()
      }
    }

    // Função para mostrar tutorial de swipe apenas na primeira vez
    const tentarMostrarSwipe = () => {
      if (indexAtivo === null) return
      if (window.innerWidth >= 800) return

      const jaViu = localStorage.getItem('swipe-hint-visto')
      if (jaViu) return

      if (swipeTimer.current) return // Timer já está em execução

      setMostrarSwipe(true)

      swipeTimer.current = setTimeout(() => {
        setMostrarSwipe(false)
        localStorage.setItem('swipe-hint-visto', '1') // Marca como visto no localStorage
        swipeTimer.current = null
      }, 3500) // Exibe por 3.5 segundos
    }

    // Adiciona event listeners
    document.addEventListener('keydown', teclado)
    window.addEventListener('resize', handleResize)

    // Verifica se deve mostrar tutorial de swipe
    if (indexAtivo !== null) {
      tentarMostrarSwipe()
    } else {
      setMostrarSwipe(false)
      clearTimeout(swipeTimer.current)
      swipeTimer.current = null
    }

    // Cleanup function - remove listeners e limpa timer
    return () => {
      document.removeEventListener('keydown', teclado)
      window.removeEventListener('resize', handleResize)
      clearTimeout(swipeTimer.current)
      swipeTimer.current = null
    }
  }, [indexAtivo])

  return (
    <>
      <section className="visual">
        {/* Título da seção com âncora para navegação interna */}
        <h3><a id="visual">Delícia visual</a></h3>
        {/* Container de imagens responsivo */}
        <div>
          {imagens.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              onClick={() => setIndexAtivo(i)} // Abre modal ao clicar na imagem
            />
          ))}
        </div>
      </section>
      
      {/* Modal condicional - renderizado apenas quando indexAtivo não é null */}
      {indexAtivo !== null && (
        <div className={`imagem-modal ${fechando ? 'fechando' : ''}`}>
          <div className="modal-conteudo">

            {/* Botão de navegação anterior (seta esquerda) */}
            <button
              className="nav prev"
              onClick={(e) => { e.stopPropagation(); anterior() }} // stopPropagation previne bubbling para o modal
            >
              ‹
            </button>

            <div className="imagem-wrapper">
              <img
                key={indexAtivo}  // 🔴 Chave dinâmica força re-render do componente e ativa animações CSS
                src={imagens[indexAtivo].src}
                alt={imagens[indexAtivo].alt}
                onClick={onClickImagem}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={`imagem-modal-img ${direcao || ''}`}
                style={{
                  transform: `translateX(${dragX}px)`, // Aplica deslocamento visual durante arrasto
                  transition: arrastando
                    ? 'none' // Remove transição durante arrasto para resposta imediata
                    : 'transform 0.35s cubic-bezier(.4,0,.2,1)' // Transição suave com easing personalizado
                }}
              />

              {/* GIF tutorial de swipe (apenas mobile) */}
              <img
                src={swipe}
                className={`swipe-hint ${mostrarSwipe ? 'ativa' : ''}`}
                alt="Deslize para os lados"
              />

            </div>

            {/* Botão de navegação próximo (seta direita) */}
            <button
              className="nav next"
              onClick={(e) => { e.stopPropagation(); proximo() }}
            >
              ›
            </button>

          </div>
        </div>
      )}
    </>
  )
}