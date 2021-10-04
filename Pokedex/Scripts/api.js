const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 2500,
})

const url = () => {
  const params = new URLSearchParams(location.search) // retorna todos os parâmetros da URL
  return params.get('info') // Busca um parâmetro na lista de parâmetros pelo nome
}

const formataTela = (pokemon) => {
  document.querySelector('#numero').innerHTML = pokemon.id
  document.querySelector('#nome').innerHTML = pokemon.name

  document.querySelector('#sprite').setAttribute('src', pokemon.sprites.front_default)

  //cria as divs com os tipos de pokemon
  const divTipos = document.querySelector('.tipos')
  pokemon.types.forEach((item) => {
    const tipo = document.createElement('div')
    tipo.classList.add('type')
    tipo.classList.add(`type_${item.type.name}`)
    tipo.innerHTML = item.type.name

    divTipos.appendChild(tipo)
  })

  //depois de preencher todos os dados remove a img do pikachu triste
  document.querySelector('.nao_encontrado').style.display = 'none'
  document.querySelector('.detalhes_invisivel').classList.add('detalhes')
  document.querySelector('.detalhes_invisivel').classList.remove('detalhes_invisivel')
}

const handleNaoEncontrado = () => {
  document.querySelector('footer').style.display = 'none'
}

const formataInformacoes = (flavor) => {
  const value = flavor.flavor_text_entries.find((item) => item.language.name === 'en').flavor_text
  document.querySelector('#flavor').innerHTML = `${value}`
}

const buscarPokemon = () => {
  const info = url()

  api
    .get(`pokemon/${info}`)
    .then((pokemon) => {
      formataTela(pokemon.data)
    })
    .catch(() => {
      handleNaoEncontrado()
    })
}

const buscarPokemonSpecies = async () => {
  const info = url()
  const flavor = await api.get(`pokemon-species/${info}`)
  formataInformacoes(flavor.data)
}

buscarPokemon()
buscarPokemonSpecies()

function meuFavorito(seleciona) {
  seleciona.classList.toggle("fav-select");
}
