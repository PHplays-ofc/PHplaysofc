var item = document.getElementById('adicionar-item');
var lista = document.getElementById('lista');
var contador = 0;
function enviar() {
    var valor = item.value.trim();
    if (valor == '') {
        return;
    }
    var li = document.createElement('li');
    li.textContent = valor;
    lista.appendChild(li);
}
