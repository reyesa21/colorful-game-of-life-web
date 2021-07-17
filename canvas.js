"use strict";

class BlockPainter {
  constructor(ctx, sz, clr) {
    this.context = ctx;
    this.blockSize = sz;
    this.defaultColor = clr;
  }

  paintBlock(x, y, blockColor = this.defaultColor) {
    this.context.fillStyle = blockColor;
    if(x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight){
    this.context.fillRect(
      x * this.blockSize,
      y * this.blockSize,
      this.blockSize,
      this.blockSize
    );
    }

  }
}

class CellColor {
  constructor(color) {
    this.color = color;
    this.kept = false;
  }
}

let cellColors = [
  new CellColor("#F10891"),
  new CellColor("#B00B69"),
  new CellColor("#F0F0FA"),
  new CellColor("#FAAAEE"),
  new CellColor("#E0DCAA"),
  new CellColor("#523445"),
  new CellColor("#323231"),
  new CellColor("#311222"),
  new CellColor("#666666"),
  new CellColor("#555555"),
];


let /** @type {HTMLElement} */ canvas = document.getElementById("draw");
canvas.width = 2500;
canvas.height = 2500;

let /** @type {HTMLElement} */ clear = document.getElementById("clear");

let /** @type {Boolean} */ clearing = false;
let /** @type {Boolean} */ paused = true;
let /** @type {Boolean} */ drawing = false;
let /** @type {Boolean} */ erasing = false;

const /** @type {Number} */ SCALE = 2;
const /** @type {Number} */ PSIZE = 10 * SCALE;
const /** @type {String} */ hoverColor = "#B3CAF5";

let /**@type {Number} */ width = Math.trunc(canvas.width / PSIZE);
let /**@type {Number} */ height = Math.trunc(canvas.height / PSIZE);

let speedOfLife = 100;

let /**@type {Cell[][]} */ life = [];
let /**@type {Cell[][][]} */ undoLives = [];
let /**@type {Cell[][][]} */ redoLives = [];

let ctx = canvas.getContext("2d");

let blockPainter = new BlockPainter(ctx, PSIZE, "wheat");

class Cell {
  /**
   *
   * @param {Boolean} isAlive
   * @param {Boolean} wasAlive
   */
  constructor(isAlive, wasAlive, cIndex = 10) {
    /**@type {Boolean} */
    this.isAlive = isAlive;
    /**@type {Boolean} */
    this.wasAlive = wasAlive;
    /**@type {Number} */
    this.colorIndex = cIndex;
    
  }

  getCellColor(){
    if(this.colorIndex == 10)
      return blockPainter.defaultColor;
    else if(this.colorIndex < 0 || this.colorIndex > 9){
      return null;
    }
      return cellColors[this.colorIndex].color;
  }

  setCellColor(color){
      if(typeof(color) === 'number' && color >= 0 && color < cellColors.length)
        this.colorIndex = color;
      else if(typeof(color) === 'string')
        this.colorIndex = cellColors.findIndex((e) => e.color == color);
      if(color === blockPainter.defaultColor)
        this.colorIndex = 10;
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
 function getRandomColor() {
  return cellColors[getRandomInt(10)].color;
}

window.onload = () => {
  window.setTimeout(() => {
    document.getElementById("tip").className = "fadeout";
  }, 8000);

  for (let i = 0; i < width + 2; i++) {
    life[i] = [];
    for (let j = 0; j < height + 2; j++) life[i][j] = new Cell(false, false);
  }

  //randomly turn on cells
  for (let i = 0; i < 1000; i++) {
    life[getRandomInt(width)][getRandomInt(height)].isAlive = true;
  }

  refreshLife(true);
};

// refreshes cells by comparising life array with previous life array
function refreshLife(refreshAll, keepColor = false) {
  for (let i = 0; i < width; i++)
    for (let j = 0; j < height; j++) {
      if (refreshAll || life[i][j].isAlive != life[i][j].wasAlive) {
        if (life[i][j].isAlive == true) {
          if(life[i][j].getCellColor() == blockPainter.defaultColor && !keepColor){
            life[i][j].setCellColor(getRandomInt(10));
          }
          blockPainter.paintBlock(i, j, life[i][j].getCellColor());
        } 
        
        else {
          life[i][j].setCellColor(blockPainter.defaultColor);
          blockPainter.paintBlock(i, j);
        }
      }
    }
}

/**
 * Returns the amount of neighbors for a specific cell.
 * @param {Number} x
 * @param {Number} y
 * @param {Boolean[][]} arr
 * @returns {Number}
 */
function neighbors(x, y, arr) {
  let nb = 0;

  if (y - 1 >= 0 && arr[x][y - 1].wasAlive == true) {
    nb++;
  }
  if (y + 1 < height && arr[x][y + 1].wasAlive == true) {
    nb++;
  }

  for (let k = 0; k < 3; k++) {
    if (
      x - 1 >= 0 && x - 1 < width &&
      y - 1 + k >= 0 && y - 1 + k < height &&
      arr[x - 1][y - 1 + k].wasAlive == true
    ) {
      nb++;
    }
  }

  for (let k = 0; k < 3; k++) {
    if (
      x + 1 >= 0 && x + 1 < width &&
      y - 1 + k >= 0 && y - 1 + k < height &&
      arr[x + 1][y - 1 + k].wasAlive == true
    ) {
      nb++;
    }
  }
  return nb;
}

/**
 * Updates cells based on number of neighbors.
 */
function live() {
  if (paused) return;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      life[i][j].wasAlive = life[i][j].isAlive;
    }
  }

