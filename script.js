// Gráfico de função quadrática com sliders (a, b, c)
const ctx = document.getElementById('graficoFuncao').getContext('2d');

let a = parseFloat(document.getElementById('a').value);
let b = parseFloat(document.getElementById('b').value);
let c = parseFloat(document.getElementById('c').value);

function gerarDados(a, b, c) {
  return Array.from({ length: 41 }, (_, i) => {
    const x = i - 20;
    return { x: x, y: a * x * x + b * x + c };
  });
}

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: 'y = ax² + bx + c',
      data: gerarDados(a, b, c),
      borderColor: '#42d392',
      backgroundColor: 'rgba(66,211,146,0.3)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      x: { type: 'linear', position: 'bottom' },
      y: { beginAtZero: true }
    }
  }
});

// Atualizar gráfico quando sliders mudam
['a','b','c'].forEach(param => {
  document.getElementById(param).addEventListener('input', () => {
    a = parseFloat(document.getElementById('a').value);
    b = parseFloat(document.getElementById('b').value);
    c = parseFloat(document.getElementById('c').value);

    chart.data.datasets[0].data = gerarDados(a, b, c);
    chart.update();
  });
});

// =====================
// NOVOS INTERATIVOS
// =====================

// Exercício rápido
function verificarResposta() {
  const resposta = document.getElementById("resposta1").value;
  const feedback = document.getElementById("feedback1");
  if (resposta == 56) {
    feedback.textContent = "✅ Correto!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Tente novamente.";
    feedback.style.color = "red";
  }
}

// Quiz vestibular
function verificarQuiz() {
  const resposta = document.getElementById("respostaQuiz").value;
  const feedback = document.getElementById("feedbackQuiz");
  if (resposta == 12) {
    feedback.textContent = "✅ Arrasou! √144 = 12.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Resposta incorreta. Tente novamente.";
    feedback.style.color = "red";
  }
}
