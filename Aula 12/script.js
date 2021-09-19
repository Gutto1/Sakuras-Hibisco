async function inicializaTela() {
  const usuarios = await getUsers()

  ;(usuarios || []).forEach((usuario) => {
    const tabela = document.querySelector('#listaUsers') // buscar a tabela na tela

    const linha = document.createElement('tr') // tr = linha na tabela
    const nome = document.createElement('td') // td = coluna na tabela
    const email = document.createElement('td') // td = coluna na tabela
    const genero = document.createElement('td') // td = coluna na tabela
    const status = document.createElement('td') // td = coluna na tabela

    nome.innerHTML = usuario.name
    email.innerHTML = usuario.email
    genero.innerHTML = usuario.gender
    status.innerHTML = usuario.status

    linha.appendChild(nome)
    linha.appendChild(email)
    linha.appendChild(genero)
    linha.appendChild(status)

    tabela.appendChild(linha)
  })
}

inicializaTela()
