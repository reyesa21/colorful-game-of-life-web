"use strict";

class Cell {
  /**
   *
   * @param {Boolean} isAlive
   * @param {Boolean} wasAlive
   */
  constructor(isAlive, wasAlive) {
    /**@type {Boolean} */
    this.isAlive = isAlive;
    /**@type {Boolean} */
    this.wasAlive = wasAlive;
    /**@type {string} */
    this.color = "wheat";
  }
}

class CellColor {
  constructor(color) {
    this.color = color;
    this.kept = false;
  }
}

class BlockPainter {
  constructor(ctx, sz, clr) {
    this.context = ctx;
    this.blockSize = sz;
    this.defaultColor = clr;
  }

  paintBlock(x, y, blockColor = this.defaultColor) {
    this.context.fillStyle = blockColor;
    this.context.fillRect(
      x * this.blockSize,
      y * this.blockSize,
      this.blockSize,
      this.blockSize
    );
  }
}


document.body.style.overflow = "hidden"; // toggled when changing size

let sizeMultiplier = 1.0;

let /** @type {HTMLElement} */ canvas = document.getElementById("draw");
canvas.width = window.innerWidth * sizeMultiplier;
canvas.height = window.innerHeight * sizeMultiplier;

let /** @type {HTMLElement} */ clear = document.getElementById("clear");
let /** @type {Boolean} */ clearing = false;
let /** @type {Boolean} */ paused = true;

const /** @type {Number} */ SCALE = 2;
const /** @type {Number} */ PSIZE = 10 * SCALE;

let /**@type {Number} */ width = Math.trunc(canvas.width / PSIZE);
let /**@type {Number} */ height = Math.trunc(canvas.height / PSIZE);

let /** @type {String} */ hoverColor = "#B3CAF5";

let /**@type {Cell[][]} */ life = [];

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

let speedOfLife = 100;

let /** @type {Boolean} */ mouseDown = false;
let /** @type {Boolean} */ rightMouseDown = false;

let ctx = canvas.getContext("2d");

let blockPainter = new BlockPainter(ctx, PSIZE, "wheat");

window.onload = () => {
  window.setTimeout(() => {
    document.getElementById("tip").className = "fadeout";
  }, 8000);

  for (let i = 0; i < width + 2; i++) {
    life[i] = [];
    for (let j = 0; j < height + 2; j++) life[i][j] = new Cell(false, false);
  }

  //randomly turn on cells
  for (let i = 0; i < 100; i++) {
    life[getRandomInt(width)][getRandomInt(height)].isAlive = true;
  }

  refreshLife();
};

