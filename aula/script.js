

function calcular(event) {
    // prefine o carregamento da pagina
    event.preventDefault()

    console.log("Foi executada a funcao calcular")
    // passo 1
    let usuario = receberValores()
    // passo 2
    let imcCalculado = calcularImc(usuario.altura, usuario.peso)
    // passo 3
    let classificacaoImc = classificarImc(imcCalculado)

    console.log(classificacaoImc)
    // passo 4
    usuario = organizarDados(usuario, imcCalculado, classificacaoImc)

    cadastrarUsuario(usuario)
}


function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let alturaRecebida = document.getElementById("altura").value
    let pesoRecebido = document.getElementById("peso").value

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido
    }

    console.log(dadosUsuario)

    return dadosUsuario
}

function calcularImc(altura, peso) {
    let imc = peso / (altura * altura)

    console.log(imc)

    return imc
}

function classificarImc(imc) {

    if (imc < 18.5) {
        return "Abaixo do peso"
    } else if (imc >= 18.5 && imc < 25) {
        return "Peso normal"
    } else if (imc >= 25 && imc < 30) {
        return "Sobrepeso"
    } else {
        return "Obsesidade"
    }

}

// funcao para colocar Data e hora

function organizarDados(dadosUsuario, valorImc, classificacaoImc) {
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())

    console.log(dataHoraAtual);

    // organizando o objeto
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorImc,
        situacaoImc: classificacaoImc,
        dataCadasdro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;
}

function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    // se ouver uma lista de usuarios no localStorage, carregar isso para a variavel listaUsuarios
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    // adiciona um usuario na lista
    listaUsuarios.push(dadosUsuario)
    // salva a listaUsuarios no localStorage
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))



}

function carregarUsuarios() {
    let listaCarregada = []
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if (listaCarregada.length == 0) {
        // Se nao tiver nenhum usuario cadastrado mostra mensagem
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuario cadastrado 💀🤡👌</td> </tr>`
    } else {
        // montar conteudo da tabela
        montarTabela(listaCarregada)
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())


// Fazer a tabela
function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        console.log("O usuario é: ", usuario)

        template += ` <tr>
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="altura">${usuario.altura}</td>
        <td data-cell="peso">${usuario.peso}</td>
        <td data-cell="valor do IMC">${usuario.imc}</td>
        <td data-cell="classificação do IMC">${usuario.situacaoImc}</td>
        <td data-cell="data de cadastro">${usuario.dataCadasdro}</td>
    </tr> `
    });

    tabela.innerHTML = template;
}

function deletarRegistros() {

    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")
    // recarrega a pagina
    window.location.reload()
}

