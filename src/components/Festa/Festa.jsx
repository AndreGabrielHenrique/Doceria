// Componente React para galeria de imagens "Doce Festa" com modal interativo
// Local: src/components/Festa/Festa.jsx

import React, { useState, useEffect, useRef } from 'react'
import './Festa.sass'
// Importação otimizada das imagens da galeria
import galeria9 from '../../assets/Imagens/galeria9.jpg'
import galeria10 from '../../assets/Imagens/galeria10.jpg'
import galeria11 from '../../assets/Imagens/galeria11.jpg'
import galeria12 from '../../assets/Imagens/galeria12.jpg'
import swipe from '../../assets/Imagens/swipe.gif' // GIF tutorial para mobile

// Array de objetos contendo src e alt para melhor organização e acessibilidade
const imagens = [
  { src: galeria9, alt: 'Panqueca doce' },
  { src: galeria10, alt: 'Beijinho' },
  { src: galeria11, alt: 'Mousse' },
  { src: galeria12, alt: 'Doces infinitos' }
]

export const Festa = () => {
  const [indexAtivo, setIndexAtivo] = useState(null) // Índice da imagem ativa no modal (null = fechado)
  const [fechando, setFechando] = useState(false) // Controla animação de fechamento

  // Estados para funcionalidade de swipe (mobile)
  const [touchStartX, setTouchStartX] = useState(null)
  const [touchEndX, setTouchEndX] = useState(null)
  const [dragX, setDragX] = useState(0) // Offset horizontal para efeito visual de arrasto
  const [arrastando, setArrastando] = useState(false)
  const [direcao, setDirecao] = useState(null) // 'left' | 'right' - direção da transição
  const [mostrarSwipe, setMostrarSwipe] = useState(false) // Controla exibição do tutorial

  const swipeTimer = useRef(null) // Referência para timer do hint de swipe

  // Fecha modal com animação suave
  const fecharModal = () => {
    setFechando(true)
    setTimeout(() => {
      setIndexAtivo(null)
      setFechando(false)
    }, 250)
  }

  // Navega para próxima imagem (circular)
  const proximo = () =>
    setIndexAtivo(i => (i + 1) % imagens.length)

  // Navega para imagem anterior (circular)
  const anterior = () =>
    setIndexAtivo(i => (i - 1 + imagens.length) % imagens.length)

  const minSwipeDistance = 50 // Distância mínima em pixels para considerar swipe
  const isMobile = () => window.innerWidth < 800 // Detecta dispositivo mobile

  // Handlers de eventos touch para swipe em dispositivos móveis
  const onTouchStart = (e) => {
    if (!isMobile()) return

    setArrastando(true)
    setTouchStartX(e.targetTouches[0].clientX)
    setTouchEndX(null)
  }

  const onTouchMove = (e) => {
    if (!isMobile() || !arrastando) return

    const currentX = e.targetTouches[0].clientX
    setTouchEndX(currentX)
    const delta = currentX - touchStartX
    setDragX(Math.max(Math.min(delta, 120), -120)) // Limita arrasto a ±120px
  }

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

    // Reseta estados após animação
    setTimeout(() => {
      setDragX(0)
      setDirecao(null)
      setTouchStartX(null)
      setTouchEndX(null)
    }, 350)
  }

  // Handler de clique que diferencia entre clique (fechar) e arrasto (navegar)
  const onClickImagem = () => {
    if (arrastando || Math.abs(dragX) > 5) return
    fecharModal()
  }

  // Efeito principal para gerenciar comportamentos do modal
  useEffect(() => {
    // Trava scroll do body quando modal está aberto
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

    // Handler para resize da janela
    const handleResize = () => {
      if (window.innerWidth >= 800) {
        setMostrarSwipe(false)
        clearTimeout(swipeTimer.current)
        swipeTimer.current = null
      } else {
        tentarMostrarSwipe()
      }
    }

    // Lógica para exibir hint de swipe apenas uma vez por sessão
    const tentarMostrarSwipe = () => {
      if (indexAtivo === null) return
      if (window.innerWidth >= 800) return

      const jaViu = localStorage.getItem('swipe-hint-visto')
      if (jaViu) return

      if (swipeTimer.current) return // Já está rodando

      setMostrarSwipe(true)

      swipeTimer.current = setTimeout(() => {
        setMostrarSwipe(false)
        localStorage.setItem('swipe-hint-visto', '1') // Marca como visto
        swipeTimer.current = null
      }, 3500) // Exibe por 3.5 segundos
    }

    // Adiciona listeners
    document.addEventListener('keydown', teclado)
    window.addEventListener('resize', handleResize)

    // Decide se deve mostrar o hint de swipe
    if (indexAtivo !== null) {
      tentarMostrarSwipe()
    } else {
      setMostrarSwipe(false)
      clearTimeout(swipeTimer.current)
      swipeTimer.current = null
    }

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', teclado)
      window.removeEventListener('resize', handleResize)
      clearTimeout(swipeTimer.current)
      swipeTimer.current = null
    }
  }, [indexAtivo])

  return (
    <>
      <section className="festa">
        {/* Seção de título com âncora para navegação */}
        <h3><a id="festa">Doce festa</a></h3>
        {/* Grid de imagens responsiva */}
        <div>
          {imagens.map((img, i) => (
            <img
              key={i}
              src={img.src}
              alt={img.alt}
              onClick={() => setIndexAtivo(i)} // Abre modal ao clicar
            />
          ))}
        </div>
      </section>
      
      {/* Modal condicional - renderizado apenas quando indexAtivo não é null */}
      {indexAtivo !== null && (
        <div className={`imagem-modal ${fechando ? 'fechando' : ''}`}>
          <div className="modal-conteudo">

            {/* Botão de navegação anterior (visível apenas desktop) */}
            <button
              className="nav prev"
              onClick={(e) => { e.stopPropagation(); anterior() }}
            >
              ‹
            </button>

            <div className="imagem-wrapper">
              <img
                key={indexAtivo}  // 🔴 Chave dinâmica força re-render e ativa animações
                src={imagens[indexAtivo].src}
                alt={imagens[indexAtivo].alt}
                onClick={onClickImagem}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className={`imagem-modal-img ${direcao || ''}`}
                style={{
                  transform: `translateX(${dragX}px)`,
                  transition: arrastando
                    ? 'none' // Sem transição durante arrasto
                    : 'transform 0.35s cubic-bezier(.4,0,.2,1)' // Transição suave
                }}
              />

              {/* GIF tutorial de swipe (apenas mobile) */}
              <img
                src={swipe}
                className={`swipe-hint ${mostrarSwipe ? 'ativa' : ''}`}
                alt="Deslize para os lados"
              />

            </div>

            {/* Botão de navegação próximo (visível apenas desktop) */}
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