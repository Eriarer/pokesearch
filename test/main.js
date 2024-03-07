const curtainWidth = 3400;
const curtainHeight = 1912;
const centerWidth = 1064;
const centerHeight = 1063;

let curtain = () => {

  curtainTop = $('#pokeScreen-T');
  curtainBottom = $('#pokeScreen-B');
  curtainCenter = $('#pokeScreen-C');
  pokeScreenGroup = $('#pokeScreen-Group')

  curtainResize();

  animateCurtain();

  $(window).resize(curtainResize);
}

//curtain resize inner Components
let curtainResize = () => {
  let windowWidth = $(window).width();
  let windowHeight = $(window).height();
  let scale = windowHeight > windowWidth ? windowHeight / curtainHeight : windowWidth / curtainWidth;
  console.log(scale);
  // calcular el nuevo tamaño de las cortinas
  let newWidth = curtainWidth * scale;
  let newHeight = curtainHeight * scale;
  let newCenterWidth = centerWidth * scale;
  let newCenterHeight = centerHeight * scale;
  // ajustar el tamaño de las cortinas
  curtainTop.width(newWidth);
  curtainTop.height(newHeight);

  curtainBottom.width(newWidth);
  curtainBottom.height(newHeight);

  pokeScreenGroup.width(newWidth);
  pokeScreenGroup.height(newHeight);

  curtainCenter.width(newCenterWidth);
  curtainCenter.height(newCenterHeight);

}

let animateCurtain = () => {
  // mostrar las cortinas
  pokeScreenGroup.css('display', 'block');
  curtainBottom.css('display', 'block');

  // animar las cortinas
  pokeScreenGroup.css('animation', 'pokeScreenTopIn 1s forwards');
  curtainBottom.css('animation', 'pokeScreenBottomIn 1s forwards');
  setTimeout(() => {
    curtainCenter.css('animation', 'fullspin 4s forwards infinite linear');
    pokeScreenGroup.css('animation', 'none');
    curtainBottom.css('animation', 'none');
  }, 1000);
  setTimeout(animationEnd, 5000);
}

let animationEnd = () => {
  // animar las cortinas
  curtainCenter.css('animation', 'none');
  pokeScreenGroup.css('animation', 'pokeScreenTopOut 1s forwards');
  curtainBottom.css('animation', 'pokeScreenBottomOut 1s forwards');
  setTimeout(() => {
    // ocultar las cortinas
    pokeScreenGroup.css('display', 'none');
    curtainBottom.css('display', 'none');

    // eliminar las animaciones
    curtainCenter.css('animation', 'none');
    pokeScreenGroup.css('animation', 'none');
    curtainBottom.css('animation', 'none');
  }, 1000);
}

$(document).ready(curtain);