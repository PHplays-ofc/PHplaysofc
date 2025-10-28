// Tipos e interfaces
interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: "entrada" | "saida";
}

// Seletores DOM tipados
const descInput = document.getElementById("desc") as HTMLInputElement;
const valorInput = document.getElementById("valor") as HTMLInputElement;
const tipoSelect = document.getElementById("tipo") as HTMLSelectElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const lista = document.getElementById("transacoes") as HTMLUListElement;
const saldoSpan = document.getElementById("saldo") as HTMLSpanElement;

let transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes") || "[]");
let chart: Chart | null = null;

// Salvar no localStorage
function salvarTransacoes(): void {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

// Renderizar lista e resumo
function render(): void {
  lista.innerHTML = "";
  let total = 0;
  let entradas = 0;
  let saidas = 0;

  transacoes.forEach((t: Transacao) => {
    const li = document.createElement("li");
    li.innerHTML = `${t.descricao} - ${t.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })} 
    <button class="delBtn" data-id="${t.id}">❌</button>`;

    li.style.color = t.tipo === "entrada" ? "green" : "red";
    lista.appendChild(li);

    if (t.tipo === "entrada") {
      entradas += t.valor;
      total += t.valor;
    } else {
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
addBtn.addEventListener("click", (): void => {
  const descricao = descInput.value.trim();
  const valor = parseFloat(valorInput.value);
  const tipo = tipoSelect.value as "entrada" | "saida";

  if (!descricao || isNaN(valor)) return;

  const nova: Transacao = {
    id: Date.now().toString(),
    descricao,
    valor,
    tipo
  };

  transacoes.push(nova);
  salvarTransacoes();
  render();

  descInput.value = "";
  valorInput.value = "";
});

// Excluir transação
lista.addEventListener("click", (e: MouseEvent): void => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("delBtn")) {
    const id = target.dataset.id;
    if (!id) return;

    transacoes = transacoes.filter((t) => t.id !== id);
    salvarTransacoes();
    render();
  }
});

// Atualizar gráfico
function atualizarGrafico(entradas: number, saidas: number): void {
  const ctx = document.getElementById("financeChart") as HTMLCanvasElement;

  if (chart) chart.destroy();

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
