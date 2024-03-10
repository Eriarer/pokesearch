let muted = sessionStorage.getItem('muted') ? JSON.parse(sessionStorage.getItem('muted')) : false;
let musicCurrentTime = sessionStorage.getItem('time') ? parseFloat(sessionStorage.getItem('time')) : 0;

let startAudio = () => {
    audio = new Audio('../sounds/audioFondo.wav');
    audio.volume = 0.25;
    audio.loop = true;
    musicIcon = $('#music');
    musicIcon.click(toggleMusic);
    // promesa de carga de audio
    if (!muted) {
        let promise = audio.play();
        audio.currentTime = musicCurrentTime;
        if (promise !== undefined) {
            promise.then(_ => { // Playback started
                musicIcon.attr('src', '../img/music.png');
                muted = false;
            }).catch(error => { //No se pudo reproducir el audio
                musicIcon.attr('src', '../img/musicDeaf.png');
                muted = true;
            });
        }
    } else {
        musicIcon.attr('src', '../img/musicDeaf.png');
    }
}

let toggleMusic = () => {
    // Si esta pausado, lo reproduce y cambia el icono
    if (audio.paused) {
        audio.play();
        musicIcon.attr('src', '../img/music.png');
        muted = false;
    } else { // Si esta reproduciendo, lo pausa y cambia el icono
        audio.pause();
        musicIcon.attr('src', '../img/musicDeaf.png');
        muted = true;
    }
}

let changePage = (path) => {
    sessionStorage.setItem('time', audio.currentTime + 0.3);
    sessionStorage.setItem('muted', JSON.stringify(muted));
    window.location.href = path;
}

$(document).ready(startAudio);
// cuando se refresque la pagina
$(document).on('beforeunload', () => {
    sessionStorage.setItem('time', audio.currentTime + 0.3);
    sessionStorage.setItem('muted', JSON.stringify(muted));
});