const quiz = [
  {
    q: "👀 Você já viu pragas no local?",
    a: [
      { t: "🟢 Não, nunca vi", v: 1, c: "btn-green" },
      { t: "🟡 Raramente", v: 2, c: "btn-yellow" },
      { t: "🔴 Vejo direto", v: 3, c: "btn-red" }
    ]
  },
  {
    q: "📍 Qual local?",
    a: [
      { t: "🟢 Área social", v: 1, c: "btn-green" },
      { t: "🟡 Área comum", v: 2, c: "btn-yellow" },
      { t: "🔴 Área de alimentação", v: 3, c: "btn-red" }
    ]
  },
  {
    q: "🤧 Tem pessoas alérgicas no local?",
    a: [
      { t: "🟢 Não", v: 1, c: "btn-green" },
      { t: "🟡 Não sei / talvez", v: 2, c: "btn-yellow" },
      { t: "🔴 Sim", v: 3, c: "btn-red" }
    ]
  },
  {
    q: "🕒 Qual período costuma ver a praga?",
    a: [
      { t: "🟢 De dia", v: 1, c: "btn-green" },
      { t: "🟡 À tarde", v: 2, c: "btn-yellow" },
      { t: "🔴 À noite / madrugada", v: 3, c: "btn-red" }
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
const counter = document.getElementById("quizCounter");

function loadQuiz() {
  const item = quiz[i];
  q.innerHTML = item.q;
  o.innerHTML = "";

  // contador “Pergunta X de N”
  if (counter) counter.textContent = `Pergunta ${i + 1} de ${quiz.length}`;

  item.a.forEach(btn => {
    const b = document.createElement("button");
    b.className = btn.c;
    b.innerHTML = btn.t;
    b.onclick = () => next(btn.v);
    o.appendChild(b);
  });

  // progresso
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

function resetQuiz() {
  i = 0;
  score = 0;
  loadQuiz();
}

function result() {
  let nivel = "baixo";
  let msg = "Parece tranquilo, mas prevenção é sempre a melhor opção 😉";

  // Agora são 5 perguntas (score mínimo 5 e máximo 15)
  if (score >= 12) {
    nivel = "alto";
    msg = "🚨 Atenção! O grau de incidência é alto e o ideal é agir agora.";
  } else if (score >= 9) {
    nivel = "médio";
    msg = "⚠️ O grau de incidência é moderado. Dá pra evitar dor de cabeça.";
  }

  if (counter) counter.textContent = `Finalizado • ${quiz.length} perguntas`;

  q.innerHTML = `Resultado: <strong>${nivel.toUpperCase()}</strong>`;
  o.innerHTML = `
    <p class="mb-4">${msg}</p>

    <a href="https://wa.me/5514997870187?text=Olá,%20fiz%20o%20quiz%20no%20site%20e%20meu%20grau%20de%20incidência%20é%20${nivel}"
       target="_blank"
       class="btn btn-success btn-lg w-100 mb-3">
       <i class="bi bi-whatsapp"></i> Falar agora no WhatsApp
    </a>

    <button type="button" class="btn btn-outline-secondary btn-lg w-100" id="quizRestart">
      Reiniciar quiz
    </button>
  `;

  document.getElementById("quizRestart").addEventListener("click", resetQuiz);
}

loadQuiz();

// Trocar texto do botão "Veja mais serviços" ↔ "Ver menos serviços"
document.addEventListener("DOMContentLoaded", () => {
  const collapseEl = document.getElementById("moreServicesCollapse");
  const textEl = document.getElementById("moreServicesText");

  if (!collapseEl || !textEl) return;

  collapseEl.addEventListener("show.bs.collapse", () => {
    textEl.textContent = "Ver menos serviços";
  });

  collapseEl.addEventListener("hide.bs.collapse", () => {
    textEl.textContent = "Veja mais serviços";
  });
});

// Scroll automático ao abrir "Veja mais serviços"
document.addEventListener("DOMContentLoaded", () => {
  const collapseEl = document.getElementById("moreServicesCollapse");

  if (!collapseEl) return;

  collapseEl.addEventListener("shown.bs.collapse", () => {
    collapseEl.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