// refreshes cells by comparising life array with previous life array
function refreshLife() {
  for (let i = 0; i < width; i++)
    for (let j = 0; j < height; j++) {
      if (life[i][j].isAlive != life[i][j].wasAlive || clearing) {
        if (life[i][j].isAlive == true) {
          life[i][j].color = getColor();
          blockPainter.paintBlock(i, j, life[i][j].color);
        } 
        
        else {
          life[i][j].color = blockPainter.defaultColor;
          blockPainter.paintBlock(i, j);
        }
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
function getColor() {
  return cellColors[getRandomInt(10)].color;
}

/**
 * Returns the amount of neighbors for a specific cell.
 * @param {Number} x
 * @param {Number} y
 * @returns {Number}
 */
function neighbors(x, y) {
  let nb = 0;

  if (y - 1 >= 0 && life[x][y - 1].wasAlive == true) {
    nb++;
  }
  if (y + 1 < height && life[x][y + 1].wasAlive == true) {
    nb++;
  }

  for (let k = 0; k < 3; k++) {
    if (
      x - 1 >= 0 &&
      x - 1 < width &&
      y - 1 + k >= 0 &&
      y - 1 + k < height &&
      life[x - 1][y - 1 + k].wasAlive == true
    ) {
      nb++;
    }
  }

  for (let k = 0; k < 3; k++) {
    if (
      x + 1 >= 0 &&
      x + 1 < width &&
      y - 1 + k >= 0 &&
      y - 1 + k < height &&
      life[x + 1][y - 1 + k].wasAlive == true
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
      nb = neighbors(a, b);
      life[a][b].isAlive = nb != 2 ? nb == 3 : life[a][b].isAlive;
    }
  }

  if (!clearing) refreshLife();
  if (!mouseDown && !paused && !rightMouseDown) setTimeout(live, speedOfLife);
}

// Event handles drawing.
canvas.addEventListener("mousedown", (e) => {
  if (e.button == 0) {
    mouseDown = true;

    let x = Math.trunc(e.offsetX / PSIZE);
    let y = Math.trunc(e.offsetY / PSIZE);

    if (life[x] != undefined) {
      life[x][y].color = getColor();
      blockPainter.paintBlock(x, y, life[x][y].color);
      life[x][y].isAlive = true;
    }
  }

  if (e.button == 2) {
    rightMouseDown = true;

    let x = Math.trunc(e.offsetX / PSIZE);
    let y = Math.trunc(e.offsetY / PSIZE);

    if (life[x] != undefined) {
      life[x][y].color = blockPainter.defaultColor;
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

// Touch screen drawing event.
canvas.addEventListener("touchstart", (e) => {
  let offset = getOffsetPosition(e, canvas);

  mouseDown = true;

  let x = Math.trunc(offset.x / PSIZE);
  let y = Math.trunc(offset.y / PSIZE);

  if (life[x][y].isAlive != undefined) {
    life[x][y].color = getColor();
    blockPainter.paintBlock(x, y);
    life[x][y].isAlive = true;
  }
});

let pastX = -1;
let pastY = -1;
// Event to handle moving with mouse.
canvas.addEventListener("mousemove", (e) => {
  let x = Math.trunc(e.offsetX / PSIZE);
  let y = Math.trunc(e.offsetY / PSIZE);
  if (life[x] != undefined) {
    if (pastX != -1)
      if (pastX != x || pastY != y) {
        blockPainter.paintBlock(
          pastX,
          pastY,
          life[pastX][pastY].isAlive
            ? life[pastX][pastY].color
            : blockPainter.defaultColor
        );
      }

    if (mouseDown) {
      if (life[x] != undefined) {
        life[x][y].color = getColor();
        blockPainter.paintBlock(x, y, life[x][y].color);
        life[x][y].isAlive = true;
      }
    } else if (rightMouseDown) {
      if (life[x] != undefined) {
        life[x][y].color = blockPainter.defaultColor;
        blockPainter.paintBlock(x, y, life[x][y].color);

        life[x][y].isAlive = false;
      }
    } else {
      if (life[x] != undefined) {
        pastX = x;
        pastY = y;
        blockPainter.paintBlock(x, y, hoverColor);
      }
    }
  }
});

// Event to handle moving with touch.
canvas.addEventListener("touchmove", (e) => {
  if (mouseDown) {
    let offset = getOffsetPosition(e, canvas);

    let x = Math.trunc(offset.x / PSIZE);
    let y = Math.trunc(offset.y / PSIZE);

    life[x][y].color = getColor();
    blockPainter.paintBlock(x, y, life[x][y].color);
    life[x][y].isAlive = true;

    life[x][y].isAlive = true;
  }
});

// Event to handle ending drawing.
canvas.addEventListener("mouseup", (e) => {
  if (mouseDown) {
    mouseDown = false;
    live();
  }

  if (rightMouseDown) {
    rightMouseDown = false;
    live();
  }
});

// Event to handle ending drawing.
canvas.addEventListener("touchend", (e) => {
  if (mouseDown) {
    mouseDown = false;
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
    alert("You've tried to open context menu");
    window.event.returnValue = false;
  });
}

let /** @type {HTMLElement} */ resize = document.getElementById("resize");
let /** @type {Number} */ resizeCounter = 0;

// Handles resize button which resizes the canvas in a cyclical manner.
resize.addEventListener("mousedown", (e) => {
  switch (resizeCounter) {
    case -1:
      resizeCounter++;
      resize.innerHTML = "1.0x";
      sizeMultiplier = 1.0;
      document.body.style.overflow = "hidden";
      break;
    case 0:
      resizeCounter++;
      resize.innerHTML = "1.2x";
      sizeMultiplier = 1.2;
      document.body.style.overflow = "visible";

      break;
    case 1:
      resizeCounter++;
      resize.innerHTML = "1.5x";
      sizeMultiplier = 1.5;
      break;
    case 2:
      resizeCounter++;
      resize.innerHTML = "1.8x";
      sizeMultiplier = 1.8;
      break;
    case 3:
      resizeCounter = -1;
      resize.innerHTML = "2.0x";
      sizeMultiplier = 2.0;
      break;
  }

  resizer();
});

// Handles clear button, which removes all living cells.
clear.addEventListener("mousedown", (e) => {
  clearing = true;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) life[i][j].isAlive = false;
  }
  refreshLife();

  clearing = false;
});

let /** @type {HTMLElement} */ pause = document.getElementById("pause");

pause.addEventListener("mousedown", (e) => {
  if (paused) {
    pause.innerHTML = "Pause";
    paused = false;
    live();
  } else {
    paused = true;
    pause.innerHTML = "Start";
  }
});

window.onresize = resizer;
/**
 * Resizes canvas and adjusts life and prevLife arrays.
 */
function resizer() {
  canvas.width = window.innerWidth * sizeMultiplier;
  canvas.height = window.innerHeight * sizeMultiplier;

  width = Math.max(Math.trunc(canvas.width / PSIZE), width);
  height = Math.max(Math.trunc(canvas.height / PSIZE), height);

  for (let i = 0; i < width + 2; i++) {
    if (i >= life.length) life[i] = [];

    for (let j = 0; j < height + 2; j++)
      life[i][j] =
        life[i][j] != undefined ? life[i][j] : new Cell(false, false);
  }

  refreshLife();
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
    window.setTimeout(() => {
      document
        .getElementById("colorSelector")
        .classList.toggle("shake-vertical");
    }, 250);
    let hsv = {
      h: getRandomInt(360),
      s: Math.max(0.8, Math.random()),
      v: Math.max(0.8, Math.random()),
    };

    let randomColors = Please.make_scheme(hsv, {
      scheme_type: "analogous",
      format: "hex",
    });

    Array.prototype.push.apply(
      randomColors,
      Please.make_scheme(hsv, { scheme_type: "double", format: "hex" })
    );

    for (let i = 0; i < cellColors.length; i++) {
      cellColors[i].color = cellColors[i].kept
        ? cellColors[i].color
        : Please.make_color({ full_random: true });
    }

    setColorPalette();

    clearing = true;
    refreshLife();
    clearing = false;
  }
});

let speedButton = document.getElementById("speedButton");
let speedCounter = 0;
speedButton.addEventListener("mousedown", (e) => {
  switch (speedCounter) {
    case -1:
      speedCounter++;
      speedButton.innerHTML = "Crawl";
      speedOfLife = 100;
      break;
    case 0:
      speedCounter++;
      speedButton.innerHTML = "Walk";
      speedOfLife = 80;
      break;
    case 1:
      speedCounter++;
      speedButton.innerHTML = "Jog";
      speedOfLife = 60;
      break;
    case 2:
      speedCounter++;
      speedButton.innerHTML = "Run";
      speedOfLife = 40;
      break;
    case 3:
      speedCounter = -1;
      speedButton.innerHTML = "Sprint";
      speedOfLife = 20;
      break;
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

for (let i = 0; i < colorBlocks.length; i++)
  colorBlocks[i].addEventListener("mousedown", (e) =>
    keepColor(e, colorBlocks[i], cellColors[i])
  );
