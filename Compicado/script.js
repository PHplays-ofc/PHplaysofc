let acionar = document.querySelector('.terminal')

function escrever(acao) {
  acionar.innerHTML += `<p>> ${acao}</p>`
}

let fogueto = document.querySelector('.foguetovisk')

function lancar(){
  fogueto.classList.toggle('elFogueto')
}