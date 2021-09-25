const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1/',
  timeout: 2500,
  headers: { Authorization: 'Bearer token' },
})

const getUsers = async () => {
  try {
    const res = await api.get('users')
    return res.data.data
  } catch (err) {
    console.error('erro ao buscar usuários: ', err)
    return []
  }
}

const getUserById = async (id) => {
  const res = await api.get(`users/${id}`)
  return res.data.data
}

const createUser = (user) => {
  api
    .post('users', user)
    .then((res) => {
      console.log(res)
      alert('Usuário criado com sucesso')
    })
    .catch((err) => console.error('Erro ao salvar usuário: ', err))
}

const updateUser = (user, id) => {
  api
    .put(`users/${id}`, user)
    .then(() => alert('Usuário atualizado com sucesso!'))
    .catch((err) => console.error('Erro ao atualizar usuario: ', err))
}
