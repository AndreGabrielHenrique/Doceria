import React from 'react'
import './Variacao.sass'
// Importações de imagens mantidas integralmente
import galeria1 from '../../assets/Imagens/galeria1.jpg'
import galeria2 from '../../assets/Imagens/galeria2.jpg'
import galeria3 from '../../assets/Imagens/galeria3.jpg'
import galeria4 from '../../assets/Imagens/galeria4.jpg'
import galeria5 from '../../assets/Imagens/galeria5.jpg'

export const Variacao = () => (
  <section className="variacao">
    {/* Título da seção com link âncora */}
    <h3><a id="variacao">Grande variação</a></h3>
    {/* Grid de imagens - todas tags img mantidas integralmente */}
    <div>
      <img src={galeria1} alt="Muitos doces" />
      <img src={galeria2} alt="Bolo" />
      <img src={galeria3} alt="Confeitaria" />
      <img src={galeria4} alt="Doces aos montes" />
      <img src={galeria5} alt="Cupcakes" />
    </div>
  </section>
)