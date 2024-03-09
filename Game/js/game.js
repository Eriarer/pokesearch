// Array que contiene las rutas de tus imágenes
var imagenes = [
    {
        pokemon: 'media/001.png',
        fondo: 'media/backgrounds/grass.png',
        num: 0,
        voice: 'media/voices/bulbasaur.wav'
    },
    {
        pokemon: 'media/004.png',
        fondo: 'media/backgrounds/fire.png',
        num: 0,
        voice: 'media/voices/charmander.wav'
    },
    {
        pokemon: 'media/007.png',
        fondo: 'media/backgrounds/water.png',
        num: 0,
        voice: 'media/voices/squirtle.wav'
    },
    {
        pokemon: 'media/025.png',
        fondo: 'media/backgrounds/electric.png',
        num: 0,
        voice: 'media/voices/pikachu.wav',
    },
    {
        pokemon: 'media/074.png',
        fondo: 'media/backgrounds/rock.png',
        num: 0,
        voice: 'media/voices/geodude.wav'
    },
    {
        pokemon: 'media/107.png',
        fondo: 'media/backgrounds/fighting.png',
        num: 0,
        voice: 'media/voices/hitmonchan.wav'
    },
    {
        pokemon: 'media/397.png',
        fondo: 'media/backgrounds/flying.png',
        num: 0,
        voice: 'media/voices/staravia.wav'
    },
    {
        pokemon: 'media/613.png',
        fondo: 'media/backgrounds/ice.png',
        num: 0,
        voice: 'media/voices/cubchoo.wav'
    },
    {
        pokemon: 'media/643.png',
        fondo: 'media/backgrounds/dragon.png',
        num: 0,
        voice: 'media/voices/reshiram.wav'
    },
];

// array para guardar las imagenes que se han usado
var imagenesUsadas = [];

window.onload = function () {
    // Llama a la función para mostrar imágenes aleatorias al cargar la página
    for (var i = 1; i <= 3; i++) {
        actualizarImagen(i);
    }
    // Función para obtener una imagen aleatoria del array
    function obtenerImagenAleatoria() {
        var indiceAleatorio = Math.floor(Math.random() * imagenes.length);
        imagenesUsadas.push(imagenes[indiceAleatorio]);
        return imagenes.splice(indiceAleatorio, 1)[0];
    }

    // Función para actualizar la fuente de la imagen en la página
    function actualizarImagen(id) {
        var imagenAleatoria = document.getElementById('drag' + id);
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
                bioma.style.backgroundSize = 'cover';
                // ajusta la altura del bioma para que la imagen de fondo se en una escala chica de 11 rem
                bioma.style.height = '11rem';
                bioma.style.width = '18rem';
                bioma.setAttribute('use', 'True');
                break;
            }
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
    var src = 'media/' + draggedImage.src.split('/').pop();
    for(var i = 0; i <= imagenesUsadas.length; i++) {
        var pokemon = imagenesUsadas[i].pokemon;
        if( pokemon == src) {
            var posicioncorrecta = imagenesUsadas[i].num;
            break
        }
    }
    // obtener el id de la drop area
    var dropArea = ev.target.id;
    var biomadrop = 'bioma' + (posicioncorrecta);
    if (dropArea ==  biomadrop) {
        ev.target.appendChild(draggedImage);
        // deshabilita el arrastre de la imagen
        draggedImage.setAttribute('draggable', 'false');
    }
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