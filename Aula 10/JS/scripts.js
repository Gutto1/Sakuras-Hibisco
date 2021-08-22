function buscaDados(idForm) {
  const form = document.querySelector(idForm)
  return new FormData(form) //cria uma instância do FormData
}

function criaNotificacao(mensagem) {
  const notificacao = document.createElement('div')
  const textoNotificacao = document.createElement('span')

  textoNotificacao.style.backgroundColor = '#842e8f'
  textoNotificacao.style.padding = '8px'

  textoNotificacao.innerHTML = mensagem

  notificacao.appendChild(textoNotificacao)
  notificacao.classList.add('notificacao')
  const body = document.querySelector('body')

  body.appendChild(notificacao)

  setTimeout(() => {
    body.removeChild(notificacao)
  }, 2000)
}

function criarConta() {
  const dados = buscaDados('#cadastro')

  // busca informação do localStorage
  const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || []

  let dadosUsuario = {
    usuario: dados.get('usuario'),
    senha: dados.get('senha'),
    confirmaSenha: dados.get('confirmar-senha'),
  }

  if (dadosUsuario.senha === dadosUsuario.confirmaSenha) {
    listaUsuarios.push(dadosUsuario)
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios))

    window.location.href = 'index.html'
  } else {
    const divErro = document.querySelector('#erro')
    divErro.style.opacity = 1
  }
}

function login() {
  //Obter as informações do form - OK
  const dados = buscaDados('#login-form')

  const infoLogin = {
    usuario: dados.get('usuario'),
    senha: dados.get('senha'),
  }

  //Buscar a lista de usuarios no localStorage - OK
  const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || []

  //Comparar o usuario e senha do form - OK
  const loginCorreto = listaUsuarios.find(
    (item) => item.usuario === infoLogin.usuario && item.senha === infoLogin.senha
  )

  //Redirecionar caso correto ou mostrar erro caso incorreto - OK
  if (loginCorreto) {
    window.location.href = 'lista.html'
  } else {
    document.querySelector('#erro').style.opacity = 1
  }
}

function salvarJogo() {
  //Pegar os dados do form
  const dados = buscaDados('#cadastro-jogos')

  const infoCadastro = {
    nome: dados.get('nome'),
    preco: dados.get('preco'),
    genero: dados.get('genero'),
  }

  //Salvar o jogo em uma lista no localStorage
  const listaJogos = JSON.parse(localStorage.getItem('listaJogos')) || []

  listaJogos.push(infoCadastro)

  localStorage.setItem('listaJogos', JSON.stringify(listaJogos))
  criaNotificacao('Jogo salvo com sucesso!')

  //Limpar os dados do formulário
  document.querySelector('form').reset()
}
