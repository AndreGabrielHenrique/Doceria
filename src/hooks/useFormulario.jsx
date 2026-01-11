// Hook customizado para gerenciar estado, validação e comportamento do formulário de contato
// Local: src/hooks/useFormulario.jsx

import { useState } from 'react'

// Regex estrita para validação de e-mail (mais simples que a anterior mas eficiente)
const emailValido = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const useFormulario = () => {
  // ─── Estados dos campos do formulário ──────────────────────────────
  const [nome, setNome]         = useState('')
  const [email, setEmail]       = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erros, setErros]       = useState({})          // Objeto para mensagens de erro por campo
  const [enviado, setEnviado]   = useState('')          // String para feedback de sucesso após envio
  const [validado, setValidado] = useState({            // Objeto com flags para controle visual (outline/SVG de check)
    nome: false,
    email: false,
    mensagem: false
  })

  /** Limpa aviso de sucesso (usado ao focar em campos após envio) */
  const clearSuccess = () => {
    setEnviado('')
  }

  /** Limpa todos os erros de uma vez (usado no effect externo do componente Contato) */
  const clearAllErrors = () => {
    setErros({})
  }

  /** Valida um campo isolado (usado em onBlur e handleChange) */
  const validarCampo = campo => {
    const valor = campo === 'nome'
      ? nome.trim()
      : campo === 'email'
        ? email.trim()
        : mensagem.trim()

    setErros(prev => {
      const e = {}
      const v = { ...validado }

      if (campo === 'nome') {
        if (!valor) {
          e.nome = 'Nome não preenchido, favor preencher'
          v.nome = false
        } else if (valor.length < 2) {
          e.nome = 'Nome deve ter pelo menos 2 caracteres'
          v.nome = false
        } else {
          v.nome = true
        }
        setValidado(v)
        return e
      }

      if (campo === 'email') {
        if (!valor) {
          e.email = 'E-mail não preenchido, favor preencher'
          v.email = false
        } else if (!emailValido(valor)) {
          e.email = 'E-mail preenchido incorretamente, favor corrigir'
          v.email = false
        } else {
          v.email = true
        }
        setValidado(v)
        return e
      }

      if (campo === 'mensagem') {
        if (!valor) {
          e.mensagem = 'Mensagem não preenchida, favor preencher'
          v.mensagem = false
        } else if (valor.length < 5) {
          e.mensagem = 'Mensagem deve ter pelo menos 5 caracteres'
          v.mensagem = false
        } else {
          v.mensagem = true
        }
        setValidado(v)
        return e
      }

      // Fallback para casos não tratados (mantém estado anterior)
      setValidado(v)
      return prev
    })
  }

  /** onChange genérico: valida no primeiro caractere digitado (validação em tempo real) */
  const handleChange = (campo, setter) => e => {
    clearSuccess()                // Limpa qualquer mensagem de sucesso anterior
    const v = e.target.value
    setter(v)                     // Atualiza o estado do campo

    // 1️⃣ Campo vazio → erro de obrigatório
    if (v.trim().length === 0) {
      const msg =
        campo === 'nome'
          ? 'Nome não preenchido, favor preencher'
          : campo === 'mensagem'
            ? 'Mensagem não preenchida, favor preencher'
            : 'E-mail não preenchido, favor preencher'
      setErros(prev => ({ ...prev, [campo]: msg }))
      setValidado(prev => ({ ...prev, [campo]: false }))
      return
    }

    // 2️⃣ Verifica mínimo de caracteres específico para cada campo
    const min =
      campo === 'nome' ? 2 :
      campo === 'mensagem' ? 5 :
      1  // Para email, mínimo 1 caractere antes de validar formato

    if (v.trim().length < min) {
      const msg =
        campo === 'nome'
          ? 'Nome deve ter pelo menos 2 caracteres'
          : campo === 'mensagem'
            ? 'Mensagem deve ter pelo menos 5 caracteres'
            : 'E-mail não preenchido, favor preencher'

      setErros(prev => ({ ...prev, [campo]: msg }))
      setValidado(prev => ({ ...prev, [campo]: false }))
      return
    }

    // 3️⃣ Validação extra para e-mail (formato regex)
    if (campo === 'email' && !emailValido(v.trim())) {
      // Validação específica de regex só para e-mail
      setErros(prev => ({ ...prev, email: 'E-mail preenchido incorretamente, favor corrigir' }))
      setValidado(prev => ({ ...prev, email: false }))
      return
    }

    // Se chegou aqui, campo válido - atualiza estado de validação e limpa erro
    setValidado(prev => ({ ...prev, [campo]: true }))
    setErros(prev => {
      const e = { ...prev }
      delete e[campo]  // Remove erro específico deste campo
      return e
    })
  }

  /** Submissão do formulário (validação final e processamento) */
  const handleSubmit = e => {
    console.log('Submit disparado por:', e.type) // ← Debug para verificar origem do submit
    e.preventDefault() // Previne comportamento padrão de recarregar página
    clearSuccess()     // Limpa mensagem de sucesso anterior

    const n = nome.trim()
    const m = mensagem.trim()
    const em = email.trim()

    // 1) Validação do nome (obrigatório e mínimo 2 caracteres)
    if (!n) {
      setErros({ nome: 'Nome não preenchido, favor preencher' })
      setValidado(prev => ({ ...prev, nome: false }))
      return
    }
    if (n.length < 2) {
      setErros({ nome: 'Nome deve ter pelo menos 2 caracteres' })
      setValidado(prev => ({ ...prev, nome: false }))
      return
    }

    // 2) Validação do e-mail (obrigatório e formato válido)
    if (!em) {
      setErros({ email: 'E-mail não preenchido, favor preencher' })
      setValidado(prev => ({ ...prev, email: false }))
      return
    }

    // 2b) Validação de formato do e-mail via regex
    if (!emailValido(em)) {
      setErros({ email: 'E-mail preenchido incorretamente, favor corrigir' })
      setValidado(prev => ({ ...prev, email: false }))
      return
    }

    // 3) Validação da mensagem (obrigatório e mínimo 5 caracteres)
    if (!m) {
      setErros({ mensagem: 'Mensagem não preenchida, favor preencher' })
      setValidado(prev => ({ ...prev, mensagem: false }))
      return
    }
    if (m.length < 5) {
      setErros({ mensagem: 'Mensagem deve ter pelo menos 5 caracteres' })
      setValidado(prev => ({ ...prev, mensagem: false }))
      return
    }

    // Sucesso - todas as validações passaram
    setEnviado('Muito obrigado, logo daremos retorno')
    
    // Limpa campos e reseta estados após envio bem-sucedido
    setNome('')
    setEmail('')
    setMensagem('')
    setErros({})
    setValidado({ nome: false, email: false, mensagem: false }) // ← Reseta SVGs de check após sucesso
  }

  // Retorna todos os estados e funções necessárias para o componente Contato
  return {
    nome, setNome,
    email, setEmail,
    mensagem, setMensagem,
    erros, enviado, validado,
    clearAllErrors, clearSuccess,
    validarCampo, handleChange, handleSubmit
  }
}