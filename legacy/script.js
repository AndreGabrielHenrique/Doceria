// legacy\script.js

// Função que exibe mensagem "Ainda não disponível" ao clicar no botão "Leia mais"
const alerta=()=>
{
    const naodisponivel = document.getElementById('naodisponivel')
    naodisponivel.innerHTML = 'Ainda não disponível'
}

// Referências aos elementos do formulário
const formulario = document.getElementById("formulario")
const nome = document.getElementById("nome")
const email = document.getElementById("email")
const mensagem = document.getElementById("mensagem")

// Adiciona listener para evento de submit do formulário
formulario.addEventListener("submit", (event) =>
{
    event.preventDefault() // Previne comportamento padrão de recarregar a página
    checarinputs() // Chama função de validação
})

// Função principal de validação dos campos do formulário
function checarinputs()
{
    // Obtém valores dos campos
    const valornome = nome.value
    const valoremail = email.value
    const valormensagem = mensagem.value
    
    // Referências aos containers de mensagens de erro/sucesso
    const erronome = document.getElementById("erronome")
    const erroemail = document.getElementById("erroemail")
    const erromensagem = document.getElementById("erromensagem")
    const enviado = document.getElementById("enviado")
    
    // Validação do campo nome
    if (valornome === "")
    {
        enviado.innerHTML = '' // Limpa mensagem de sucesso anterior
        erronome.innerHTML = '<p class="errado">Nome não preenchido, favor preencher</p>'
        return // Interrompe execução se campo estiver vazio
    }
    else
    {
        validar(nome) // Marca campo como válido
        erronome.innerHTML = '' // Limpa mensagem de erro
    }

    // Validação do campo e-mail
    if (valoremail === "")
    {
        enviado.innerHTML = ''
        erroemail.innerHTML = '<p class="errado">E-mail não preenchido, favor preencher</p>'
        return
    }
    else if (!emailvalido(valoremail)) // Verifica formato do e-mail
    {
        enviado.innerHTML = ''
        erroemail.innerHTML = '<p class="errado">E-mail preenchido incorretamente, favor corrigir</p>'
        return
    }
    else
    {
        validar(email)
        erroemail.innerHTML = ''
    }

    // Validação do campo mensagem
    if (valormensagem === "")
    {
        enviado.innerHTML = ''
        erromensagem.innerHTML = '<p class="errado">Mensagem não preenchida, favor preencher</p>'
        return
    }
    else
    {
        validar(mensagem)
        erromensagem.innerHTML = ''
    }

    // Verifica se todos os campos estão validados
    const validarformulario = formulario.querySelectorAll(".input")
    
    // Converte NodeList para array e verifica se todos têm classe "validado"
    const enviarformulario = [...validarformulario].every((validacao) =>
    {
        return validacao.className === "input validado"
    })

    // Se formulário completamente válido, exibe mensagem de sucesso e limpa campos
    if (enviarformulario)
    {
        enviado.innerHTML = '<p class="correto">Muito obrigado, logo daremos retorno</p>'
        document.getElementById("nome").value = ""
        document.getElementById("email").value = ""
        document.getElementById("mensagem").value = ""
    }
}

// Função que valida formato de e-mail usando expressão regular
function emailvalido(email)
{
    // Regex para validação de e-mail padrão
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

// Função que adiciona classe "validado" ao elemento pai do input
function validar(input)
{
    const validacao = input.parentElement
    validacao.className = "input validado"
}