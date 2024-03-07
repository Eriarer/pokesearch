let swapTo = (path) => {
    let iframe = $('#iframe');
    animateCurtain();
    //cambiar el source del iframe a la página de prueba
    iframe.attr('src', path);
}

