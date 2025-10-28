// Seletores DOM tipados
var descInput = document.getElementById("desc");
var valorInput = document.getElementById("valor");
var tipoSelect = document.getElementById("tipo");
var addBtn = document.getElementById("addBtn");
var lista = document.getElementById("transacoes");
var saldoSpan = document.getElementById("saldo");
var transacoes = JSON.parse(localStorage.getItem("transacoes") || "[]");
var chart = null;
// Salvar no localStorage
function salvarTransacoes() {
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
}
// Renderizar lista e resumo
function render() {
    lista.innerHTML = "";
    var total = 0;
    var entradas = 0;
    var saidas = 0;
    transacoes.forEach(function (t) {
        var li = document.createElement("li");
        li.innerHTML = "".concat(t.descricao, " - ").concat(t.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }), " \n    <button class=\"delBtn\" data-id=\"").concat(t.id, "\">\u274C</button>");
        li.style.color = t.tipo === "entrada" ? "green" : "red";
        lista.appendChild(li);
        if (t.tipo === "entrada") {
            entradas += t.valor;
            total += t.valor;
        }
        else {
            saidas += t.valor;
            total -= t.valor;
        }
    });
    saldoSpan.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    saldoSpan.style.color = total >= 0 ? "green" : "red";
    atualizarGrafico(entradas, saidas);
}
// Adicionar nova transação
addBtn.addEventListener("click", function () {
    var descricao = descInput.value.trim();
    var valor = parseFloat(valorInput.value);
    var tipo = tipoSelect.value;
    if (!descricao || isNaN(valor))
        return;
    var nova = {
        id: Date.now().toString(),
        descricao: descricao,
        valor: valor,
        tipo: tipo
    };
    transacoes.push(nova);
    salvarTransacoes();
    render();
    descInput.value = "";
    valorInput.value = "";
});
// Excluir transação
lista.addEventListener("click", function (e) {
    var target = e.target;
    if (target.classList.contains("delBtn")) {
        var id_1 = target.dataset.id;
        if (!id_1)
            return;
        transacoes = transacoes.filter(function (t) { return t.id !== id_1; });
        salvarTransacoes();
        render();
    }
});
// Atualizar gráfico
function atualizarGrafico(entradas, saidas) {
    var ctx = document.getElementById("financeChart");
    if (chart)
        chart.destroy();
    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Entradas", "Saídas"],
            datasets: [
                {
                    data: [entradas, saidas],
                    backgroundColor: ["#4CAF50", "#F44336"]
                }
            ]
        }
    });
}
// Inicialização
render();
