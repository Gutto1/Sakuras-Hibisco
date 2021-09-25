const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1/',
  timeout: 2500,
  headers: { Authorization: 'Bearer [tokenAqui]' },
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

const getUserById = (id) => {
  api
    .get(`users/${id}`)
    .then((res) => {
      // se deu certo!
      console.log('Usuario: ', res)
    })
    .catch((err) => console.error('Erro ao buscar usuario: ', err)) // se deu erro!
}
