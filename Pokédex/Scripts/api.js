const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 2500,
})

const formataTela = (pokemon) => {
  document.querySelector('#numero').innerHTML = pokemon.id
  document.querySelector('#nome').innerHTML = pokemon.name

  document.querySelector('#sprite').setAttribute('src', pokemon.sprites.front_default)

  //depois de preencher todos os dados remove a img do pikachu triste
  document.querySelector('.nao_encontrado').style.display = 'none'
  document.querySelector('.detalhes_invisivel').classList.add('detalhes')
  document.querySelector('.detalhes_invisivel').classList.remove('detalhes_invisivel')
}

const handleNaoEncontrado = () => {
  document.querySelector('footer').style.display = 'none'
}

const buscarPokemon = () => {
  const params = new URLSearchParams(location.search) // retorna todos os parâmetros da URL
  const info = params.get('info') // Busca um parâmetro na lista de parâmetros pelo nome

  api
    .get(`pokemon/${info}`)
    .then((pokemon) => {
      formataTela(pokemon.data)
    })
    .catch(() => {
      handleNaoEncontrado()
    })
}

buscarPokemon()
