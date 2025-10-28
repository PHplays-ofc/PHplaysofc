let tecla = document.querySelector('.botoes')
let tela = document.querySelector('.tela')
let numero1 = ''
let numero2 = ''
let operador = ''
let resultado = ''

function clicar(clique) {

    tela.innerHTML += clique

    if (clique === 'C') {
        numero1 = ''
        numero2 = ''
        operador = ''
        resuoltado = ''
        tela.innerHTML = '0'
    } else if (clique === '+' || clique === '-' || clique === '*' || clique === '/') {
        if (numero1 !== '') {
            operador = clique
            tela.innerHTML = operador
        }
    }
    else if (clique === '=') {
        let n1 = parseFloat(numero1)
        let n2 = parseFloat(numero2)

        if (operador === '+') {
            resultado = n1 + n2
        } else if (operador === '-') {
            resultado = n1 - n2
        } else if (operador === '*') {
            resultado = n1 * n2
        } else if (operador === '/') {
            resultado = n1 / n2
        }

        tela.innerHTML = resultado

        numero1 = resultado.toString();
        numero2 = '';
        operador = '';

    } else {
        if (operador === '') {
            numero1 += clique
            tela.innerHTML = numero1
        } else if (operador !== '') {
            numero2 += clique
            tela.innerHTML = numero2
        }
    }

}
