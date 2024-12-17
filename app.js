// step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000; // Tempo de transição entre os slides

nextDom.onclick = function() {
    showSlider('next');
};

prevDom.onclick = function() {
    showSlider('prev');
};

let runTimeOut;

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);
}

document.body.addEventListener('click', () => {
    document.querySelector('audio').play();
}, { once: true });

const modal = document.getElementById("modal");
const acceptButton = document.getElementById("accept");
const declineButton = document.getElementById("decline");
const items = document.querySelectorAll(".carousel .list .item");
let currentAudio = null;
let soundEnabled = localStorage.getItem("soundEnabled") === "true";

// Exibe o modal na primeira vez que o site é acessado
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("soundEnabled") === null) {
        modal.classList.remove("hidden");
    } else {
        initializeAudio();
    }
});

// Configuração de escolha do usuário
acceptButton.addEventListener("click", () => {
    soundEnabled = true;
    localStorage.setItem("soundEnabled", "true");
    modal.classList.add("hidden");
    initializeAudio();
});

declineButton.addEventListener("click", () => {
    soundEnabled = false;
    localStorage.setItem("soundEnabled", "false");
    modal.classList.add("hidden");
});

// Inicializa o controle do áudio
function initializeAudio() {
    items.forEach((item, index) => {
        const audio = item.querySelector("audio");
        if (audio) {
            audio.loop = true;
            audio.pause();
        }

        // Ativa o áudio quando o item correspondente está ativo
        item.addEventListener("mouseenter", () => {
            if (soundEnabled && audio) {
                stopCurrentAudio();
                currentAudio = audio;
                audio.play();
            }
        });

        // Para o áudio ao sair do item
        item.addEventListener("mouseleave", () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0; // Reinicia o áudio
            }
        });
    });
}

// Para o áudio atualmente ativo
function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

// Controle do carrossel para alterar o item ativo
let currentIndex = 0;

nextDom.addEventListener("click", () => {
    changeItem("next");
});

prevDom.addEventListener("click", () => {
    changeItem("prev");
});

function changeItem(direction) {
    const activeItem = items[currentIndex];
    activeItem.classList.remove("active");

    if (direction === "next") {
        currentIndex = (currentIndex + 1) % items.length;
    } else {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    const newActiveItem = items[currentIndex];
    newActiveItem.classList.add("active");

    // Controle do áudio com base no item ativo
    if (soundEnabled) {
        stopCurrentAudio();
        const audio = newActiveItem.querySelector("audio");
        if (audio) {
            currentAudio = audio;
            audio.play();
        }
    }
}


