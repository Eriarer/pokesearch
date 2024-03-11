let nextLever = false;
// Array que contiene las rutas de tus imágenes
var imagenes = [
    {
        pokemon: 'media/pokemon/001.png',
        fondo: 'media/backgrounds/grass.png',
        num: 0,
        voice: 'media/voices/bulbasaur.wav',
        voicename: 'media/names/bulbasaur.wav',
        name: 'Bulbasaur'
    },
    {
        pokemon: 'media/pokemon/004.png',
        fondo: 'media/backgrounds/fire.png',
        num: 0,
        voice: 'media/voices/charmander.wav',
        voicename: 'media/names/charmander.wav',
        name: 'Charmander'
    },
    {
        pokemon: 'media/pokemon/007.png',
        fondo: 'media/backgrounds/water.png',
        num: 0,
        voice: 'media/voices/squirtle.wav',
        voicename: 'media/names/squirtle.wav',
        name: 'Squirtle'
    },
    {
        pokemon: 'media/pokemon/025.png',
        fondo: 'media/backgrounds/electric.png',
        num: 0,
        voice: 'media/voices/pikachu.wav',
        voicename: 'media/names/pikachu.wav',
        name: 'Pikachu'
    },
    {
        pokemon: 'media/pokemon/074.png',
        fondo: 'media/backgrounds/rock.png',
        num: 0,
        voice: 'media/voices/geodude.wav',
        voicename: 'media/names/geodude.wav',
        name: 'Geodude'
    },
    {
        pokemon: 'media/pokemon/107.png',
        fondo: 'media/backgrounds/fighting.png',
        num: 0,
        voice: 'media/voices/hitmonchan.wav',
        voicename: 'media/names/hitmonchan.wav',
        name: 'Hitmonchan'
    },
    {
        pokemon: 'media/pokemon/397.png',
        fondo: 'media/backgrounds/flying.png',
        num: 0,
        voice: 'media/voices/staravia.wav',
        voicename: 'media/names/staravia.wav',
        name: 'Staravia'
    },
    {
        pokemon: 'media/pokemon/613.png',
        fondo: 'media/backgrounds/ice.png',
        num: 0,
        voice: 'media/voices/cubchoo.wav',
        voicename: 'media/names/cubchoo.wav',
        name: 'Cubchoo'
    },
    {
        pokemon: 'media/pokemon/643.png',
        fondo: 'media/backgrounds/dragon.png',
        num: 0,
        voice: 'media/voices/reshiram.wav',
        voicename: 'media/names/reshiram.wav',
        name: 'Reshiram'
    },
];
var correctas = 0;

// array para guardar las imagenes que se han usado
var imagenesUsadas = [];
let puntos = 0;

window.onload = function () {
    document.getElementById('playerName').innerHTML = getName();
    document.getElementById('points').innerHTML = "Puntos: 0";
    // guardar el array de imagenes en el local storage si esta vacio el local storage
    localStorage.setItem('imagenes', JSON.stringify(imagenes));
    imagenes = JSON.parse(localStorage.getItem('imagenes'));


    // Llama a la función para mostrar imágenes aleatorias al cargar la página
    for (var i = 1; i <= 3; i++) {
        actualizarImagen(i);
    }
}

// Función para obtener una imagen aleatoria del array
function obtenerImagenAleatoria() {
    var indiceAleatorio = Math.floor(Math.random() * imagenes.length);
    imagenesUsadas.push(imagenes[indiceAleatorio]);
    return imagenes.splice(indiceAleatorio, 1)[0];
}

// Función para actualizar la fuente de la imagen en la página
function actualizarImagen(id) {
    console.log('id: ' + id);
    console.log('drag' + id);

    var imagenAleatoria = document.getElementById('drag' + id);
    console.log('imagenAleatoria: ' + imagenAleatoria);
    var rutaImagen = obtenerImagenAleatoria();
    imagenAleatoria.src = rutaImagen.pokemon;
    // Asocia el fondo correspondiente al bioma de manera aleatoria entre los 3 biomas si no se ha asignado aun
    while (true) {
        var biomaAleatorio = Math.floor(Math.random() * 3) + 1;
        var bioma = document.getElementById('bioma' + biomaAleatorio);
        if (bioma.getAttribute('use') == 'False') {
            // Se cambia la variable de num del vector de imagenes usadas al numero de biomaAleatorio
            for (var i = 0; i <= imagenesUsadas.length; i++) {
                var pokemon = imagenesUsadas[i].pokemon;
                if (pokemon == rutaImagen.pokemon) {
                    imagenesUsadas[i].num = biomaAleatorio;
                    break
                }
            }
            // Asigna el fondo al bioma cambiando el style de background-image
            bioma.style.backgroundImage = 'url(' + rutaImagen.fondo + ')';
            // la imagen de fondo se ajusta al tamaño del bioma
            bioma.style.backgroundSize = '100% 100%';
            // ajusta la altura del bioma para que la imagen de fondo se en una escala chica de 11 rem
            bioma.style.height = '11rem';
            bioma.style.width = '18rem';
            bioma.setAttribute('use', 'True');
            break;
        }
    }
}

