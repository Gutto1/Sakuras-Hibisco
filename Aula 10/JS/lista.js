// Lista de jogos como variavel global

const listaJogos = JSON.parse(localStorage.getItem('listaJogos')) || []

function listarJogos() {
  const table = document.querySelector('table')

  //percorrer a lista de jogos para criar os TRs e TDs
  listaJogos.forEach((item) => {
    let linha = document.createElement('tr')
    let colJogo = document.createElement('td')
    let colPreco = document.createElement('td')
    let colGenero = document.createElement('td')

    //Inserir os dados nas colunas(tds)
    colJogo.innerHTML = item.nome
    colPreco.innerHTML = item.preco
    colGenero.innerHTML = item.genero
    //Inserir as colunas na linha
    linha.appendChild(colJogo)
    linha.appendChild(colPreco)
    linha.appendChild(colGenero)
    //Inserir a linha na tabela
    table.appendChild(linha)
  })
}

function inicializaTela() {
  const divAviso = document.querySelector('.aviso')
  const section = document.querySelector('#lista-jogos')
  const table = document.querySelector('table')

  if (listaJogos.length > 0) {
    section.removeChild(divAviso) // remove a divAviso
    listarJogos()
  } else {
    section.removeChild(table) // remove  a tabela
  }
}

inicializaTela()
