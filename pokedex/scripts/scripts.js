const irDetalhes = () => {
  const info = document.querySelector('input').value

  if (!info) {
    alert('Informe o nome ou número do pokémon')
    return
  }

  location = `pokemon.html?info=${info}`
}

const buscarAleatorio = () => {
  //gerar um numero aleatório de 1 até 898 e navegar para a página de detalhes
  const numAleatorio = Math.floor(Math.random() * 898)
  location = `pokemon.html?info=${numAleatorio}`
}