// funcion para el arrastre de imagenes asi como soltarlas en el sitio de la drop area
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedImage = document.getElementById(data);
    var src = 'media/pokemon/' + draggedImage.src.split('/').pop();
    for (var i = 0; i <= imagenesUsadas.length; i++) {
        var pokemon = imagenesUsadas[i].pokemon;
        if (pokemon == src) {
            var posicioncorrecta = imagenesUsadas[i].num;
            break;
        }
    }
    // obtener el id de la drop area
    var dropArea = ev.target.id;
    var biomadrop = 'bioma' + (posicioncorrecta);

    if (dropArea == biomadrop) {
        morePoints();//+100 puntos
        document.getElementById('points').innerHTML = "Puntos: " + puntos;



        ev.target.appendChild(draggedImage);

        // Deshabilita el arrastre de la imagen
        draggedImage.setAttribute('draggable', 'false');

        // Reproduce el sonido del Pokémon
        var audio = new Audio(imagenesUsadas[i].voice);

        // Reproduce el sonido
        audio.play();

        // Define un evento para detener el sonido después de reproducirse una vez
        audio.addEventListener('ended', function () {
            // Detiene el sonido
            audio.pause();
            var nameaudio = new Audio(imagenesUsadas[i].voicename);
            nameaudio.play();
            var nombre = document.getElementById('pbiom' + posicioncorrecta);
            nombre.innerHTML = imagenesUsadas[i].name;
            nameaudio.addEventListener('ended', function () {
                nameaudio.pause();
                console.log('correctas: ' + correctas);
                if (correctas == 2) {
                    console.log('Ganaste');
                    var audio = new Audio('../sounds/audioLogro.m4a');
                    audio.play();
                    audio.addEventListener('ended', function () {
                        audio.pause();
                        // guarda el array de imagenes en el local storage
                        localStorage.setItem('imagenes', JSON.stringify(imagenes));
                        console.log(imagenes);
                        nextLevel();
                    });
                } else {
                    console.log('correctas: ' + correctas);
                    correctas++;
                }
            });
        });

    } else {
        var audio = new Audio('media/effects/error.wav');
        audio.play();
        lostPoints();//-50 puntos
        document.getElementById('points').innerHTML = "Puntos: " + puntos;

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.addEventListener("DOMContentLoaded", function () {
    var draggables = document.querySelectorAll('.Pokearea img');
    var dropAreas = document.querySelectorAll('.drop-area');
    dropAreas.forEach(function (dropArea) {
        dropArea.addEventListener('dragover', allowDrop);
        dropArea.addEventListener('drop', drop);
    });
    draggables.forEach(function (draggable) {
        draggable.addEventListener('dragstart', drag);
    });
});

//Boton para siguiente nivel
function nextLevel() {
    // Si el local storage de imagenes tiene 6 elementos te manda a la pantalla de ganaste
    if (JSON.parse(localStorage.getItem('imagenes')).length == 3) {
        // comparar el tiempo actual y puntaje con el tiempo y puntaje del local storage
        timer = $('#pokeClock-Timer');
        let time = timer.text().split(':');
        let minuts = parseInt(time[0]);
        let seconds = parseInt(time[1]);
        let tiempo = minuts * 60 + seconds;

        let usersData = JSON.parse(localStorage.getItem('usersData'));
        for (let user of usersData) {
            if (user.jugando == 1) {
                //reescribir el vector de local storage
                if (user.score < puntos || user.time > tiempo) {
                    user.score = puntos;
                    user.time = seconds;
                }
            }
        }
        localStorage.setItem('usersData', JSON.stringify(usersData));
        window.location.href = '../html/final.html';
    } else {
        imagenes = JSON.parse(localStorage.getItem('imagenes'));
        console.log(imagenes);
        // reinicia el contador de correctas
        correctas = 0;
        // reinicia el array de imagenes usadas
        imagenesUsadas = [];

        // reinicia el bioma
        for (var i = 1; i <= 3; i++) {
            var bioma = document.getElementById('bioma' + i);
            bioma.style.backgroundImage = 'none';
            bioma.setAttribute('use', 'False');
            // obtener la imagen hija de la drop area
            var imagen = bioma.getElementsByTagName('img')[0];
            var p = document.getElementById('pbiom' + i);
            bioma.removeChild(imagen);
            p.innerHTML = '';
        }
        // crear 3 img dentro de div1 div 2 y div3 con id drag1 drag2 drag3
        for (var i = 1; i <= 3; i++) {
            //<img class="pokemon" src="" draggable="true" id="drag1" class="droptarget">
            var newImg = document.createElement('img');
            newImg.src = '';
            newImg.setAttribute('draggable', 'true');
            newImg.setAttribute('id', 'drag' + i);
            newImg.setAttribute('class', 'pokemon');
            newImg.setAttribute('ondragstart', 'drag(event)');
            var div = document.getElementById('div' + i);
            div.innerHTML = '';
            div.appendChild(newImg);
        }
        // reinicia el array de imagenes
        imagenes = JSON.parse(localStorage.getItem('imagenes'));

        // Llama a la función para mostrar imágenes aleatorias al cargar la página
        for (var i = 1; i <= 3; i++) {
            actualizarImagen(i);
        }
    }
}

////// Manejo de Local Storage //////
function morePoints() {
    puntos += 100;
}

function lostPoints() {
    if (puntos > 0) {
        puntos -= 50;
    }
}

function getPoints() {
    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    for (let user of usersData) {
        if (user.jugando == 1) {
            return user.score;
        }
    }
}
function getName() {
    let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    // recorrer el arreglo de usuarios hasta encontrar el que esta jugando
    for (let user of usersData) {
        if (user.jugando == 1) {
            return user.username;
        }
    }
}
