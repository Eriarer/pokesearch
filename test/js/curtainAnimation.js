const curtainWidth = 3400;
const curtainHeight = 1912;
const centerWidth = 1064;
const centerHeight = 1063;
let redimensionando = false;
let newWidth, newHeight, newCenterWidth, newCenterHeight, windowHeight, windowWidth = 0;

let curtain = () => {

  curtainTop = $('#pokeScreen-T');
  curtainBottom = $('#pokeScreen-B');
  curtainCenter = $('#pokeScreen-C');
  pokeScreenGroup = $('#pokeScreen-Group')

  curtainResize();

  $(window).resize(curtainResize);
}

let curtainResize = () => {
  if (redimensionando) return;
  redimensionando = true;
  windowWidth = $(window).width();
  windowHeight = $(window).height();

  // ajustar el tamaño para que la cortina con dimensiones constantes declaradas
  // cubra toda la pantalla, sin importar la relación de aspecto de la ventana
  newWidth = (windowWidth / windowHeight) > (curtainWidth / curtainHeight) ? windowWidth : curtainWidth * windowHeight / curtainHeight;
  newHeight = (windowWidth / windowHeight) > (curtainWidth / curtainHeight) ? curtainHeight * windowWidth / curtainWidth : windowHeight;
  // ajustar el tamaño del centro para que sea proporcional al tamaño de la cortina
  newCenterWidth = centerWidth * newWidth / curtainWidth;
  newCenterHeight = centerHeight * newHeight / curtainHeight;

  curtainTop.width(newWidth).height(newHeight);
  curtainBottom.width(newWidth).height(newHeight);
  pokeScreenGroup.width(newWidth).height(newHeight);
  curtainCenter.width(newCenterWidth).height(newCenterHeight);
  redimensionando = false;
}

let animateCurtain = () => {
  // mostrar las cortinas
  pokeScreenGroup.css('display', 'block');
  curtainBottom.css('display', 'block');

  // animar las cortinas
  pokeScreenGroup.css('animation', 'pokeScreenTopIn 1s');
  curtainBottom.css('animation', 'pokeScreenBottomIn 1s');
  setTimeout(() => {
    curtainCenter.css('animation', 'fullspin 4s forwards infinite linear');
    pokeScreenGroup.css('animation', 'none');
    curtainBottom.css('animation', 'none');
  }, 1000);
}

let animationEnd = () => {
  // solo pausar la animación, no eliminarla
  curtainCenter.css('animation-play-state', 'paused');
  // animar las cortinas
  pokeScreenGroup.css('animation', 'pokeScreenTopOut 1s ease-in');
  curtainBottom.css('animation', 'pokeScreenBottomOut 1s ease-in');
  setTimeout(() => {
    // ocultar las cortinas
    pokeScreenGroup.css('display', 'none');
    curtainBottom.css('display', 'none');

    // eliminar las animaciones
    curtainCenter.css('animation', 'none');
    curtainCenter.css('animation-play-state', 'running');
    pokeScreenGroup.css('animation', 'none');
    curtainBottom.css('animation', 'none');
  }, 1000);
}

$(document).ready(curtain);