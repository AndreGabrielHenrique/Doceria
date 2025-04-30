// src/components/Contato/Contato.jsx

import React, { useEffect, useRef } from 'react' // ← adicionados useEffect e useRef para escutar foco/cli­que fora
import './Contato.sass'
import { useFormulario } from '../../hooks/useFormulario'

export const Contato = () => {
  const formRef = useRef() // ← referência ao form pra detectar interações externas
  const {
    nome, setNome,
    email, setEmail,
    mensagem, setMensagem,
    erros, enviado, validado,
    clearAllErrors,     // ← limpa todos os erros de uma vez (usado no effect)
    clearSuccess,       // ← limpa somente a mensagem de sucesso
    validarCampo,       // ← dispara validação para um campo específico
    handleChange,       // ← handler genérico de onChange
    handleSubmit        // ← handler de onSubmit
  } = useFormulario()

  useEffect(() => {
    const handleExternalInteraction = (e) => {
      const formInputs = formRef.current?.querySelectorAll('input, textarea') || []
      const target = e.target
      const isSubmitButton = target.tagName === 'BUTTON' && target.type === 'submit'
  
      // Verifica se clicou/focou FORA dos inputs OU no botão Enviar
      const isOutside = Array.from(formInputs).every(input =>
        !input.contains(target) && input !== target
      )
  
      if (isOutside && !isSubmitButton) { // ← Mantém limpeza fora do form mas preserva botão
        clearAllErrors()  // ← limpa todos os erros ao sair pelo tab/clique/button
        clearSuccess()    // ← também limpa qualquer sucesso pendente
      }
    }
  
    document.addEventListener('mousedown', handleExternalInteraction)
    document.addEventListener('focusin', handleExternalInteraction)
    return () => {
      document.removeEventListener('mousedown', handleExternalInteraction)
      document.removeEventListener('focusin', handleExternalInteraction)
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
            onChange={handleChange('nome', setNome)}      // ← atualiza e valida no primeiro caractere
            onFocus={() => { clearSuccess(); validarCampo('nome') }} // ← limpa sucesso e mostra erro
            onBlur={() => validarCampo('nome')}           // ← valida ao sair do campo
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}   // ← bloqueia Enter aqui
            autoComplete="off"
          />
          {validado.nome && <span className="check-icon" />} {/* ← ícone só aparece se validado*/}
        </div>
        <div className="erro">{erros.nome || ''}</div>

        {/* Campo E-MAIL */}
        <div className={`input ${validado.email ? 'validado' : ''}`}>
          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={handleChange('email', setEmail)}    // ← atualiza e só valida após regex
            onFocus={() => { clearSuccess(); validarCampo('email') }}
            onBlur={() => validarCampo('email')}
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}   // ← bloqueia Enter aqui
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
            onChange={handleChange('mensagem', setMensagem)} // ← atualiza e valida no primeiro caractere
            onFocus={() => { clearSuccess(); validarCampo('mensagem') }}
            onBlur={() => validarCampo('mensagem')}          // ← error some ao tab→botão tratado pelo effect
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()                   // bloqueia o submit
                setMensagem(prev => prev + '\n')     // adiciona nova linha
              }
            }}
            autoComplete="off"
          />
          {validado.mensagem && <span className="check-icon" />}
        </div>
        <div className="erro">{erros.mensagem || ''}</div>

        {/* Botão de envio */}
        <button
          type="submit"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const fakeEvent = { 
                ...e,
                preventDefault: () => e.preventDefault(),
                target: e.currentTarget,
                type: 'submit' // ← Garante o mesmo tratamento que o submit do form          
              }
              handleSubmit(fakeEvent) // ← Simula evento nativo do form
            }
          }}
        >
          Enviar
        </button>

        {/* Mensagem de sucesso */}
        <div className="sucesso">
          {enviado && <p className="correto">{enviado}</p>}
        </div>
      </form>
    </section>
  )
}