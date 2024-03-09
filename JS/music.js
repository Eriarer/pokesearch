let startAudio = () => {
    audio = new Audio('../sounds/audioFondo.wav');
    audio.volume = 0.25;
    audio.loop = true;

    musicIcon = $('#music');
    musicIcon.click(toggleMusic);
    // lanzar un sweet alert para confirmar si quiere reproducir el audio
    Swal.fire({
        title: '¿Quieres reproducir el audio?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        // Establece estilos personalizados para los botones
        customClass: {
            confirmButton: 'pokeButton',
            cancelButton: 'pokeButton-cancel'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            audio.play();
        } else {
            musicIcon.attr('src', '../img/musicDeaf.png');
        }
    });

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