  let nb = 0;
  for (let a = 0; a < width; a++) {
    for (let b = 0; b < height; b++) {
      nb = neighbors(a, b, life);
      life[a][b].isAlive = nb != 2 ? nb == 3 : life[a][b].isAlive;
    }
  }

  if (!clearing) refreshLife(false);
  if (!drawing && !paused && !erasing) setTimeout(live, speedOfLife);
}

// Event handles drawing.
canvas.addEventListener("mousedown", (e) => {
  if (e.button == 0) {
    redoLives = [];
    updateUndoRedoArray(undoLives);
    drawing = true;

    let x = Math.trunc(e.offsetX / PSIZE);
    let y = Math.trunc(e.offsetY / PSIZE);

    if (life[x] != undefined) {
      life[x][y].setCellColor(getRandomInt(10));
      blockPainter.paintBlock(x, y, life[x][y].getCellColor());
      life[x][y].isAlive = true;
    }
  }

  else if (e.button == 2) {
    erasing = true;

    let x = Math.trunc(e.offsetX / PSIZE);
    let y = Math.trunc(e.offsetY / PSIZE);

    if (life[x] != undefined) {
      life[x][y].setCellColor(blockPainter.defaultColor);
      blockPainter.paintBlock(x, y);
      life[x][y].isAlive = false;
    }
  }
});

/**
 * Returns x and y coordinates.
 * @param {Event} evt
 * @param {HTMLElement} parent
 * @returns {Position} Location of event.
 */
function getOffsetPosition(evt, parent) {
  /**
   * @typedef {Object} Position
   * @property {number} x - The X Coordinate
   * @property {number} y - The Y Coordinate
   */
  let position = {
    x: evt.targetTouches ? evt.targetTouches[0].pageX : evt.clientX,
    y: evt.targetTouches ? evt.targetTouches[0].pageY : evt.clientY,
  };

  while (parent.offsetParent) {
    position.x -= parent.offsetLeft - parent.scrollLeft;
    position.y -= parent.offsetTop - parent.scrollTop;

    parent = parent.offsetParent;
  }

  return position;
}

let pastX = -1;
let pastY = -1;
// Event to handle moving with mouse.
canvas.addEventListener("mousemove", (e) => {
  let x = Math.trunc(e.offsetX / PSIZE);
  let y = Math.trunc(e.offsetY / PSIZE);

  if (x == pastX && y == pastY) return;

  if (life[x] != undefined) {
    if (pastX != -1 && (pastX != x || pastY != y)) {
      blockPainter.paintBlock(
        pastX,
        pastY,
        life[pastX][pastY].isAlive // if cell is alive
          ? life[pastX][pastY].getCellColor() // replace hovercolor with cell's color
          : blockPainter.defaultColor // else replace it with default color
      );
    }

    if (drawing) {
      if (life[x] != undefined) {
        life[x][y].setCellColor(getRandomInt(10));
        blockPainter.paintBlock(x, y, life[x][y].getCellColor());
        life[x][y].isAlive = true;
      }
    } else if (erasing) {
      if (life[x] != undefined) {
        life[x][y].setCellColor(blockPainter.defaultColor);
        blockPainter.paintBlock(x, y, life[x][y].getCellColor());

        life[x][y].isAlive = false;
      }
    } else {
      if (life[x] != undefined) {
        blockPainter.paintBlock(x, y, hoverColor);
      }
    }

    pastX = x;
    pastY = y;
  }
});


