const audio = document.getElementById('audio');
const bars = document.querySelectorAll('.bar');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.querySelector('.play');
const pauseIcons = document.querySelectorAll('.pause');
const sliderThumb = document.getElementById('sliderThumb');
let animationId;
let time = 0;
let isPlaying = false;

// Función para animar las barras del ecualizador
function animateBars() {
    time += 0.05;
    bars.forEach((bar, index) => {
        const height = Math.sin(time + index) * 20 + 40;
        bar.setAttribute('height', height);
        bar.setAttribute('y', 100 - height);
    });

    animationId = requestAnimationFrame(animateBars);
}

// Función para alternar entre play y pausa
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        cancelAnimationFrame(animationId);
        playIcon.style.display = 'block';
        pauseIcons.forEach(icon => icon.style.display = 'none');
    } else {
        audio.play();
        animateBars();
        playIcon.style.display = 'none';
        pauseIcons.forEach(icon => icon.style.display = 'block');
    }
    isPlaying = !isPlaying;
}

// Evento para alternar play/pausa al hacer clic en el botón
playPauseBtn.addEventListener('click', togglePlayPause);

// Detener la animación y mostrar el icono de play cuando el audio termine
audio.addEventListener('ended', () => {
    cancelAnimationFrame(animationId);
    playIcon.style.display = 'block';
    pauseIcons.forEach(icon => icon.style.display = 'none');
    isPlaying = false;
});

// Evento para ajustar el volumen al hacer clic en el slider
const volumeSliderContainer = document.querySelector('.volume-slider-container');
volumeSliderContainer.addEventListener('click', (e) => {
    const rect = volumeSliderContainer.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const volume = offsetX / rect.width;
    sliderThumb.setAttribute('cx', `${volume * rect.width}`);
    audio.volume = volume;
});
