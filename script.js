const alerta=()=>
{
    const naodisponivel = document.getElementById('naodisponivel')
    naodisponivel.innerHTML = 'Ainda não disponível'
}


const aviso=()=>
{
    var nome = document.getElementById("nome")
    var email = document.getElementById("email")
    var mensagem = document.getElementById("mensagem")
    const enviado = document.getElementById("enviado")
    if (nome.value != "" && email.value != "" && mensagem.value != "")
    {
        enviado.innerHTML = '<p class="correto">Muito obrigado, logo daremos retorno</p>'
    }
    else
    {
        enviado.innerHTML = '<p class="errado">Campos não preenchidos, favor preencher</p>'
    }
}