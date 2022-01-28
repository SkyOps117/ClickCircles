//*******************//
//* Author: SkyHops *//
//*******************//
import styles from "./styles.css";
var canvas = document.createElement("canvas");
canvas.style.margin = "auto";
canvas.style.display = "block";
canvas.style.boxShadow = "0px 0px 15px 2px #000000ff";
canvas.style.cursor = "url('https://imgur.com/4kPPqsx.png') 0 0, auto";
canvas.addEventListener("mouseup", mouseUp);
document.getElementsByTagName("body")[0].appendChild(canvas);
//let canvas = document.getElementById("canvas2D");
var ctx = canvas.getContext("2d");
var coutput = document.getElementById("cout");
coutput.style.boxShadow = "0px 0px 1px 1px #000000ff";

/*
var imageLinks = {
  space: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6",
  galaxy: "https://images.unsplash.com/photo-1605704366546-e3632af0c5c6",
  forest: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  sky: "https://images.unsplash.com/photo-1464802686167-b939a6910659",
  winter: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606",
  nasa: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06"
};
*/
// Background image url
var images = {
  current: 0,
  length: 6,
  links: [
    "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6",
    "https://images.unsplash.com/photo-1605704366546-e3632af0c5c6",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1464802686167-b939a6910659",
    "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606"
  ],
  switch: function () {
    var tempIndex = this.current;
    if (this.current < this.length - 1) this.current++;
    else this.current = 0;
    return this.links[tempIndex];
  }
};

var background = document.getElementById("background");
background.src = images.links[0];

//Event listeners
window.addEventListener("onload", onLoad);
window.addEventListener("resize", resize);
window.addEventListener("unload", unLoad);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mousedown", mouseDown);
//document.addEventListener("mouseup", mouseUp);
var intervalID = setInterval(update, 1000 / 29.9);
resize();

//When loading
function onLoad() {}

//Resize canvas
function resize() {
  canvas.height = window.innerWidth * (9 / 16);
  canvas.width = window.innerHeight * (16 / 9);
  canvas.y = window.innerHeight/2;
}

//When closing
function unLoad() {
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mousedown", mouseDown);
  document.removeEventListener("mouseup", mouseUp);
  clearInterval(intervalID);
}

//Update loop
function update() {
  coutput.innerHTML =
    "(" +
    window.innerWidth +
    "x; " +
    window.innerHeight +
    "y) Zoom: " +
    window.devicePixelRatio;
  draw();
}

//Mouse is moving
function mouseMove() {}

//Mouse click pressed
function mouseDown() {}

//Mouse click released
function mouseUp() {
  background.src = images.switch();
}

//Draw loop
function draw() {}

/*
function drawText(text, point) {
  var gradient = ctx.createLinearGradient(
    canvas.width / 2,
    0,
    canvas.width / 2,
    canvas.height
  );
  gradient.addColorStop("0", "cyan");
  gradient.addColorStop("0.5", "#ffffcb");
  gradient.addColorStop("1.0", "red");
  ctx.font = "16px Consolas";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeText(text, point.x, point.y);
  ctx.fillStyle = gradient;
  ctx.fillText(text, point.x, point.y);
}
*/
