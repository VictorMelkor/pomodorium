const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const startOuPauseImg = document.querySelector('.app__card-primary-butto-icon');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somBeep = new Audio('./sons/beep.mp3');
const startPauseBtn = document.getElementById('start-pause');
const timer = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
let tempoFinal = null; // 🔥 Armazena o horário exato de término

musica.loop = true;

// 🔔 Solicita permissão para notificações ao carregar a página
if ("Notification" in window) {
    Notification.requestPermission();
}

musicaFocoInput.addEventListener('change', () => {
    musica.paused ? musica.play() : musica.pause();
});

focoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBtn.classList.add('active');
});

longoBtn.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBtn.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(btn => btn.classList.remove('active'));
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Energia total ativada,<br><strong class="app__title-strong">chegue no seu melhor agora.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Respire fundo e recarregue,<br><strong class="app__title-strong">pausa rápida, mente afiada.</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Pause para resetar,<br><strong class="app__title-strong">uma pausa longa para renascer.</strong>`;
            break;
    }
}

// 🔥 Nova contagem que usa o relógio do sistema
const contagemRegressiva = () => {
    const agora = Date.now();
    const restante = Math.max(0, Math.floor((tempoFinal - agora) / 1000));

    tempoDecorridoEmSegundos = restante;
    mostrarTempo();

    if (restante <= 0) {
        somBeep.play();
        enviarNotificacao("⏳ Tempo Finalizado!", "Seu ciclo foi concluído com sucesso.");
        setTimeout(() => alert('Tempo Finalizado!'), 500);

        const focoAtivo = html.getAttribute('data-contexto') === 'foco';
        if (focoAtivo) {
            document.dispatchEvent(new CustomEvent('focoFinalizado'));
        }
        zerar();
    }
};

startPauseBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play();
        zerar();
        return;
    }
    somPlay.play();

    // 🔥 Define o horário exato que a contagem deve terminar
    tempoFinal = Date.now() + tempoDecorridoEmSegundos * 1000;

    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = 'Pausar';
    startOuPauseImg.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBtn.textContent = 'Começar';
    startOuPauseImg.setAttribute('src', './imagens/play_arrow.png');
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-BR', { minute: '2-digit', second: '2-digit' });
    timer.innerHTML = `${tempoFormatado}`;
}

// 🔔 Cria uma notificação nativa (somente se permitido)
function enviarNotificacao(titulo, corpo) {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(titulo, {
            body: corpo,
            icon: "./imagens/foco.png"
        });
    }
}

mostrarTempo();
