import React from 'react'
import './Sobre.sass'
import banner4 from '../../assets/Imagens/banner4.jpg'

export const Sobre = () => (
  <section className="sobre">
    {/* Título da seção com link âncora para navegação interna */}
    <h2><a id="sobre">Sobre nós</a></h2>
    <div>
      {/* Container de conteúdo textual */}
      <aside>
        {/* Parágrafos descritivos completos - texto original mantido integralmente */}
        <p>Feitos de amantes de doces para amantes de doces, nossa paixão é criar doces não somente deliciosos mas também visualmente bonitos para adoçar igualmente sua visão e proporcionar uma experiência sem igual.</p>
        <p>Tudo começou com nosso amor e visão em desenvolver um universo adocicado para todos, começando com uma loja online e chegando a abrir a primeira unidade física, para depois se expandir por todo o mundo.</p>
        <p>Por fim criamos uma cidade aonde todos amam doces e vivem de doces, com referência internacional tanto politicamente quanto economicamente.</p>
      </aside>
      
      {/* Imagem lateral - conteúdo original mantido integralmente */}
      <img src={banner4} className="imagemlateral" alt="Sobre nós" />
    </div>
  </section>
)