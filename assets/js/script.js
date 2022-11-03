const protocolo = 'http://'
const baseURL = 'localhost:3000'
const noticiasEndpoint = '/noticias'

async function obterNoticias() {
    const URLCompleta = `${protocolo}${baseURL}${noticiasEndpoint}`
    const noticias = (await axios.get(URLCompleta)).data
    console.log (noticias)
    let tabela = document.querySelector('.noticias')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    for (let noticia of noticias) {
        let linha = corpoTabela.insertRow(0)
        let colunaTitulo = linha.insertCell(0)
        let colunaSinopse = linha.insertCell(1)
        colunaTitulo.innerHTML = noticia.titulo
        colunaSinopse.innerHTML = noticia.sinopse
    }
}

async function cadastrarNoticia() {
    const URLCompleta = `${protocolo}${baseURL}${noticiasEndpoint}`
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    if (titulo && sinopse) {
        tituloInput.value = ""
        sinopseInput.value = ""
        const noticias = (await axios.post(URLCompleta, {titulo, sinopse})).data

        let tabela = document.querySelector('.noticias')
        let corpoTabela = tabela.getElementsByTagName('tbody')[0]
        corpoTabela.innerHTML = ""
        for (let noticia of noticias) {
            let linha = corpoTabela.insertRow(0)
            let celulaTitulo = linha.insertCell(0)
            let celulaSinopse = linha.insertCell(1)
            celulaTitulo.innerHTML = noticia.titulo
            celulaSinopse.innerHTML = noticia.sinopse
        }
    }
    else {
        let alert = document.querySelector('.alert')
        alert.classList.add('show')
        alert.classList.remove('d-none')
        setTimeout(() =>{
            alert.classList.remove('show')
            alert.classList.add('d-none')
        }, 2000)
    }
}
