import fetch from "node-fetch";
import * as readline from "readline";

// === Cria o prompt ===
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(pergunta: string): Promise<string> {
  return new Promise((resolve) => rl.question(pergunta, resolve));
}

// === Busca na API do DuckDuckGo ===
async function buscarNaWeb(query: string) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`;
  const resposta = await fetch(url);
  const dados = await resposta.json();
  return dados;
}

// === Extrai textos (recursivamente) ===
function extrairTextos(topicos: any[]): string[] {
  const resultados: string[] = [];
  for (const item of topicos) {
    if (item.Text) resultados.push(item.Text);
    if (item.Topics) resultados.push(...extrairTextos(item.Topics));
  }
  return resultados;
}

// === Gera o texto final ===
function gerarResumo(dados: any): string {
  let textoFinal = "";

  if (dados.AbstractText && dados.AbstractText.trim().length > 0) {
    textoFinal += `🧠 ${dados.AbstractText}\n\n`;
  }

  const resultados = dados.RelatedTopics ? extrairTextos(dados.RelatedTopics) : [];

  if (resultados.length > 0) {
    textoFinal += "🔍 Resultados relacionados:\n";
    resultados.slice(0, 5).forEach((texto, i) => {
      textoFinal += `${i + 1}. ${texto}\n`;
    });
  } else if (!dados.AbstractText) {
    textoFinal += "❌ Nenhum resultado relevante encontrado.\n";
  }

  return textoFinal;
}

// === Execução principal ===
(async () => {
  console.log("=== 🔎 Mini AI Pesquisadora (DuckDuckGo) ===\n");

  const pergunta = await perguntar("O que você quer saber? ");
  console.log("\n🔍 Pesquisando na web...\n");

  const dados = await buscarNaWeb(pergunta);
  const resumo = gerarResumo(dados);

  console.log(resumo);
  rl.close();
})();
