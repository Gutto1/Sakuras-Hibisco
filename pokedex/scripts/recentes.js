const carregaPagina = () => {
  // ir até o localStorage buscar a lista de recentes
  const lista = JSON.parse(localStorage.getItem('buscasRecentes')) || []
  // renderizar a lista criando os elementos no DOM
  lista.reverse()
  lista.forEach((pokemon) => {
    const mainContent = document.querySelector('.main_content')
    const linha = document.createElement('article')
    const img = document.createElement('img')
    const span = document.createElement('span')
    const svg = document.createElement('object')

    svg.setAttribute('type', 'image/svg+xml')
    svg.setAttribute('data', '../assets/trash.svg')
    svg.classList.add('icone')

    linha.classList.add('linha_pokemon')
    img.setAttribute('src', pokemon.sprites.front_default)
    span.innerHTML = pokemon.name

    linha.appendChild(img)
    linha.appendChild(span)
    linha.appendChild(svg)
    mainContent.appendChild(linha)
  })
}

carregaPagina()
