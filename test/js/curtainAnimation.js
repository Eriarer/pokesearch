const curtainWidth = 3400;
const curtainHeight = 1912;
const centerWidth = 1064;
const centerHeight = 1063;
let redimensionando = false;
let newWidth, newHeight, newCenterWidth, newCenterHeight, windowHeight, windowWidth = 0;

const curtainTime = 0.5;
const spinTime = 0.75;

let curtain = () => {

  curtainTop = $('#pokeScreen-T');
  curtainBottom = $('#pokeScreen-B');
  curtainCenter = $('#pokeScreen-C');
  pokeScreenGroup = $('#pokeScreen-Group')

  curtainResize();

  pageLoad();

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

let animateCurtain = (curtainTime = 1, spinTime = 4) => {
  $('#screenChange').css('display', 'block');
  // mostrar las cortinas
  pokeScreenGroup.css('display', 'block');
  curtainBottom.css('display', 'block');

  // animar las cortinas
  pokeScreenGroup.css('animation', `pokeScreenTopIn ${curtainTime}s`);
  curtainBottom.css('animation', `pokeScreenBottomIn ${curtainTime}s`);
  setTimeout(() => {
    curtainCenter.css('animation', `fullspin ${spinTime}s forwards infinite linear`);
    pokeScreenGroup.css('animation', 'none');
    curtainBottom.css('animation', 'none');
  }, curtainTime * 1000);
}

let animationEnd = (curtainTime = 1, spinTime = 4) => {
  // solo pausar la animación, no eliminarla
  curtainCenter.css('animation-play-state', 'paused');
  // animar las cortinas
  pokeScreenGroup.css('animation', `pokeScreenTopOut ${curtainTime}s ease-in`);
  curtainBottom.css('animation', `pokeScreenBottomOut ${curtainTime}s ease-in`);
  setTimeout(() => {
    // ocultar las cortinas
    pokeScreenGroup.css('display', 'none');
    curtainBottom.css('display', 'none');

    // eliminar las animaciones
    curtainCenter.css('animation', 'none');
    curtainCenter.css('animation-play-state', 'running');
    pokeScreenGroup.css('animation', 'none');
    curtainBottom.css('animation', 'none');
    $('#screenChange').css('display', 'none');
  }, curtainTime * 1000);
}


let pageLoad = () => {
  $('#pokeScreen-C').css('animation', `fullspin ${spinTime}s forwards infinite linear`);
  setTimeout(() => {
    animationEnd(curtainTime, spinTime);
  }, Math.floor(Math.random() * (spinTime * 2000)) + (spinTime * 1000));
}

function changeScreen(path) {
  animateCurtain(curtainTime, spinTime);
  setTimeout(() => {
    window.location.href = path;
  }, (curtainTime + spinTime) * 1000);
}


$(document).ready(curtain);