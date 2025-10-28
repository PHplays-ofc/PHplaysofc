
  // Pega todas as divs de perguntas
  const perguntas = document.querySelectorAll('.quadroQuis');
  let perguntaAtual = 0;
  let pontuacao = 0;

  function mostrarPergunta(indice) {
    perguntas.forEach((p, i) => {
      p.style.display = i === indice ? 'block' : 'none';
    });
    perguntas[indice].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function finalizarQuiz() {
    const container = document.createElement('div');
    container.style.background = '#222';
    container.style.color = '#0f0';
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.maxWidth = '600px';
    container.style.margin = '40px auto';
    container.style.textAlign = 'center';
    container.innerHTML = `
      <h2>Quiz finalizado!</h2>
      <p>Sua pontuação foi <strong>${pontuacao} de ${perguntas.length}</strong>.</p>
      <button id="reiniciar">Jogar novamente</button>
    `;
    document.body.appendChild(container);
    container.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('reiniciar').addEventListener('click', () => {
      pontuacao = 0;
      perguntaAtual = 0;
      container.remove();
      mostrarPergunta(perguntaAtual);
    });
  }

  function configurarBotoes(p) {
    const botoes = p.querySelectorAll('button');
    botoes.forEach(botao => {
      botao.disabled = false;
      botao.style.backgroundColor = '#333';
      botao.style.color = '#fff';

      botao.onclick = () => {
        // Desabilita todos os botões para evitar múltiplos cliques
        botoes.forEach(b => b.disabled = true);

        // Verifica se acertou
        const acertou = botao.hasAttribute('data-correct');

        if (acertou) {
          botao.style.backgroundColor = '#4CAF50'; // verde
          pontuacao++;
        } else {
          botao.style.backgroundColor = '#f44336'; // vermelho
          // Mostrar a resposta certa
          botoes.forEach(b => {
            if (b.hasAttribute('data-correct')) {
              b.style.backgroundColor = '#4CAF50';
            }
          });
        }

        // Após 1s, vai para próxima pergunta ou finaliza
        setTimeout(() => {
          perguntaAtual++;
          if (perguntaAtual < perguntas.length) {
            mostrarPergunta(perguntaAtual);
            configurarBotoes(perguntas[perguntaAtual]);
          } else {
            finalizarQuiz();
          }
        }, 1000);
      };
    });
  }

  // Inicializa
  mostrarPergunta(perguntaAtual);
  configurarBotoes(perguntas[perguntaAtual]);
