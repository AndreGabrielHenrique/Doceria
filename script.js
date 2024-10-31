const alerta=()=>
{
    const naodisponivel = document.getElementById('naodisponivel')
    naodisponivel.innerHTML = 'Ainda não disponível'
}

const formulario = document.getElementById("formulario")
const nome = document.getElementById("nome")
const email = document.getElementById("email")
const mensagem = document.getElementById("mensagem")

formulario.addEventListener("submit", (event) =>
{
    event.preventDefault()

    checarinputs()
})

function checarinputs()
{
    const valornome = nome.value
    const valoremail = email.value
    const valormensagem = mensagem.value
    const erronome = document.getElementById("erronome")
    const erroemail = document.getElementById("erroemail")
    const erromensagem = document.getElementById("erromensagem")
    const enviado = document.getElementById("enviado")
    
    if (valornome === "")
    {
        erronome.innerHTML = '<p class="errado">Nome não preenchido, favor preencher</p>'
        return
    }
    else
    {
        validar(nome)
        erronome.innerHTML = ''
    }

    if (valoremail === "")
    {
        erroemail.innerHTML = '<p class="errado">E-mail não preenchido, favor preencher</p>'
        return
    }
    else if (!emailvalido(valoremail))
    {
        erroemail.innerHTML = '<p class="errado">E-mail preenchido incorretamente, favor corrigir</p>'
        return
    }
    else
    {
        validar(email)
        erroemail.innerHTML = ''
    }

    if (valormensagem === "")
    {
        erromensagem.innerHTML = '<p class="errado">Mensagem não preenchida, favor preencher</p>'
        return
    }
    else
    {
        validar(mensagem)
        erromensagem.innerHTML = ''
    }

    const validarformulario = formulario.querySelectorAll(".input")

    const enviarformulario = [...validarformulario].every((validacao) =>
    {
        return validacao.className === "input validado"
    })

    if (enviarformulario)
    {
        enviado.innerHTML = '<p class="correto">Muito obrigado, logo daremos retorno</p>'
        document.getElementById("nome").value = ""
        document.getElementById("email").value = ""
        document.getElementById("mensagem").value = ""
    }
}


function emailvalido(email)
{
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

function validar(input)
{
    const validacao = input.parentElement
    validacao.className = "input validado"
}