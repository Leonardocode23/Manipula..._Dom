

function calcular(event) {
    event.preventDefault()
    console.log("Foi executada a funcao calcular")

    let usuario =  receberValores()

    let imcCalculado = calcularImc(usuario.altura, usuario.peso)

    let classificacaoImc = classificarImc(imcCalculado)

    console.log(classificacaoImc)
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

function calcularImc(altura,peso) {
    let imc = peso / (altura * altura)

    console.log(imc)

    return imc
}

function classificarImc(imc) {
    
    if (imc < 18.5){
        return"Abaixo do peso"
    } else if (imc >=18.5 && imc < 25){
        return "Peso normal"
    } else if (imc >= 25 && imc < 30){
        return "Sobrepeso"
    } else{
        return "Obsesidade"
    }

}