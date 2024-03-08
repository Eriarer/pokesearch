 // Array que contiene las rutas de tus imágenes
 var imagenes = [
    { pokemon: 'media/001.png', fondo: 'media/001.png' },
    { pokemon: 'media/007.png', fondo: 'media/007.png' },
    { pokemon: 'media/024.png', fondo: 'media/024.png' },
    { pokemon: 'media/025.png', fondo: 'media/025.png' },
    { pokemon: 'media/074.png', fondo: 'media/074.png' },
    { pokemon: 'media/077.png', fondo: 'media/077.png' },
    { pokemon: 'media/079.png', fondo: 'media/079.png' },
    { pokemon: 'media/104.png', fondo: 'media/104.png' },
    { pokemon: 'media/107.png', fondo: 'media/107.png' },
    { pokemon: 'media/143.png', fondo: 'media/143.png' },
    { pokemon: 'media/397.png', fondo: 'media/397.png' },
    { pokemon: 'media/415.png', fondo: 'media/415.png' },
    { pokemon: 'media/613.png', fondo: 'media/613.png' },
    { pokemon: 'media/643.png', fondo: 'media/643.png' },
    { pokemon: 'media/778.png', fondo: 'media/778.png' }
];


        
window.onload = function() {
    // Llama a la función para mostrar imágenes aleatorias al cargar la página
    for (var i = 1; i <= 3; i++) {
        actualizarImagen(i);
    }
    // Función para obtener una imagen aleatoria del array
    function obtenerImagenAleatoria() {
        var indiceAleatorio = Math.floor(Math.random() * imagenes.length);
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
                // Asigna el fondo al bioma cambiando el style de background-image
                bioma.style.backgroundImage = 'url(' + rutaImagen.fondo + ')';
                // la imagen de fondo se ajusta al tamaño del bioma
                bioma.style.backgroundSize = 'cover';
                // la imagen de fondo se centra en el bioma
                bioma.style.backgroundPosition = 'center';
                // ajusta la altura del bioma para que la imagen de fondo se muestre completa
                bioma.style.height = '15rem';

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
    ev.target.appendChild(document.getElementById(data));
}

document.addEventListener("DOMContentLoaded", function () {
    var draggables = document.querySelectorAll('.drop-area img');
    var dropAreas = document.querySelectorAll('.drop-area');

    dropAreas.forEach(function (dropArea) {
        dropArea.addEventListener('dragover', allowDrop);
        dropArea.addEventListener('drop', drop);
    });

    draggables.forEach(function (draggable) {
        draggable.addEventListener('dragstart', drag);
    }
    );
}
);

