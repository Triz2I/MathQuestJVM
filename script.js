// Gráfico de função quadrática com sliders (a, b, c)
const ctx = document.getElementById('graficoFuncao').getContext('2d');

// Pegar valores iniciais dos sliders
let a = parseFloat(document.getElementById('a').value);
let b = parseFloat(document.getElementById('b').value);
let c = parseFloat(document.getElementById('c').value);

// Função para gerar dados da parábola
function gerarDados(a, b, c) {
  return Array.from({ length: 41 }, (_, i) => {
    const x = i - 20;
    return { x: x, y: a * x * x + b * x + c };
  });
}

// Função para criar gradiente de fundo vermelho
function criarGradient() {
  let gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(206,0,0,0.2)');   // vermelho suave
  gradient.addColorStop(1, 'rgba(255,150,150,0.05)'); // degradê mais claro
  return gradient;
}

// Criar gráfico
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [{
      label: 'y = ax² + bx + c',
      data: gerarDados(a, b, c),
      borderColor: '#ce0000',         // vermelho principal
      backgroundColor: criarGradient(),
      fill: true,
      tension: 0.4,
      pointRadius: 0
    }]
  },
  options: {
    responsive: true,
    animation: { duration: 500, easing: 'easeInOutQuad' }, // transição suave
    plugins: {
      legend: {
        display: true,
        labels: { color: "#222" }
      }
    },
    scales: {
      x: { type: 'linear', position: 'bottom' },
      y: { beginAtZero: true }
    }
  }
});

// Atualizar gráfico e gradiente quando sliders mudam
['a', 'b', 'c'].forEach(param => {
  document.getElementById(param).addEventListener('input', () => {
    a = parseFloat(document.getElementById('a').value);
    b = parseFloat(document.getElementById('b').value);
    c = parseFloat(document.getElementById('c').value);

    chart.data.datasets[0].data = gerarDados(a, b, c);
    chart.data.datasets[0].backgroundColor = criarGradient(); // atualiza gradiente
    chart.update();
  });
});
