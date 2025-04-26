// C:\MEGA\GPnet\Doceria\src\components\Festa\Festa.jsx
import React from 'react'
import './Festa.sass'
// Importação das imagens da galeria
import galeria9 from '../../assets/Imagens/galeria9.jpg'
import galeria10 from '../../assets/Imagens/galeria10.jpg'
import galeria11 from '../../assets/Imagens/galeria11.jpg'
import galeria12 from '../../assets/Imagens/galeria12.jpg'

export const Festa = () => (
  <section className="festa">
    {/* Seção de título com âncora */}
    <h3><a id="festa">Doce festa</a></h3>
    {/* Grid de imagens para exibição da galeria */}
    <div>
      <img src={galeria9} alt="Panqueca doce" />
      <img src={galeria10} alt="Beijinho" />
      <img src={galeria11} alt="Mousse" />
      <img src={galeria12} alt="Doces infinitos" />
    </div>
  </section>
)