var canvas = document.getElementById('draw');



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var w = canvas.width;
var h = canvas.height;
var life = [w, h];
var prevLife = [w, h];
life.fill(false);

var mouseDown = false;

var ctx = canvas.getContext('2d');

function updateState(i, j) {
  if (i < w && j < h) {
    if (life[i, j] == true)
      ctx.fillStyle = "#FF0000";
    else
      ctx.fillStyle = "#000FFF";

    ctx.fillRect(Math.trunc(i / 10) * 10, Math.trunc(j / 10) * 10, 10, 10);

  }
}

function neighbors(i, j) {
  let nb = 0;
  if (j - 1 >= 0) {
    if (prevLife[i, j - 1] == true) {
      nb++;
    }
  }
  if (j + 1 < h) {
    if (prevLife[i, j + 1] == true) {
      nb++;
    }
  }
  for (let k = 0; k < 3; k++) {
    if (i - 1 >= 0 && j - 1 + k >= 0 && i - 1 < w && j - 1 + k < h) {
      if (prevLife[i - 1, j - 1 + k] == true) {
        nb++;
      }
    }
  }
  for (let k = 0; k < 3; k++) {
    if (i + 1 >= 0 && j - 1 + k >= 0 && i + 1 < w && j - 1 + k < h) {
      if (prevLife[i + 1, j - 1 + k] == true) {
        nb++;
      }
    }
  }
  return nb;
}

function live(){
  let nb = 0;


  for(i = 0; i < w; i++)
    for(j = 0; j < h; j++)
      prevLife[i,j] = life[i,j];

  for (let a = 0; a < w; a++) {
    for (let b = 0; b < h; b++) {
      nb = neighbors(a, b);
      if (nb != 2){
        life[a, b] = (nb == 3);
        
      }
    }
  }
  for (let a = 0; a < w; a++)
  for (let b = 0; b < h; b++)
      if (prevLife[a, b] != life[a, b]){
        updateState(a, b);
        console.log('updating state...\n');
      }
}

canvas.addEventListener('mousedown', e => {
  mouseDown = true;
  ctx.fillRect(Math.trunc(e.offsetX / 10) * 10, Math.trunc(e.offsetY / 10) * 10, 10, 10);
  life[Math.trunc(e.offsetX / 10) * 10, Math.trunc(e.offsetY / 10)];
});

canvas.addEventListener('mousemove', e => {
  if(mouseDown){
    ctx.fillRect(Math.trunc(e.offsetX / 10) * 10, Math.trunc(e.offsetY / 10) * 10, 10, 10);
    life[Math.trunc(e.offsetX / 10) * 10, Math.trunc(e.offsetY / 10)];
  }
});
canvas.addEventListener('mouseup', e => {
  mouseDown = false;
  live();
});