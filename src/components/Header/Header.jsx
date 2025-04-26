// C:\MEGA\GPnet\Doceria\src\components\Header\Header.jsx
import React from 'react'
import './Header.sass'
import stand from '../../assets/Imagens/stand.png'

export const Header = () => (
  <header>
    {/* Container da logo */}
    <nav className="logo">
      <img src={stand} alt="Logotipo Doceria" />
      <p>Doceria</p>
    </nav>

    {/* Menu de navegação principal */}
    <nav className="menu">
      {/* Links âncora para seções da página */}
      <a href="#bemvindo" className="secao">Bem vindo</a>
      <a href="#sobre" className="secao">Sobre nós</a>
      <a href="#variacao" className="secao">Grande variação</a>
      <a href="#visual" className="secao">Delícia visual</a>
      <a href="#festa" className="secao">Doce festa</a>
      <a href="#contato" className="secao">Entre em contato</a>
    </nav>
  </header>
)