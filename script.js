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
let inicio = null;
let fim = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
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
    mostrarTempo(tempoDecorridoEmSegundos);
    botoes.forEach(btn => btn.classList.remove('active'));
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Energia total ativada,<br>
                <strong class="app__title-strong">chegue no seu melhor agora.</strong>
            `;
            break;

        case "descanso-curto":
            titulo.innerHTML = `
                Respire fundo e recarregue,<br>
                <strong class="app__title-strong">pausa rápida, mente afiada.</strong>
            `;
            break;

        case "descanso-longo":
            titulo.innerHTML = `
                Pause para resetar,<br>
                <strong class="app__title-strong">uma pausa longa para renascer.</strong>
            `;
            break;
    }
}

const contagemRegressiva = () => {
    const agora = Date.now();
    const restante = Math.max(0, Math.round((fim - agora) / 1000));

    mostrarTempo(restante);

    if (restante <= 0) {
        clearInterval(intervaloId);
        intervaloId = null;
        somBeep.play();
        setTimeout(() => alert('Tempo Finalizado!'), 500);

        if (html.getAttribute('data-contexto') === 'foco') {
            const evento = new CustomEvent('focoFinalizado');
            document.dispatchEvent(evento);
        }

        iniciarOuPausarBtn.textContent = 'Começar';
        startOuPauseImg.setAttribute('src', './imagens/play_arrow.png');
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
    inicio = Date.now();
    fim = inicio + tempoDecorridoEmSegundos * 1000;
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = 'Pausar';
    startOuPauseImg.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    // recalcula tempo restante para retomar de onde parou
    tempoDecorridoEmSegundos = Math.max(0, Math.round((fim - Date.now()) / 1000));
    iniciarOuPausarBtn.textContent = 'Começar';
    startOuPauseImg.setAttribute('src', './imagens/play_arrow.png');
}

function mostrarTempo(segundos = tempoDecorridoEmSegundos) {
    const tempo = new Date(segundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    });
    timer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
