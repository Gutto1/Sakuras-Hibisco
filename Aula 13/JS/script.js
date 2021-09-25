async function inicializaTela() {
  const usuarios = await getUsers()
  const tabela = document.querySelector('.tabela-usuarios')

  usuarios.forEach((usuario) => {
    const linha = document.createElement('tr')
    const nome = document.createElement('td')
    const genero = document.createElement('td')
    const email = document.createElement('td')
    const status = document.createElement('td')

    nome.innerHTML = usuario.name
    genero.innerHTML = usuario.gender
    email.innerHTML = usuario.email
    status.innerHTML = usuario.status

    linha.appendChild(nome)
    linha.appendChild(genero)
    linha.appendChild(email)
    linha.appendChild(status)

    tabela.appendChild(linha)
  })

  document.querySelector('.loading').style.display = 'none'
  tabela.style.display = 'table'
}

inicializaTela()
