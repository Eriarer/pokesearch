let init = () => {
  timer = $('#pokeClock-Timer');
  console.log(timer);
  incrementTime(5998);
}

let incrementTime = (time) => {
  formatTime(time);
  // no puede pasar de 99:59
  time = (time + 1) % 6000;
  setTimeout(incrementTime, 1000, time);
}

let formatTime = (time) => {
  let minuts = Math.floor(time / 60);
  let seconds = time % 60;
  minuts = minuts < 10 ? `0${minuts}` : minuts;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  timer.text(`${minuts}:${seconds}`);
}

$(document).ready(init);