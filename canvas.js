
'use strict';

var canvas = document.getElementById('draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const SCALE = 2;
const PSIZE = 10 * SCALE;

var width = Math.trunc(canvas.width / PSIZE);
var height = Math.trunc(canvas.height / PSIZE);
var life = Array(width);
var prevLife = Array(width);


var mouseDown = false;

var ctx = canvas.getContext('2d');
window.onload = () => {


  for (var i = 0; i < width; i++) {
    life[i] = Array(height).fill(false);
    prevLife[i] = Array(height).fill(false);
  }

  for (let i = 0; i < 100; i++) {
    let randomI = getRandomInt(width);
    let randomJ = getRandomInt(height);
    life[randomI][randomJ] = true;
  }

  refreshLife();
};

function refreshLife() {
  for (let i = 0; i < width; i++)
    for (let j = 0; j < height; j++) {
      if (life[i][j] != prevLife[i][j])
        updateState(i, j);
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function updateState(i, j) {
  if (i < width && j < height) {
    if (life[i][j] == true){
      ctx.fillStyle = getColors();
    }
    else
      ctx.fillStyle = "#FFF";

    ctx.fillRect(i * PSIZE, j * PSIZE, PSIZE, PSIZE);
    
  }
}

function getColors(){
  let random = getRandomInt(10);
  switch (random)
  {
      case 0:
          return "#F10891";
      case 1:
          return "#B00B69";
      case 2:
          return "#FAFAFA";
      case 3:
          return "#FEEEEE";
      case 4:
          return "#FEDCAA";
      case 5:
          return "#223445";
      case 6:
          return "#323231";
      case 7:
          return "#311222"
      case 8:
          return "#666666";     
        case 9:
          return "#555555";
  }

  return "#fff222";
}

function neighbors(i, j) {
  let nb = 0;
  if (j - 1 >= 0) {
    if (prevLife[i][j - 1] == true) {
      nb++;
    }
  }
  if (j + 1 < height) {
    if (prevLife[i][j + 1] == true) {
      nb++;
    }
  }
  for (let k = 0; k < 3; k++) {
    if (i - 1 >= 0 && j - 1 + k >= 0 && i - 1 < width && j - 1 + k < height) {
      if (prevLife[i - 1][j - 1 + k] == true) {
        nb++;
      }
    }
  }
  for (let k = 0; k < 3; k++) {
    if (i + 1 >= 0 && j - 1 + k >= 0 && i + 1 < width && j - 1 + k < height) {
      if (prevLife[i + 1][j - 1 + k] == true) {
        nb++;
      }
    }
  }
  return nb;
}

function live() {
  for (let i = 0; i < width; i++)
  for (let j = 0; j < height; j++)
    prevLife[i][j] = life[i][j];

  let nb = 0;
  for (let a = 0; a < width; a++) {
    for (let b = 0; b < height; b++) {
      nb = neighbors(a, b);
      life[a][b] = nb != 2 ? nb == 3 : life[a][b];
    }
  }

  refreshLife();
  if(!mouseDown)
    setTimeout(live, 100);
}


canvas.addEventListener('mousedown', e => {
  ctx.fillStyle = getColors();

  mouseDown = true;
  let x = Math.trunc(e.offsetX / PSIZE);
  let y = Math.trunc(e.offsetY / PSIZE);
  ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
  life[x][y] = true;
});

function getOffsetPosition(evt, parent){
  var position = {
      x: (evt.targetTouches) ? evt.targetTouches[0].pageX : evt.clientX,
      y: (evt.targetTouches) ? evt.targetTouches[0].pageY : evt.clientY
  };

  while(parent.offsetParent){
      position.x -= parent.offsetLeft - parent.scrollLeft;
      position.y -= parent.offsetTop - parent.scrollTop;

      parent = parent.offsetParent;
  }

  return position;
}

canvas.addEventListener('touchstart', e => {
  ctx.fillStyle = getColors();
  let offset = getOffsetPosition(e, canvas);
  mouseDown = true;
  let x = Math.trunc(offset.x / PSIZE);
  let y = Math.trunc(offset.y / PSIZE);
  ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
  life[x][y] = true;
});

canvas.addEventListener('mousemove', e => {
  if (mouseDown) {
    let x = Math.trunc(e.offsetX / PSIZE);
    let y = Math.trunc(e.offsetY / PSIZE);
    ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
    life[x][y] = true;
  }
});

canvas.addEventListener('touchmove', e => {
  if (mouseDown) {
    let offset = getOffsetPosition(e, canvas);

    let x = Math.trunc(offset.x / PSIZE);
    let y = Math.trunc(offset.y / PSIZE);
    ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
    life[x][y] = true;
  }
});
canvas.addEventListener('mouseup', e => {
  mouseDown = false;
  live();  
});

canvas.addEventListener('touchend', e => {
  mouseDown = false;
  live();  
});
