// Banner.jsx
import React from 'react'
import './Banner.sass'
import banner2 from '../../assets/Imagens/banner2.jpg'

// Componente que renderiza o banner principal
export const Banner = () => (
  <img 
    src={banner2} 
    className="banner"  // Classe para controle de dimensões
    alt="Banner Doceria"  // Acessibilidade e SEO
  />
)