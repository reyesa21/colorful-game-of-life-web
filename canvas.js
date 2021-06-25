'use strict';

document.body.style.overflow = 'hidden'; // toggled when changing size

let sizeMultiplier = 1.0;

let /** @type {HTMLElement} */ canvas = document.getElementById('draw');

canvas.width = window.innerWidth * sizeMultiplier;
canvas.height = window.innerHeight * sizeMultiplier;

let /** @type {HTMLElement} */ clear = document.getElementById('clear'); 

let /** @type {Boolean} */ clearing = false;
let /** @type {Boolean} */ paused = true;

const /** @type {Number} */ SCALE = 2;
const /** @type {Number} */ PSIZE = 10 * SCALE;

let /**@type {Number} */ width = Math.trunc(canvas.width / PSIZE);
let /**@type {Number} */ height = Math.trunc(canvas.height / PSIZE);
let /**@type {Boolean[][]} */ life = Array(width);
let /**@type {Boolean[][]} */ prevLife = Array(width);
let /**@type {Boolean[][]} */ lifeColor = Array(width);


let /** @type {Boolean} */ mouseDown = false;

let ctx = canvas.getContext('2d');

window.onload = () => {
  window.setTimeout(() =>
  {  document.getElementById('tip').className = 'fadeout';}, 8000
  );
  
  for (let i = 0; i < width; i++) {
    life[i] = Array(height).fill(false);
    prevLife[i] = Array(height).fill(false);
    lifeColor[i] = Array(height).fill('wheat');
  }

  //randomly turn on cells
  for (let i = 0; i < 100; i++) {
    let randomI = getRandomInt(width);
    let randomJ = getRandomInt(height);
    life[randomI][randomJ] = true;
  }

  refreshLife();
};


// refreshes cells by comparising life array with previous life array
function refreshLife() {
  for (let i = 0; i < width; i++)
    for (let j = 0; j < height; j++) {
      if (life[i][j] != prevLife[i][j] || clearing){
          if (life[i][j] == true)
            ctx.fillStyle = lifeColor[i][j] = getColor();
          else
            ctx.fillStyle = lifeColor[i][j] = "wheat";
      
          ctx.fillRect(i * PSIZE, j * PSIZE, PSIZE, PSIZE);
      }
    }
}

/**
 * Returns random integer between 0 and number given.
 * @param {Number} max 
 * @returns {Number}
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Returns random color from a set of ten.
 * @returns {String} Hexadecimal color code.
 */
function getColor(){
  let random = getRandomInt(10);
  
  switch (random)
  {
      case 0:
          return "#F10891";
      case 1:
          return "#B00B69";
      case 2:
          return "#F0F0FA";
      case 3:
          return "#FAAAEE";
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
}

/**
 * Returns the amount of neighbors for a specific cell.
 * @param {Number} x 
 * @param {Number} y 
 * @returns {Number} 
 */
function neighbors(x, y) {
  let nb = 0;
  
  if (y - 1 >= 0 && prevLife[x][y-1] == true) {
      nb++;
  }
  if (y + 1 < height && prevLife[x][y+1] == true) {
      nb++;
  }

  for (let k = 0; k < 3; k++) {
    if (x - 1 >= 0 && y - 1 + k >= 0 && x - 1 < width && y - 1 + k < height && prevLife[x - 1][y - 1 + k] == true) {
        nb++;
    }
  }

  for (let k = 0; k < 3; k++) {
    if (x + 1 >= 0 && y - 1 + k >= 0 && x + 1 < width && y - 1 + k < height && prevLife[x + 1][y - 1 + k] == true) {
        nb++;
    }
  }
  return nb;
}

/**
 * Updates cells based on number of neighbors.
 */
function live() {
  if(paused)
    return null;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      prevLife[i][j] = life[i][j];
    }
  }

  let nb = 0;
  for (let a = 0; a < width; a++) {
    for (let b = 0; b < height; b++) {
      nb = neighbors(a, b);
      life[a][b] = nb != 2 ? nb == 3 : life[a][b];
    }
  }

    if(!clearing)
      refreshLife();
    if (!mouseDown && !paused)
      setTimeout(live, 100);
    else
      ctx.fillStyle = getColor(); // get color used for drawing
}


// Event handles drawing. 
canvas.addEventListener('mousedown', e => {
  if (e.button == 0) {
    mouseDown = true;

    let x = Math.trunc(e.offsetX / PSIZE);
    let y = Math.trunc(e.offsetY / PSIZE);
    
    if(life[x][y] != undefined){
      ctx.fillStyle = lifeColor[x][y] = getColor();
      ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
      life[x][y] = true;
    }
  }
});

/**
 * Returns x and y coordinates.
 * @param {Event} evt 
 * @param {HTMLElement} parent 
 * @returns {Position} Location of event.
 */
