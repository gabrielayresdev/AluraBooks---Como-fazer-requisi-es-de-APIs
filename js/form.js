const cepInput = document.querySelector("#cep")

cepInput.addEventListener("focusout", () => {
    const cep = cepInput.value
    buscaEndereco(cep)
})