'use strict';
!function(e,r,a){"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?module.exports=a():r[e]=a()}("Please",this,function(){"use strict";function e(){function e(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),Math.floor(o()*(r-e+1))+e}function r(e,r,a){var o=Math.random;return a instanceof l&&(o=a.random),o()*(r-e)+e}function a(e,r,a){return Math.max(r,Math.min(e,a))}function o(e,r){var a;switch(e){case"hex":for(a=0;a<r.length;a++)r[a]=F.HSV_to_HEX(r[a]);break;case"rgb":for(a=0;a<r.length;a++)r[a]=F.HSV_to_RGB(r[a]);break;case"rgb-string":for(a=0;a<r.length;a++){var o=F.HSV_to_RGB(r[a]);r[a]="rgb("+o.r+","+o.g+","+o.b+")"}break;case"hsv":break;default:console.error("Format not recognized.")}return r}function n(e){var r=F.HSV_to_RGB(e),a=(299*r.r+587*r.g+114*r.b)/1e3;return a>=128?"dark":"light"}function t(e){var r={};for(var a in e)e.hasOwnProperty(a)&&(r[a]=e[a]);return r}function l(e){function r(){o=(o+1)%256,n=(n+a[o])%256;var e=a[o];return a[o]=a[n],a[n]=e,a[(a[o]+a[n])%256]}for(var a=[],o=0,n=0,t=0;256>t;t++)a[t]=t;for(var l=0,F=0;256>l;l++){F=(F+a[l]+e.charCodeAt(l%e.length))%256;var s=a[l];a[l]=a[F],a[F]=s}this.random=function(){for(var e=0,a=0,o=1;8>e;e++)a+=r()*o,o*=256;return a/0x10000000000000000}}var F={},s={aliceblue:"F0F8FF",antiquewhite:"FAEBD7",aqua:"00FFFF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000000",blanchedalmond:"FFEBCD",blue:"0000FF",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"00FFFF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgrey:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkslategrey:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dimgrey:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"FF00FF",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",grey:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgray:"D3D3D3",lightgrey:"D3D3D3",lightgreen:"90EE90",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"778899",lightslategrey:"778899",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"00FF00",limegreen:"32CD32",linen:"FAF0E6",magenta:"FF00FF",maroon:"800000",mediumaquamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370D8",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"6B8E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"D87093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",rebeccapurple:"663399",red:"FF0000",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",slategrey:"708090",snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFFFFF",whitesmoke:"F5F5F5",yellow:"FFFF00",yellowgreen:"9ACD32"},i=.618033988749895,u={hue:null,saturation:null,value:null,base_color:"",greyscale:!1,grayscale:!1,golden:!0,full_random:!1,colors_returned:1,format:"hex",seed:null},c={scheme_type:"analogous",format:"hex"},h={golden:!1,format:"hex"};return F.NAME_to_HEX=function(e){return e=e.toLowerCase(),e in s?s[e]:(console.error("Color name not recognized."),void 0)},F.NAME_to_RGB=function(e){return F.HEX_to_RGB(F.NAME_to_HEX(e))},F.NAME_to_HSV=function(e){return F.HEX_to_HSV(F.NAME_to_HEX(e))},F.HEX_to_RGB=function(e){var r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(r,function(e,r,a,o){return r+r+a+a+o+o});var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return a?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null},F.RGB_to_HEX=function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)},F.HSV_to_RGB=function(e){var r,a,o,n,t,l,F,s,i=e.h,u=e.s,c=e.v;if(0===u)return{r:c,g:c,b:c};switch(i/=60,n=Math.floor(i),t=i-n,l=c*(1-u),F=c*(1-u*t),s=c*(1-u*(1-t)),n){case 0:r=c,a=s,o=l;break;case 1:r=F,a=c,o=l;break;case 2:r=l,a=c,o=s;break;case 3:r=l,a=F,o=c;break;case 4:r=s,a=l,o=c;break;case 5:r=c,a=l,o=F}return{r:Math.floor(255*r),g:Math.floor(255*a),b:Math.floor(255*o)}},F.RGB_to_HSV=function(e){var r=e.r/255,a=e.g/255,o=e.b/255,n=0,t=0,l=0,F=Math.min(r,Math.min(a,o)),s=Math.max(r,Math.max(a,o));if(F===s)return l=F,{h:0,s:0,v:l};var i=r===F?a-o:o===F?r-a:o-r,u=r===F?3:o===F?1:5;return n=60*(u-i/(s-F)),t=(s-F)/s,l=s,{h:n,s:t,v:l}},F.HSV_to_HEX=function(e){return F.RGB_to_HEX(F.HSV_to_RGB(e))},F.HEX_to_HSV=function(e){return F.RGB_to_HSV(F.HEX_to_RGB(e))},F.make_scheme=function(e,r){function n(e){return{h:e.h,s:e.s,v:e.v}}var l,F,s,i,u,h=t(c);if(null!==r)for(var d in r)r.hasOwnProperty(d)&&(h[d]=r[d]);var g=[e];switch(h.scheme_type.toLowerCase()){case"monochromatic":case"mono":for(u=1;2>=u;u++)l=n(e),s=l.s+.1*u,s=a(s,0,1),i=l.v+.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);for(u=1;2>=u;u++)l=n(e),s=l.s-.1*u,s=a(s,0,1),i=l.v-.1*u,i=a(i,0,1),l.s=s,l.v=i,g.push(l);break;case"complementary":case"complement":case"comp":l=n(e),l.h=(l.h+180)%360,g.push(l);break;case"split-complementary":case"split-complement":case"split":l=n(e),l.h=(l.h+165)%360,g.push(l),l=n(e),l.h=Math.abs((l.h-165)%360),g.push(l);break;case"double-complementary":case"double-complement":case"double":l=n(e),l.h=(l.h+180)%360,g.push(l),l.h=(l.h+30)%360,F=n(l),g.push(l),l.h=(l.h+180)%360,g.push(F);break;case"analogous":case"ana":for(u=1;5>=u;u++)l=n(e),l.h=(l.h+20*u)%360,g.push(l);break;case"triadic":case"triad":case"tri":for(u=1;3>u;u++)l=n(e),l.h=(l.h+120*u)%360,g.push(l);break;default:console.error("Color scheme not recognized.")}return o(h.format.toLowerCase(),g),g},F.make_color=function(n){var s=[],c=t(u),h=null;if(null!==n)for(var d in n)n.hasOwnProperty(d)&&(c[d]=n[d]);var g=null;"string"==typeof c.seed&&(g=new l(c.seed)),c.base_color.length>0&&(h=c.base_color.match(/^#?([0-9a-f]{3})([0-9a-f]{3})?$/i)?F.HEX_to_HSV(c.base_color):F.NAME_to_HSV(c.base_color));for(var m=0;m<c.colors_returned;m++){var f,E,b,p=e(0,360,g);null!==h?(f=a(e(h.h-5,h.h+5,g),0,360),E=0===h.s?0:r(.4,.85,g),b=r(.4,.85,g),s.push({h:f,s:E,v:b})):(f=c.greyscale===!0||c.grayscale===!0?0:c.golden===!0?(p+p/i)%360:null===c.hue||c.full_random===!0?p:a(c.hue,0,360),E=c.greyscale===!0||c.grayscale===!0?0:c.full_random===!0?r(0,1,g):null===c.saturation?.4:a(c.saturation,0,1),b=c.full_random===!0?r(0,1,g):c.greyscale===!0||c.grayscale===!0?r(.15,.75,g):null===c.value?.75:a(c.value,0,1),s.push({h:f,s:E,v:b}))}return o(c.format.toLowerCase(),s),s},F.make_contrast=function(e,r){var l=t(h);if(null!==r)for(var s in r)r.hasOwnProperty(s)&&(l[s]=r[s]);var u,c,d=n(e);if(l.golden===!0)c=e.h*(1+i)%360;else{var g=F.make_scheme(e,{scheme_type:"complementary",format:"hsv"})[1];c=a(g.h-30,0,360)}var m;return"dark"===d?m=a(e.v-.25,0,1):"light"===d&&(m=a(e.v+.25,0,1)),u=[{h:c,s:e.s,v:m}],o(l.format.toLowerCase(),u),u[0]},F}return e()});

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
let /**@type {Boolean[][]} */ life = [];
let /**@type {Boolean[][]} */ prevLife = [];
let /**@type {Boolean[][]} */ lifeColor = [];

let cellColor0 = "#F10891";
let cellColor1 = "#B00B69";
let cellColor2 = "#F0F0FA";
let cellColor3 = "#FAAAEE";
let cellColor4 = "#E0DCAA";
let cellColor5 = "#523445";
let cellColor6 = "#323231";
let cellColor7 = "#311222";
let cellColor8 = "#666666";
let cellColor9 = "#555555";

let speedOfLife = 100;

let /** @type {Boolean} */ mouseDown = false;
let /** @type {Boolean} */ rightMouseDown = false;

let ctx = canvas.getContext('2d');

window.onload = () => {
  window.setTimeout(() =>
  {  document.getElementById('tip').className = 'fadeout';}, 8000
  );
  
  for (let i = 0; i < width; i++) {
    life[i] = [];
    prevLife[i] = [];
    lifeColor[i] = [];
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
          return cellColor0;
      case 1:
          return cellColor1;
      case 2:
          return cellColor2;
      case 3:
          return cellColor3;
      case 4:
          return cellColor4;
      case 5:
          return cellColor5;
      case 6:
          return cellColor6;
      case 7:
          return cellColor7;
      case 8:
          return cellColor8;     
        case 9:
          return cellColor9;
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
    if (!mouseDown && !paused && !rightMouseDown)
      setTimeout(live, speedOfLife);
    else
      ctx.fillStyle = getColor(); // get color used for drawing
}


// Event handles drawing. 
canvas.addEventListener('mousedown', e => {
  if (e.button == 0) {
    mouseDown = true;

    let x = Math.trunc(e.offsetX / PSIZE);
    let y = Math.trunc(e.offsetY / PSIZE);
    
    if(life[x] != undefined){
      ctx.fillStyle = lifeColor[x][y] = getColor();
      ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
      life[x][y] = true;
    }
  }

  if(e.button == 2) {
    rightMouseDown = true;

    let x = Math.trunc(e.offsetX / PSIZE);
    let y = Math.trunc(e.offsetY / PSIZE);
    
    if(life[x] != undefined){
      ctx.fillStyle = lifeColor[x][y] = "wheat";
      ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
      life[x][y] = false;
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

let pastX = -1;
let pastY = -1;
// Event to handle moving with mouse.
canvas.addEventListener('mousemove', e => {


  let x = Math.trunc(e.offsetX / PSIZE);
  let y = Math.trunc(e.offsetY / PSIZE);
  if (life[x] != undefined) {
    if (pastX != -1)
      if (pastX != x || pastY != y) {
        ctx.fillStyle = lifeColor[pastX][pastY] ? lifeColor[pastX][pastY] : "wheat";
        ctx.fillRect(pastX * PSIZE, pastY * PSIZE, PSIZE, PSIZE);
      }

    if (mouseDown) {
      if (life[x] != undefined) {
        ctx.fillStyle = lifeColor[x][y] = getColor();

        ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
        life[x][y] = true;
      }
    }
    else if(rightMouseDown) {
      if (life[x] != undefined) {
        ctx.fillStyle = lifeColor[x][y] = "wheat";

        ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);
        life[x][y] = false;
      }
    }
    else {
      if (life[x] != undefined) {
        pastX = x;
        pastY = y;
        ctx.fillStyle = "#B3CAF5";
        ctx.fillRect(x * PSIZE, y * PSIZE, PSIZE, PSIZE);

      }
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
    live();
  }

  if (rightMouseDown) {
    rightMouseDown = false;
    live();
  }
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

  for (let i = life.length; i < width; i++) {
      life.push(Array(height).fill(false));
      prevLife.push(Array(height).fill(false));
      lifeColor.push(Array(height).fill('wheat'));
    }

  refreshLife();
}

let /** @type {HTMLElement} */ menu = document.getElementById('key');

// Toggles menu with 'c'.
document.addEventListener('keydown', e => {
  if(e.code === 'KeyC'){

    document.getElementById('tip').className = 'disappear';
    if(      menu.className != "disappear"){
      menu.className = "disappear";
    }
    else{
      menu.className = "";
    }
  }
});


let save = document.getElementById('save');

save.addEventListener('mousedown', e => {
  if(e.button === 0){
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(life));
    save.setAttribute("href",     dataStr     );
    save.setAttribute("download", "cgol.json");
    save.click();
  }
})

let colorButton = document.getElementById('colorButton');
colorButton.addEventListener('mousedown', e => disappearColorSelector(e));

let overlay = document.getElementById('overlay');
overlay.addEventListener('mousedown', e => disappearColorSelector(e));

/**
 *  Used to make the color selector disappear and appear
 * @param {Event} e the mousedown event
 */
function disappearColorSelector(e){
  
  setColorPalette();
  let colorSelector = document.getElementById('colorSelector');
   if(e.button === 0){

    if(colorSelector.className == "disappear"){
      colorSelector.className = "";
      overlay.className = "";
      
    }
    else{
      colorSelector.className = "disappear";
      overlay.className = "disappear";

    }
  }
}

function setColorPalette(){
  document.getElementById('color0').style.backgroundColor = cellColor0;
  document.getElementById('color1').style.backgroundColor = cellColor1;
  document.getElementById('color2').style.backgroundColor = cellColor2;
  document.getElementById('color3').style.backgroundColor = cellColor3;
  document.getElementById('color4').style.backgroundColor = cellColor4;
  document.getElementById('color5').style.backgroundColor = cellColor5;
  document.getElementById('color6').style.backgroundColor = cellColor6;
  document.getElementById('color7').style.backgroundColor = cellColor7;
  document.getElementById('color8').style.backgroundColor = cellColor8;
  document.getElementById('color9').style.backgroundColor = cellColor9;

}

let randomColorButton = document.getElementById('randomColorButton');

randomColorButton.addEventListener('mousedown', e => {
  if(e.button === 0){
    document.getElementById('colorSelector').classList.toggle('shake-vertical'); 
    window.setTimeout(() =>
    {      document.getElementById('colorSelector').classList.toggle('shake-vertical');   }, 250
    );
    let hsv =       {
      h: getRandomInt(360),
      s: Math.max(0.8, Math.random()),
      v: Math.max(0.8, Math.random())
    };
    [cellColor0, cellColor1, cellColor2, cellColor3, cellColor4, cellColor5] =
    Please.make_scheme(
      hsv,
      {
        scheme_type: 'analogous',
        format: 'hex'
      });
    [cellColor6, cellColor7, cellColor8, cellColor9] =
    Please.make_scheme(hsv, {scheme_type: 'double', format: 'hex'});
    cellColor6 = Please.make_color();
    setColorPalette();

    clearing = true;
    refreshLife();
    clearing = false;

  }
})

let speedButton = document.getElementById('speedButton');
let speedCounter = 0;
speedButton.addEventListener('mousedown', e=> {
  switch(speedCounter){
    case -1:
      speedCounter++;
      speedButton.innerHTML="Crawl";
      speedOfLife = 100;
      break;
    case 0:
      speedCounter++;
      speedButton.innerHTML="Walk";
      speedOfLife = 80;
      break;
    case 1:
      speedCounter++;
      speedButton.innerHTML="Jog";
      speedOfLife = 60;
      break;
    case 2:
      speedCounter++;
      speedButton.innerHTML="Run";
      speedOfLife = 40;
      break;
    case 3:
      speedCounter = -1;
      speedButton.innerHTML="Sprint";
      speedOfLife = 20;
      break;
  }
})