function getOffsetPosition(evt, parent){
  /**
 * @typedef {Object} Position
 * @property {number} x - The X Coordinate
 * @property {number} y - The Y Coordinate
 */
  let position = {
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

// Touch screen drawing event.
canvas.addEventListener('touchstart', e => {
  let offset = getOffsetPosition(e, canvas);

  mouseDown = true;
  
  let x = Math.trunc(offset.x / PSIZE);
  let y = Math.trunc(offset.y / PSIZE);
  
  if(life[x][y] != undefined){
    ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
    life[x][y] = true;
  }
});

let pastX = 0;
let pastY = 0;
// Event to handle moving with mouse.
canvas.addEventListener('mousemove', e => {


  let x = Math.trunc(e.offsetX / PSIZE);
  let y = Math.trunc(e.offsetY / PSIZE);
  if(pastX != 0)
    if(pastX != x || pastY != y){
      ctx.fillStyle = lifeColor[pastX][pastY];
      ctx.fillRect(pastX * PSIZE, pastY * PSIZE, PSIZE, PSIZE);
    }
    
if (mouseDown) {
    if(life[x][y] != undefined){
    ctx.fillStyle = lifeColor[x][y] = getColor();

      ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
      life[x][y] = true;
    } 
  }
else{
  if(life[x][y] != undefined){
    pastX = x;
    pastY = y;
    ctx.fillStyle = "#B3CAF5";
    ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
    ctx.fillStyle = lifeColor[x][y];

  } 
} 
});

// Event to handle moving with touch.
canvas.addEventListener('touchmove', e => {
  if (mouseDown) {
    let offset = getOffsetPosition(e, canvas);

    let x = Math.trunc(offset.x / PSIZE);
    let y = Math.trunc(offset.y / PSIZE);
    
    ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
    
    life[x][y] = true;
  }
});

// Event to handle ending drawing.
canvas.addEventListener('mouseup', e => {
  if (mouseDown) {
    mouseDown = false;
  }

  live();
});

// Event to handle ending drawing.
canvas.addEventListener('touchend', e => {
  if (mouseDown) {
    mouseDown = false;
    live();
  } 
});

// Event to disable right clicking in canvas.
if (canvas.addEventListener) {
  canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, false);
} else {
  canvas.attachEvent('oncontextmenu', function() {
    alert("You've tried to open context menu");
    window.event.returnValue = false;
  });
}

let /** @type {HTMLElement} */ resize = document.getElementById('resize');
let /** @type {Number} */ resizeCounter = 0;

// Handles resize button which resizes the canvas in a cyclical manner.
resize.addEventListener('mousedown', e=> {
  switch(resizeCounter){
    case -1:
      resizeCounter++;
      resize.innerHTML="1.0x";
      sizeMultiplier = 1.0;
      document.body.style.overflow = 'hidden';
      break;
    case 0:
      resizeCounter++;
      resize.innerHTML="1.2x";
      sizeMultiplier = 1.2;
      document.body.style.overflow = "visible";

      break;
    case 1:
      resizeCounter++;
      resize.innerHTML="1.5x";
      sizeMultiplier = 1.5;
      break;
    case 2:
      resizeCounter++;
      resize.innerHTML="1.8x";
      sizeMultiplier = 1.8;
      break;
    case 3:
      resizeCounter = -1;
      resize.innerHTML="2.0x";
      sizeMultiplier = 2.0;
      break;
  }

  resizer();
})

// Handles clear button, which removes all living cells.
clear.addEventListener('mousedown', e => {
  clearing = true;
  for (let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++)
      life[i][j] = false;
  }
  refreshLife();

  clearing = false;
});

let /** @type {HTMLElement} */ pause = document.getElementById('pause');

pause.addEventListener('mousedown', e => {
  if(paused){
    pause.innerHTML = "Pause";
    paused = false;
    live();
  }
  else{
    paused = true;
    pause.innerHTML = "Start";
  }
});

window.onresize = resizer;
/**
 * Resizes canvas and adjusts life and prevLife arrays.
 */
function resizer()
{
  document.getElementById('tip').className = 'disappear';

  canvas.width = window.innerWidth * sizeMultiplier;
  canvas.height = window.innerHeight * sizeMultiplier;
  width = Math.trunc(canvas.width / PSIZE);
  height = Math.trunc(canvas.height / PSIZE);
  life = Array(width);
  prevLife = Array(width);
  lifeColor = Array(width);
  for (let i = 0; i < width; i++) {
    life[i] = Array(height).fill(false);
    prevLife[i] = Array(height).fill(false);
    lifeColor[i] = Array(height).fill('wheat');
  }

  for (let i = 0; i < 100; i++) {
    let randomI = getRandomInt(width);
    let randomJ = getRandomInt(height);
    life[randomI][randomJ] = true;
  }

  refreshLife();
}

let /** @type {HTMLElement} */ menu = document.getElementById('key');

// Toggles menu with 'c'.
let /** @type {Boolean} */ isMenuVisible = true;
document.addEventListener('keydown', e => {
  if(e.code === 'KeyC'){

    document.getElementById('tip').className = 'disappear';
    if(isMenuVisible){
      menu.className = "disappear";
      isMenuVisible = false;
    }
    else{
      menu.className = "";
      isMenuVisible = true;
    }
  }
});