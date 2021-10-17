const carregaPagina = () => {
  // ir até o localStorage buscar a lista de recentes
  const lista = JSON.parse(localStorage.getItem('buscasRecentes')) || []
  // renderizar a lista criando os elementos no DOM
  lista.reverse()
  lista.forEach((pokemon) => {
    const mainContent = document.querySelector('.main_content')
    const linha = document.createElement('article')
    const iconePokemon = document.createElement('img')
    const span = document.createElement('span')
    const iconeLixeira = document.createElement('img')

    iconeLixeira.setAttribute('src', '../assets/trash.svg')
    iconeLixeira.classList.add('icone')
    iconeLixeira.setAttribute('onclick', `removeBusca(${pokemon.id})`)

    iconePokemon.setAttribute('onclick', `navegarPokemon(${pokemon.id})`)
    span.setAttribute('onclick', `navegarPokemon(${pokemon.id})`)

    linha.classList.add('linha_pokemon')
    linha.setAttribute('id', `pokemon_${pokemon.id}`)
    iconePokemon.setAttribute('src', pokemon.sprites.front_default)
    span.innerHTML = pokemon.name

    linha.appendChild(iconePokemon)
    linha.appendChild(span)
    linha.appendChild(iconeLixeira)
    mainContent.appendChild(linha)
  })
}

const removeBusca = (id) => {
  const lista = JSON.parse(localStorage.getItem('buscasRecentes'))

  // remover o pokmeon com o id passado da lista
  const novaLista = lista.filter((pokemon) => pokemon.id !== id)
  localStorage.setItem('buscasRecentes', JSON.stringify(novaLista))

  //tirar da página o article do pokémon removido
  const linhaRemover = document.querySelector(`#pokemon_${id}`)
  const mainContent = document.querySelector('.main_content')

  mainContent.removeChild(linhaRemover)
}

const navegarPokemon = (id) => {
  location = `pokemon.html?info=${id}`
}

carregaPagina()
