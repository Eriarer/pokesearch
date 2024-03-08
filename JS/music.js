let startAudio = () => {
    audio = new Audio('../sounds/audioFondo.wav');
    audio.play();
    audio.volume = 0.35;
    audio.loop = true;

    musicIcon = $('#music');
    musicIcon.click(toggleMusic);
}

let toggleMusic = () => {
    // Si esta pausado, lo reproduce y cambia el icono
    if (audio.paused) {
        audio.play();
        musicIcon.attr('src', '../img/music.png');
    } else { // Si esta reproduciendo, lo pausa y cambia el icono
        audio.pause();
        musicIcon.attr('src', '../img/musicDeaf.png');
    }
}
$(document).ready(startAudio);