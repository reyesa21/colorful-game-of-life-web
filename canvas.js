
var canvas = document.getElementById('draw');
var life = Array(w);
var prevLife = Array(w);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouseDown = false;

var w = canvas.width;
var h = canvas.height;
var ctx = canvas.getContext('2d');

window.onload = () => {
  for (var i = 0; i < w; i++) {
    life[i] = Array(h).fill(false);
    prevLife[i] = Array(h).fill(false);
  }

  for (let i = 0; i < 100; i++) {
    let randomI = getRandomInt(canvas.width);
    let randomJ = getRandomInt(canvas.height);
    life[randomI][randomJ] = true;
  }

  refreshLife();
};

function refreshLife() {
  for (let i = 0; i < canvas.width; i++)
    for (let j = 0; j < canvas.height; j++) {
      if (life[i][j] != prevLife[i][j])
        updateState(i, j);
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function updateState(i, j) {
  if (i < w && j < h) {
    if (life[i][j] == true){
      ctx.fillStyle = "#000";
    }
    else{
      ctx.fillStyle = "#FFF";
      console.log('no');
    }

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

function live() {
  let nb = 0;


  for (i = 0; i < w; i++)
    for (j = 0; j < h; j++)
      prevLife[i, j] = life[i, j];

  for (let a = 0; a < w; a++) {
    for (let b = 0; b < h; b++) {
      nb = neighbors(a, b);
      if (nb != 2) {
        life[a, b] = (nb == 3);

      }
    }
  }
  refreshLife();
}

canvas.addEventListener('mousedown', e => {
  mouseDown = true;
  ctx.fillRect(Math.trunc(e.offsetX / 10) * 10, Math.trunc(e.offsetY / 10) * 10, 10, 10);
  life[Math.trunc(e.offsetX / 10) * 10, Math.trunc(e.offsetY / 10)];
});

canvas.addEventListener('mousemove', e => {
  if (mouseDown) {
    ctx.fillRect(Math.trunc(e.offsetX / 10) * 10, Math.trunc(e.offsetY / 10) * 10, 10, 10);
    life[Math.trunc(e.offsetX / 10) * 10, Math.trunc(e.offsetY / 10)];
  }
});
canvas.addEventListener('mouseup', e => {
  mouseDown = false;
  refreshLife();
});