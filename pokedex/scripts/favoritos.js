const carregaFavoritos = () => {
  //buscar a lista de favoritos do localStorage e renderizar na tela
  const lista = JSON.parse(localStorage.getItem('listaFavoritos')) || []

  lista.forEach((pokemon) => {
    const mainContent = document.querySelector('.main_content')
    const linha = document.createElement('article')
    const iconePokemon = document.createElement('img')
    const span = document.createElement('span')
    const iconeLixeira = document.createElement('img')

    iconeLixeira.setAttribute('src', '../assets/trash.svg')
    iconeLixeira.classList.add('icone')
    iconeLixeira.setAttribute('onclick', `removeFavorito(${pokemon.id})`)
    iconeLixeira.setAttribute('alt', 'Remover pokémon')

    iconePokemon.setAttribute('onclick', `navegarPokemon(${pokemon.id})`)
    span.setAttribute('onclick', `navegarPokemon(${pokemon.id})`)
    iconePokemon.setAttribute('alt', `Imagem do pokémon ${pokemon.name}`)
    iconePokemon.setAttribute('title', `Imagem do pokémon ${pokemon.name}`)

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

const removeFavorito = (id) => {
  const lista = JSON.parse(localStorage.getItem('listaFavoritos'))

  // remover o pokmeon com o id passado da lista
  const novaLista = lista.filter((pokemon) => pokemon.id !== id)
  localStorage.setItem('listaFavoritos', JSON.stringify(novaLista))

  //tirar da página o article do pokémon removido
  const linhaRemover = document.querySelector(`#pokemon_${id}`)
  const mainContent = document.querySelector('.main_content')

  mainContent.removeChild(linhaRemover)
}

const navegarPokemon = (id) => {
  location = `pokemon.html?info=${id}`
}

carregaFavoritos()
