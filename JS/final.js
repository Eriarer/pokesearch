import { userName } from './LocalStorage.js';

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("diploma");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let felicitaciones = "¡¡¡ Felicidades " + userName() + " !!! ";
    //calculando la posición para centrar el felicitaciones dinámicamente
    let x = (canvas.width - (felicitaciones.length * 20)) / 1.8;

    const img = new Image();
    img.src = "../img/backFinal.png";
    img.onload = function () {
        //obteniendo el tamaño del canvas para ajustar la imagen a ese tamaño
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = "30px Silkscreen";
        //poniendo el texto a rojo
        ctx.fillStyle = "orange";
        //centrando el texto
        ctx.fillText(felicitaciones, x, 260);


        ctx.font = "25px Silkscreen";
        ctx.fillStyle = "black";
        ctx.fillText("Lograste regresar todos los Pokémon a su casa.", 250, 310);
        ctx.fillText("Todos te lo agradecen mucho.", 250, 350);
    }
    const pikachu = new Image();
    pikachu.src = "../img/celebrando.png";
    pikachu.onload = function () {
        ctx.drawImage(pikachu, 250, 350, 800, 250);
    }
});