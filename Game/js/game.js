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
            var bioma = document.getElementById('biomaImg' + biomaAleatorio);
            if (bioma.getAttribute('use') == 'False') {
                bioma.src = rutaImagen.fondo;
                bioma.setAttribute('use', 'True');
                break
            }
        }
    }
}


// Función para permitir el arrastre
function allowDrop(event) {
    event.preventDefault();
}

// Función para el evento de soltar
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedImage = document.getElementById(data);
    var dropZone = event.target;

    // Verifica si la imagen se soltó en una drop area
    if (dropZone.classList.contains('drop-area')) {
        dropZone.appendChild(draggedImage);
    }
}

// Funciones para el arrastre de las imágenes
function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragEnd(event) {
    // Llama a la función para actualizar la imagen después de que se ha soltado
    var id = event.target.id.substring(4);
    actualizarImagen(id);
}