// Event to handle ending drawing.
canvas.addEventListener("mouseup", (e) => {
  if (drawing) {
    drawing = false;
    live();
  }

  if (erasing) {
    erasing = false;
    live();
  }
});


// Event to disable right clicking in canvas.
if (canvas.addEventListener) {
  canvas.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
    },
    false
  );
} else {
  canvas.attachEvent("oncontextmenu", function () {
    window.event.returnValue = false;
  });
}

// Touch screen drawing event.
canvas.addEventListener("touchstart", (e) => {
  let offset = getOffsetPosition(e, canvas);

  drawing = true;

  let x = Math.trunc(offset.x / PSIZE);
  let y = Math.trunc(offset.y / PSIZE);

  if (life[x][y].isAlive != undefined) {
    life[x][y].setCellColor(getRandomInt(10));
    blockPainter.paintBlock(x, y);
    life[x][y].isAlive = true;
  }
});

// Event to handle moving with touch.
canvas.addEventListener("touchmove", (e) => {
  if (drawing) {
    let offset = getOffsetPosition(e, canvas);

    let x = Math.trunc(offset.x / PSIZE);
    let y = Math.trunc(offset.y / PSIZE);

    life[x][y].setCellColor(getRandomInt(10));
    blockPainter.paintBlock(x, y, life[x][y].getCellColor());
    life[x][y].isAlive = true;
  }
});

// Event to handle ending drawing.
canvas.addEventListener("touchend", (e) => {
  if (drawing) {
    drawing = false;
    live();
  }
});

// Handles clear button, which removes all living cells.
clear.addEventListener("mousedown", (e) => {
  clearing = true;
  updateUndoRedoArray(undoLives);
  redoLives = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) life[i][j].isAlive = false;
  }
  refreshLife(clearing);

  clearing = false;
});

let /** @type {HTMLElement} */ pause = document.getElementById("pause");

pause.addEventListener("mousedown", (e) => pauseFunction());
function pauseFunction(){
  if (paused) {
  updateUndoRedoArray(undoLives);
  redoLives = [];

  pause.innerHTML = "Pause";
  paused = false;
  live();
} else {
  paused = true;
  pause.innerHTML = "Start";
}
}
let /** @type {HTMLElement} */ menu = document.getElementById("key");

// Toggles menu with 'c'.
document.addEventListener("keydown", (e) => {
  if (e.code === "KeyC") {
    document.getElementById("tip").className = "disappear";
    if (menu.className != "disappear") {
      menu.className = "disappear";
    } else {
      menu.className = "";
    }
  }

  else if(e.code === "Space"){
    pauseFunction();
  }
});

let save = document.getElementById("save");

save.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    let dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(life));
    save.setAttribute("href", dataStr);
    save.setAttribute("download", "cgol.json");
    save.click();
  }
});

let colorButton = document.getElementById("colorButton");
colorButton.addEventListener("mousedown", (e) => disappearColorSelector(e));

let overlay = document.getElementById("overlay");
overlay.addEventListener("mousedown", (e) => disappearColorSelector(e));

/**
 *  Used to make the color selector disappear and appear
 * @param {Event} e the mousedown event
 */
function disappearColorSelector(e) {
  setColorPalette();
  let colorSelector = document.getElementById("colorSelector");
  if (e.button === 0) {
    if (colorSelector.className == "disappear") {
      colorSelector.className = "";
      overlay.className = "";
    } else {
      colorSelector.className = "disappear";
      overlay.className = "disappear";
    }
  }
}

let /** @type {[HTMLElement]} */ colorBlocks = [
    document.getElementById("color0"),
    document.getElementById("color1"),
    document.getElementById("color2"),
    document.getElementById("color3"),
    document.getElementById("color4"),
    document.getElementById("color5"),
    document.getElementById("color6"),
    document.getElementById("color7"),
    document.getElementById("color8"),
    document.getElementById("color9"),
  ];

