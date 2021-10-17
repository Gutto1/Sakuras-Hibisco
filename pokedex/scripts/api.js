var infoPokemon

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

const atualizaBuscasRecentes = (pokemon) => {
  const buscasRecentes = JSON.parse(localStorage.getItem('buscasRecentes')) || []
  // se a lista estiver cheia remove o último da lista e adiciona o pokemon mais recente
  if (buscasRecentes.length === 10 && !buscasRecentes.find((item) => item.id === pokemon.id)) {
    buscasRecentes.splice(0, 1)
    buscasRecentes.push(pokemon)
    localStorage.setItem('buscasRecentes', JSON.stringify(buscasRecentes))
    return
  }

  // se o pokémon já estiver na lista, apenas atualiza a posição.
  if (buscasRecentes.find((item) => item.id === pokemon.id)) {
    let pos = 0

    buscasRecentes.map((item, idx) => {
      if (item.id === pokemon.id) {
        pos = idx
      }
    })

    buscasRecentes.splice(pos, 1) // remove 1 item a partir da posição "pos", que é a posição do pokémon que já está na lista
    buscasRecentes.push(pokemon)
    localStorage.setItem('buscasRecentes', JSON.stringify(buscasRecentes))
    return
  } else {
    buscasRecentes.push(pokemon)
    localStorage.setItem('buscasRecentes', JSON.stringify(buscasRecentes))
  }
}

const buscarPokemon = () => {
  const info = url()

  api
    .get(`pokemon/${info}`)
    .then((pokemon) => {
      localStorage.setItem('infoPokemon', JSON.stringify(pokemon))
      infoPokemon = JSON.parse(localStorage.getItem('infoPokemon')) || []
      formataTela(pokemon.data)
      atualizaBuscasRecentes(pokemon.data)
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

const ativaDesativaShiny = () => {
  const spriteAtual = document.querySelector('#sprite')
  const pokemon = infoPokemon.data.sprites
  if (pokemon.front_default == spriteAtual.currentSrc && pokemon.front_shiny != null) {
    document.querySelector('#sprite').setAttribute('src', pokemon.front_shiny)
  } else if (pokemon.front_female == spriteAtual.currentSrc && pokemon.front_shiny_female != null) {
    document.querySelector('#sprite').setAttribute('src', pokemon.front_shiny_female)
  } else if (pokemon.front_shiny_female == spriteAtual.currentSrc && pokemon.front_female != null) {
    document.querySelector('#sprite').setAttribute('src', pokemon.front_female)
  } else {
    document.querySelector('#sprite').setAttribute('src', pokemon.front_default)
  }
}

const ativaFemaleGender = () => {
  const spriteAtual = document.querySelector('#sprite')
  const pokemon = infoPokemon.data.sprites
  if (pokemon.front_default == spriteAtual.currentSrc && pokemon.front_female != null) {
    document.querySelector('#sprite').setAttribute('src', pokemon.front_female)
  } else if (pokemon.front_shiny == spriteAtual.currentSrc && pokemon.front_shiny_female != null) {
    document.querySelector('#sprite').setAttribute('src', pokemon.front_shiny_female)
  }
}

const ativaMaleGender = () => {
  const spriteAtual = document.querySelector('#sprite')
  const pokemon = infoPokemon.data.sprites
  if (pokemon.front_female == spriteAtual.currentSrc && pokemon.front_default != null) {
    document.querySelector('#sprite').setAttribute('src', pokemon.front_default)
  } else if (pokemon.front_shiny_female == spriteAtual.currentSrc && pokemon.front_shiny != null) {
    document.querySelector('#sprite').setAttribute('src', pokemon.front_shiny)
  }
}

pokemonIdMenor = () => {
  const spriteAtual = document.querySelector('#sprite')
  var pokemonIdMenor = infoPokemon.data.id - 1
  if (pokemonIdMenor < 1) {
    pokemonIdMenor = 898
  }
  location = `pokemon.html?info=${pokemonIdMenor}`
  buscarPokemon()
}

pokemonIdMaior = () => {
  const spriteAtual = document.querySelector('#sprite')
  var pokemonIdMaior = infoPokemon.data.id + 1
  if (pokemonIdMaior > 898) {
    pokemonIdMaior = 1
  }
  location = `pokemon.html?info=${pokemonIdMaior}`
  buscarPokemon()
}

buscarPokemon()
buscarPokemonSpecies()


function meuFavorito(seleciona) {
  seleciona.classList.toggle("fav-select");
}