// Componente React para a seção de Contato com formulário interativo
// Local: src/components/Contato/Contato.jsx

import React, { useEffect, useRef } from 'react' // ← useEffect e useRef para gerenciar efeitos e referências DOM
import './Contato.sass' // Estilos específicos do componente
import { useFormulario } from '../../hooks/useFormulario' // ← Hook customizado para lógica do formulário

export const Contato = () => {
  const formRef = useRef() // ← Referência ao formulário para detectar interações externas
  const {
    nome, setNome,
    email, setEmail,
    mensagem, setMensagem,
    erros, enviado, validado,
    clearAllErrors,     // ← Limpa todos os erros de uma vez
    clearSuccess,       // ← Limpa somente a mensagem de sucesso
    validarCampo,       // ← Dispara validação para um campo específico
    handleChange,       // ← Handler genérico de onChange (atualiza e valida)
    handleSubmit        // ← Handler de onSubmit
  } = useFormulario()

  // Efeito para limpar erros/sucesso quando usuário interage fora do formulário
  useEffect(() => {
    const handleExternalInteraction = (e) => {
      const formInputs = formRef.current?.querySelectorAll('input, textarea') || []
      const target = e.target
  
      // Verifica se clicou/focou FORA dos inputs OU no botão Enviar
      const isOutside = Array.from(formInputs).every(input =>
        !input.contains(target) && input !== target
      )

      const isSubmitButton =  target.tagName === 'BUTTON' && target.type === 'submit'
  
      if (isOutside && !isSubmitButton) { // ← Mantém limpeza fora do form mas preserva botão
        clearAllErrors()  // ← Limpa todos os erros ao sair pelo tab/clique/button
        clearSuccess()    // ← Também limpa qualquer sucesso pendente
      }
    }
  
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        clearAllErrors()
        clearSuccess()
      }
    }

      document.addEventListener('mousedown', handleExternalInteraction)
      document.addEventListener('keydown', handleTabKey)
    return () => {
      document.removeEventListener('mousedown', handleExternalInteraction)
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [clearAllErrors, clearSuccess])

  return (
    <section className="contato" ref={formRef}>
      <h4><a id="contato">Entre em contato</a></h4>
      <form onSubmit={handleSubmit} noValidate className="formulario">

        {/* Campo NOME */}
        <div className={`input ${validado.nome ? 'validado' : ''}`}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={handleChange('nome', setNome)}      // ← Atualiza estado e valida no primeiro caractere
            onFocus={() => { clearSuccess(); validarCampo('nome') }} // ← Limpa sucesso e valida ao focar
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}   // ← Bloqueia Enter para não submeter acidentalmente
            autoComplete="off"
          />
          {validado.nome && <span className="check-icon" />} {/* ← Ícone de check só aparece se validado */}
        </div>
        <div className="erro">{erros.nome || ''}</div>

        {/* Campo E-MAIL */}
        <div className={`input ${validado.email ? 'validado' : ''}`}>
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={handleChange('email', setEmail)}    // ← Atualiza estado e valida formato com regex
            onFocus={() => { clearSuccess(); validarCampo('email') }}
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}   // ← Bloqueia Enter aqui
            autoComplete="off"
          />
          {validado.email && <span className="check-icon" />}
        </div>
        <div className="erro">{erros.email || ''}</div>

        {/* Campo MENSAGEM */}
        <div className={`input ${validado.mensagem ? 'validado' : ''}`}>
          <textarea
            placeholder="Escreva sua mensagem..."
            value={mensagem}
            rows="6"
            onChange={handleChange('mensagem', setMensagem)} // ← Atualiza e valida no primeiro caractere
            onFocus={() => { clearSuccess(); validarCampo('mensagem') }}
            onBlur={() => {}}  // ← Erro some ao tab→botão tratado pelo effect externo
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()                   // Bloqueia submit por Enter
                setMensagem(prev => prev + '\n')     // Adiciona nova linha ao invés de submeter
              }
            }}
            autoComplete="off"
          />
          {validado.mensagem && <span className="check-icon" />}
        </div>
        <div className="erro">{erros.mensagem || ''}</div>

        {/* Botão de envio com suporte a teclado */}
        <button
          type="submit"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const fakeEvent = { 
                ...e,
                preventDefault: () => e.preventDefault(),
                target: e.currentTarget,
                type: 'submit' // ← Garante o mesmo tratamento que submit do form          
              }
              handleSubmit(fakeEvent) // ← Simula evento nativo do form para trigger do handleSubmit
            }
          }}
        >
          Enviar
        </button>

        {/* Mensagem de sucesso condicional */}
        <div className="sucesso">
          {enviado && <p className="correto">{enviado}</p>}
        </div>
      </form>
    </section>
  )
}