function setColorPalette() {
  for (let i = 0; i < colorBlocks.length; i++) {
    colorBlocks[i].style.backgroundColor = cellColors[i].color;
  }
}

randomColorButton.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    document.getElementById("colorSelector").classList.toggle("shake-vertical");

    //set timeout for css shaking to end
    window.setTimeout(() => { 
      document
        .getElementById("colorSelector")
        .classList.toggle("shake-vertical");
    }, 250);

    for (let i = 0; i < cellColors.length; i++) {
      cellColors[i].color = cellColors[i].kept
        ? cellColors[i].color
        : Please.make_color({ full_random: true });
    }

    setColorPalette();
    refreshLife(true, false);
  }
});

let speedButton = document.getElementById("speedButton");
speedButton.addEventListener("mousedown", (e) => {
  speedOfLife = speedOfLife-20 > 0 ? speedOfLife-20 : 100;

  switch (speedOfLife) {
    case 100:
      speedButton.innerHTML = "Crawl"; break;
    case 80:
      speedButton.innerHTML = "Walk"; break;
    case 60:
      speedButton.innerHTML = "Jog"; break;
    case 40:
      speedButton.innerHTML = "Run"; break;
    case 20:
      speedButton.innerHTML = "Sprint"; break;
  }
});

/**
 *
 * @param {Event} e Mousedown event.
 * @param {HTMLElement} colorBlock The color block that will be kept.
 */
function keepColor(e, colorBlock, colorCell) {
  if (e.button === 0) {
    colorBlock.classList.toggle("fas");
    colorBlock.classList.toggle("fa-lock");
    colorBlock.classList.toggle("fa-2x");
  
    colorCell.kept = !colorCell.kept;
  }
}

for (let i = 0; i < colorBlocks.length; i++){
  colorBlocks[i].addEventListener("mousedown", (e) =>
    keepColor(e, colorBlocks[i], cellColors[i])
  );
}

// Undo Section

let undoButton = document.getElementById('undoButton');
undoButton.addEventListener("mousedown", (e) => {

  if(undoLives.length && e.button === 0) {
    paused = true;
    pause.innerHTML = "Start";
    updateUndoRedoArray(redoLives);

    let tempLife = undoLives.pop();
   
    for (let i = 0; i < width + 2; i++) {
      if (i < tempLife.length)
        for (let j = 0; j < height + 2; j++)
          life[i][j] =
            tempLife[i][j] ? tempLife[i][j] : life[i][j];
    }
  }
  refreshLife(true, true);
})

// Redo Section

let redoButton = document.getElementById('redoButton');
redoButton.addEventListener("mousedown", (e) => {
  if(redoLives.length && e.button === 0) {
    paused = true;
    pause.innerHTML = "Start";
    updateUndoRedoArray(undoLives);

    let tempLife = redoLives.pop();

    for (let i = 0; i < width + 2; i++) {
      if (i < tempLife.length)
        for (let j = 0; j < height + 2; j++)
          life[i][j] =
            tempLife[i][j] ? tempLife[i][j] : life[i][j];
    }
    refreshLife(true, true);
  }
})

