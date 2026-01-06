
const quiz = [
  {
    q: "👀 Você já viu pragas no local?",
    a: [
      { t: "🟢 Não, nunca vi", v: 1, c: "btn-green" },
      { t: "🟡 Já vi algumas vezes", v: 2, c: "btn-yellow" },
      { t: "🔴 Vejo direto", v: 3, c: "btn-red" }
    ]
  },
  {
    q: "🌿 O local tem quintal ou vegetação?",
    a: [
      { t: "🟢 Não", v: 1, c: "btn-green" },
      { t: "🟡 Um pouco", v: 2, c: "btn-yellow" },
      { t: "🔴 Bastante", v: 3, c: "btn-red" }
    ]
  },
  {
    q: "👥 Circula muita gente aí?",
    a: [
      { t: "🟢 Pouca", v: 1, c: "btn-green" },
      { t: "🟡 Média", v: 2, c: "btn-yellow" },
      { t: "🔴 Muita", v: 3, c: "btn-red" }
    ]
  },
  {
    q: "🧪 Já fez dedetização antes?",
    a: [
      { t: "🔴 Nunca", v: 3, c: "btn-red" },
      { t: "🟡 Faz tempo", v: 2, c: "btn-yellow" },
      { t: "🟢 Recentemente", v: 1, c: "btn-green" }
    ]
  }
];

let i = 0;
let score = 0;

const q = document.getElementById("quizQuestion");
const o = document.getElementById("quizOptions");
const p = document.getElementById("quizProgress");

function loadQuiz() {
  const item = quiz[i];
  q.innerHTML = item.q;
  o.innerHTML = "";

  item.a.forEach(btn => {
    const b = document.createElement("button");
    b.className = btn.c;
    b.innerHTML = btn.t;
    b.onclick = () => next(btn.v);
    o.appendChild(b);
  });

  p.style.width = ((i + 1) / quiz.length) * 100 + "%";
}

function next(v) {
  score += v;
  i++;

  if (i < quiz.length) {
    loadQuiz();
  } else {
    result();
  }
}

function result() {
  let nivel = "baixo";
  let msg = "Parece tranquilo, mas prevenção é sempre a melhor opção 😉";

  if (score >= 9) {
    nivel = "alto";
    msg = "🚨 Atenção! O risco é alto e o ideal é agir agora.";
  } else if (score >= 6) {
    nivel = "médio";
    msg = "⚠️ O risco é moderado. Dá pra evitar dor de cabeça.";
  }

  q.innerHTML = `Resultado: <strong>${nivel.toUpperCase()}</strong>`;
  o.innerHTML = `
    <p class="mb-4">${msg}</p>
    <a href="https://wa.me/5514997870187?text=Olá,%20fiz%20o%20quiz%20no%20site%20e%20meu%20risco%20é%20${nivel}"
       target="_blank"
       class="btn btn-success btn-lg w-100">
       <i class="bi bi-whatsapp"></i> Falar agora no WhatsApp
    </a>
  `;
}

loadQuiz();

