/* var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
    .then(resposta => resposta.json)
    .then(cep => {
        if (cep.erro) {
            Quando consultado um CEP de formato válido, porém inexistente, por exemplo: "99999999", o retorno conterá um valor de "erro" igual a "true".
            throw Error("Cep inexistente")
        } else {
            console.log(cep)
        }
    }).catch(erro =>
        Quando consultado um CEP de formato inválido, por exemplo: "950100100"(9 dígitos), "95010A10"(alfanumérico), "95010 10"(espaço), o código de retorno da consulta será um 400(Bad Request)
        console.log(erro)
    )
    .finally(mensagem => console.log("Processamento concluido"))
*/

async function buscaEndereco(cep) {
    var erroDiv = document.querySelector("#erro")
    erroDiv.innerHTML = ""
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPjson = await consultaCEP.json()

        if (consultaCEPjson.erro) {
            throw Error("Cep inexistente")
        } else {

            const endereco = document.querySelector("#endereco")
            const complemento = document.querySelector("#complemento")
            const bairro = document.querySelector("#bairro")
            const cidade = document.querySelector("#cidade")
            const estado = document.querySelector("#estado")

            endereco.value = `${consultaCEPjson.logradouro} - ${consultaCEPjson.bairro}, ${consultaCEPjson.localidade}`
            complemento.value = `${consultaCEPjson.complemento}`
            bairro.value = `${consultaCEPjson.bairro}`
            cidade.value = `${consultaCEPjson.localidade}`
            estado.value = `${consultaCEPjson.uf}`


            console.log(consultaCEPjson)
            return consultaCEPjson
        }
    } catch (erro) {
        console.log(erro)
        erroDiv.innerHTML = "<p>Cep inválido. Tente novamente</p>"
    }
}

/* 
Fazendo várias requisições ao mesmo tempo
const ceps = ['01001000', '01001001']
const conjuntoCeps = ceps.map(cep => buscaEndereco(cep))

Promise.all(conjuntoCeps).then(respostas => console.log(respostas)) 
*/