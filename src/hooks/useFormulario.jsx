// src/hooks/useFormulario.jsx

import { useState } from 'react'

// Regex estrita para e-mail
const emailValido = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const useFormulario = () => {
  // ─── Estados dos campos ─────────────────────────────────────────────
  const [nome, setNome]         = useState('')
  const [email, setEmail]       = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erros, setErros]       = useState({})          // mensagens de erro
  const [enviado, setEnviado]   = useState('')          // feedback de sucesso
  const [validado, setValidado] = useState({            // flags de outline/SVG
    nome: false,
    email: false,
    mensagem: false
  })

  /** limpa aviso de sucesso */
  const clearSuccess = () => {
    setEnviado('')
  }

  /** limpa todos os erros de uma vez (usado no effect externo) */
  const clearAllErrors = () => {
    setErros({})
  }

  /** valida um campo isolado (onBlur e handleChange) */
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
        } else {
          v.mensagem = true
        }
        setValidado(v)
        return e
      }

      // fallback
      setValidado(v)
      return prev
    })
  }

  /** onChange genérico: valida no primeiro caractere */
  const handleChange = (campo, setter) => e => {
    clearSuccess()                // limpa qualquer mensagem de sucesso
    const v = e.target.value
    setter(v)

    if (v.trim().length === 0) {
      // erro imediato se vazia
      const msg =
        campo === 'email'
          ? 'E-mail não preenchido, favor preencher'
          : campo === 'mensagem'
            ? 'Mensagem não preenchida, favor preencher'
            : 'Nome não preenchido, favor preencher'
      setErros(prev => ({ ...prev, [campo]: msg }))
      setValidado(prev => ({ ...prev, [campo]: false }))
      return
    }

    if (campo === 'email' && !emailValido(v.trim())) {
      // validação extra de regex só para e-mail
      setErros(prev => ({ ...prev, email: 'E-mail preenchido incorretamente, favor corrigir' }))
      setValidado(prev => ({ ...prev, email: false }))
      return
    }

    // se chegou aqui, campo válido
    setValidado(prev => ({ ...prev, [campo]: true }))
    setErros(prev => {
      const e = { ...prev }
      delete e[campo]
      return e
    })
  }

  /** submissão do formulário */
  const handleSubmit = e => {
    e.preventDefault()
    clearSuccess()

    // 1) nome
    if (!nome.trim()) {
      setErros({ nome: 'Nome não preenchido, favor preencher' })
      setValidado(prev => ({ ...prev, nome: false }))
      return
    }

    // 2) e-mail vazio
    if (!email.trim()) {
      setErros({ email: 'E-mail não preenchido, favor preencher' })
      setValidado(prev => ({ ...prev, email: false }))
      return
    } else if (!emailValido(email.trim())) {
      // 2b) formato do e-mail
      setErros({ email: 'E-mail preenchido incorretamente, favor corrigir' })
      setValidado(prev => ({ ...prev, email: false }))
      return
    }

    // 3) mensagem
    if (!mensagem.trim()) {
      setErros(prev => ({ ...prev, mensagem: 'Mensagem não preenchida, favor preencher' }))
      setValidado(prev => ({ ...prev, mensagem: false }))
      return
    }

    // sucesso
    setEnviado('Muito obrigado, logo daremos retorno')
    // limpa campos e flags
    setNome(''); setEmail(''); setMensagem('')
    setErros({}); 
    setValidado({ nome: false, email: false, mensagem: false }) // ← reseta SVGs após sucesso
  }

  return {
    nome, setNome,
    email, setEmail,
    mensagem, setMensagem,
    erros, enviado, validado,
    clearAllErrors, clearSuccess,
    validarCampo, handleChange, handleSubmit
  }
}