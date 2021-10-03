const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 2500,
})

const url = () => {
  const params = new URLSearchParams(location.search) // retorna todos os parâmetros da URL
  return params.get('info') // Busca um parâmetro na lista de parâmetros pelo nome
}

const formataTela = (pokemon) => {
  document.querySelector('#nome').innerHTML = `${pokemon.id} - ${pokemon.name}`
  document.querySelector('#sprite').setAttribute('src', pokemon.sprites.front_default)

  //depois de preencher todos os dados remove a img do pikachu triste
  document.querySelector('.nao_encontrado').style.display = 'none'
  document.querySelector('.detalhes').style.visibility = 'visible'
}

const formataInformacoes = (flavor) => {
  var i = 0
  var value = flavor.flavor_text_entries[i].language.name
  for(; value !== "en"; i++){
    value = flavor.flavor_text_entries[i].language.name
  }
  value = flavor.flavor_text_entries[i].flavor_text
  document.querySelector('#flavor').innerHTML = `${value}`
}

const buscarPokemon = () => {
  const info = url()

  api
    .get(`pokemon/${info}`)
    .then((pokemon) => {
      formataTela(pokemon.data)
    })
    .catch((erro) => {
      console.error(erro)
    })
}

const buscarPokemonSpecies = async () => {
  const info = url()
  const flavor = await api.get(`pokemon-species/${info}`)
  formataInformacoes(flavor.data)
}

buscarPokemon()
buscarPokemonSpecies()