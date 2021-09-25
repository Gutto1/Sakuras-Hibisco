function buscaDados(idForm) {
  const form = document.querySelector(idForm)
  return new FormData(form) //cria uma instância do FormData
}

const novoUsuario = () => {
  // buscar os dados do formulario
  const dados = buscaDados('#novoUsuario')
  // formatar de maneira que a API aceite
  const dadosUser = {
    name: dados.get('nome'),
    email: dados.get('email'),
    gender: dados.get('genero'),
    status: dados.get('ativo') ? 'active' : 'inactive',
  }
  // enviar os dados para a API
  createUser(dadosUser)
}

const editarUsuario = () => {
  const params = new URLSearchParams(location.search)
  const id = params.get('id')

  //buscar os dados do formulario
  const dados = buscaDados('#editarUsuario')
  //formatar de maneira que a API aceite
  const dadosUser = {
    name: dados.get('nome'),
    email: dados.get('email'),
    gender: dados.get('genero'),
    status: dados.get('ativo') ? 'active' : 'inactive',
  }
  //enviar os dados para a API
  updateUser(dadosUser, id)
}

const buscarUsuario = async () => {
  const params = new URLSearchParams(location.search)
  const id = params.get('id')
  const usuario = await getUserById(id)

  document.querySelector('input[name="nome"]').value = usuario.name
  document.querySelector('input[name="email"]').value = usuario.email
  document.querySelector('input[name="genero"]').value = usuario.gender
  document.querySelector('input[name="ativo"]').checked = usuario.status === 'active' ? true : false
}
