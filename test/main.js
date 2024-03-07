let curtainWidth = 3400;
let curtainHeight = 1912;
let centerWidth = 1064;
let centerHeight = 1063;
let aspectRatio = curtainWidth / curtainHeight;

let curtain = () => {
  windowWidth = $(window).width();
  windowHeight = $(window).height();

  curtainTop = $('#pokeScreen-T');
  curtainBottom = $('#pokeScreen-B');
  curtainCenter = $('#pokeScreen-C');
  pokeScreenGroup = $('#pokeScreen-Group')
  curtainResize();
}

//curtain resize inner Components
let curtainResize = () => {

  let windowMin = Math.min(windowWidth, windowHeight);
  let curtainMin = Math.min(curtainTop.width(), curtainTop.height());
  let scale = windowMin / curtainMin;

  // calcular el nuevo tamaño de las cortinas
  let newWidth = curtainTop.width() * scale;
  let newHeight = curtainTop.height() * scale;
  centerWidth = curtainCenter.width() * scale;
  centerHeight = curtainCenter.height() * scale;

  // ajustar el tamaño de las cortinas
  curtainTop.width(newWidth);
  curtainTop.height(newHeight);
  curtainBottom.width(newWidth);
  curtainBottom.height(newHeight);
  curtainCenter.width(centerWidth);
  curtainCenter.height(centerHeight);
  pokeScreenGroup.width(newWidth);
  pokeScreenGroup.height(newHeight);
  // ajustarlas al centro
  let topOffset = (windowHeight - newHeight) / 2;
  let leftOffset = (windowWidth - newWidth) / 2;
  console.log(topOffset, leftOffset);

  animateCurtain();
}

let animateCurtain = () => {
  // animar al bottom
  //animation: pokeScreenBottomIn 1s forwards;
  //animar al grupo
  //animation: pokeScreenTopIn 1s forwards;
  //una vez que terminen las animaciones del top y bottom
  //agregarle al centro la siguiente animacion
  //animation: fullspin 2s 1s forwards infinite linear;
  pokeScreenGroup.css('animation', 'pokeScreenTopIn 1s forwards');
  curtainBottom.css('animation', 'pokeScreenBottomIn 1s forwards');
  setTimeout(() => {
    curtainCenter.css('animation', 'fullspin 2s forwards infinite linear');
    pokeScreenGroup.css('animation', 'none');
    curtainBottom.css('animation', 'none');
  }, 1000);
}

$(document).ready(curtain);