const irDetalhes = () => {
  const info = document.querySelector('input').value

  if (!info) {
    alert('Informe o nome ou número do pokémon')
    return
  }

  location = `pokemon.html?info=${info}`
}
