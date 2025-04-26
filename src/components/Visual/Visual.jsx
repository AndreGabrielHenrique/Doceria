import React from 'react'
import './Visual.sass'
// Importações de imagens mantidas integralmente
import galeria6 from '../../assets/Imagens/galeria6.jpg'
import galeria7 from '../../assets/Imagens/galeria7.jpg'
import galeria8 from '../../assets/Imagens/galeria8.jpg'

export const Visual = () => (
  <section className="visual">
    {/* Título da seção com link âncora */}
    <h3><a id="visual">Delícia visual</a></h3>
    {/* Container de imagens - estrutura original preservada */}
    <div>
      <img src={galeria6} alt="De encher os olhos" />
      <img src={galeria7} alt="Bolo" />
      <img src={galeria8} alt="Mini cupcake" />
    </div>
  </section>
)