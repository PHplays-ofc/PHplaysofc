let item = document.getElementById('adicionar-item') as HTMLInputElement;
let lista = document.getElementById('lista') as HTMLOListElement;


let contador: number = 0

function enviar() {
    let valor = item.value.trim()

    if (valor == '') {
        return;
    }

    const li = document.createElement('li');
    li.textContent = valor;


    lista.appendChild(li);


}