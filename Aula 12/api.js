const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v1/',
  timeout: 2500,
  headers: { Authorization: 'Bearer cola seu access token aqui' },
})

const getUsers = async () => {
  try {
    const res = await api.get('users')
    return res.data.data
  } catch (err) {
    console.error('erro ao buscar usuários: ', err)
    return null
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