function updateUndoRedoArray(lives) {
  let i = lives.length;

  lives[i] = [];

  for (let x = 0; x < life.length; x++) {
    lives[i][x] = [];
    for (let y = 0; y < life[x].length; y++) {
      lives[i][x][y] = new Cell(life[x][y].isAlive, life[x][y].wasAlive, life[x][y].colorIndex);
    }
  }

  if (lives.length > 10)
    lives.shift();
}
let xMax = 0;
let yMax = 0;
let lifeOffsetX = 0;
let lifeOffsetY = 0;
function holdScroll(btn, start, x, y) {
  let repeating = false;
  let mult = 10;

let repeat = () => {
    if (repeating) {
      window.scrollTo(window.scrollX+(x*mult), window.scrollY+(y*mult));
      requestAnimationFrame(repeat);
    }
  }

  if(btn != null){
  btn.addEventListener('mousedown', e => {
    btn.style.opacity = 1;
    btn.style.borderBottom = 0;
    
    if(btn === rightDirectionButton)
      btn.classList.add("right-direction-button-clicked");
    else if(btn === leftDirectionButton)
      btn.classList.add("left-direction-button-clicked");
    else if(btn === downDirectionButton)
      btn.classList.add('down-direction-button-clicked');

    repeating = true;
    repeat();

  });

  btn.addEventListener('mouseleave', e =>{
    btn.style.opacity = 0.5;
    btn.style.borderBottom = "10px solid black";
   
    if(btn === rightDirectionButton)
      btn.classList.remove("right-direction-button-clicked");
    else if(btn === leftDirectionButton)
      btn.classList.remove("left-direction-button-clicked");
    else if(btn === downDirectionButton)
      btn.classList.remove('down-direction-button-clicked');
   
      repeating = false;
  });

  btn.addEventListener('mouseup', e => {
    btn.style.opacity = 0.5;
    btn.style.borderBottom = "10px solid black";

    if(btn === rightDirectionButton)
    btn.classList.remove("right-direction-button-clicked");
  else if(btn === leftDirectionButton)
    btn.classList.remove("left-direction-button-clicked");
  else if(btn === downDirectionButton)
    btn.classList.remove('down-direction-button-clicked');

    repeating = false;
  });
  }

  else if(btn == null){
    let usingKeyboard = true;

    document.addEventListener('keydown', e => {
        usingKeyboard = true;

        if(e.code === 'KeyW' || e.code === 'ArrowUp'){
          y = -1;
          upDirectionButton.style.opacity = 1;
          upDirectionButton.style.borderBottom = 0;
        }
        else if (e.code === 'KeyS'|| e.code === 'ArrowDown'){
          y = 1;
          downDirectionButton.style.opacity = 1;
          downDirectionButton.style.borderBottom = 0;
          downDirectionButton.classList.add("down-direction-button-clicked");
        }
        else if(e.code === 'KeyA' || e.code === 'ArrowLeft'){
          x = -1;
          leftDirectionButton.style.opacity = 1;
          leftDirectionButton.style.borderBottom = 0;
          leftDirectionButton.classList.add("left-direction-button-clicked");
        }
        else if (e.code === 'KeyD' || e.code === 'ArrowRight'){
          x = 1;
          rightDirectionButton.style.opacity = 1;
          rightDirectionButton.style.borderBottom = 0;
          rightDirectionButton.classList.add("right-direction-button-clicked");
        }
        else
          return;
          
        if(!repeating){
        repeating = true;
        repeat();
        usingKeyboard = false;
      }
    })
    
    document.addEventListener('keyup', e => {
      if(e.code === 'KeyS' || e.code === 'ArrowDown'){
        y = 0; 
        downDirectionButton.style.opacity = 0.5;
        downDirectionButton.style.borderBottom = "10px solid black";
        downDirectionButton.classList.remove("down-direction-button-clicked");
        }
      if(e.code === 'KeyW' || e.code === 'ArrowUp'){
        upDirectionButton.style.opacity = 0.5;
        upDirectionButton.style.borderBottom = "10px solid black";
        y = 0; 
      }
      if(e.code === 'KeyA' || e.code === 'ArrowLeft'){
        leftDirectionButton.style.opacity = 0.5;
        leftDirectionButton.style.borderBottom = "10px solid black";
        leftDirectionButton.classList.remove("left-direction-button-clicked");
        x = 0;
      } 
      if(e.code === 'KeyD' || e.code === 'ArrowRight'){
        rightDirectionButton.style.opacity = 0.5;
        rightDirectionButton.style.borderBottom = "10px solid black";
        rightDirectionButton.classList.remove("right-direction-button-clicked");
        x = 0;
      }
      if(!usingKeyboard)
        repeating = false;
    })
  }
};

// Scrolling section
let upDirectionButton = document.getElementById('upDirectionButton');
let downDirectionButton = document.getElementById('downDirectionButton');
let leftDirectionButton = document.getElementById('leftDirectionButton');
let rightDirectionButton = document.getElementById('rightDirectionButton');
holdScroll(upDirectionButton, 10, 0, -1);
holdScroll(downDirectionButton, 10, 0, 1);
holdScroll(leftDirectionButton, 10, -1, 0);
holdScroll(rightDirectionButton, 10, 1, 0);
holdScroll(null, 10, 0, 0);
