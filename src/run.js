/* * * * * * * * * * * * * * * * * * * * * * * * * * */
/*                - Click Circles -                  */
/*  A canvas based game using pure javascript only.  */
/*  The goal is to click animated circles around.    */
/*                                                   */
/*             ~ Author: BunnyHopsIn ~               */
/* * * * * * * * * * * * * * * * * * * * * * * * * * */

import Stats from "./mod/Stats.js";
import * as Styler from "./obj/styler.js";
//import { imgLinks } from "./obj/links.js";
var fpsMeter = new Stats();
fpsMeter.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
Styler.addCSS();

//Variables settings
var curOpenURL = "url('./assets/D2R-open.png') 5 10, auto";
var curPointURL = "url('./assets/D2R-point.png') 5 10, auto";
var aspectRatioX = 16;
var aspectRatioY = 9;

//Body styling
var body = document.getElementsByTagName("body")[0];
body.style.margin = "auto";
body.style.padding = 0;
//body.style.overflow = "hidden";
//body.style.background = "#a1a1a1";
body.style.cursor = curOpenURL;

//Add script for styling with css
var stylerJS = document.createElement('script');
stylerJS.setAttribute("type", "module");
stylerJS.setAttribute("src", "./src/obj/styler.js");
body.appendChild(stylerJS);

//Landscape image styling
var landscape = document.createElement("img");
landscape.setAttribute("src", randImgURL("space,galaxy", window.innerWidth, window.innerHeight));
landscape.setAttribute("alt", "LoadingSVG");
landscape.style.position = "absolute";
landscape.style.display = "block";
landscape.style.zIndex = "-1";
landscape.style.top = "0%";
landscape.style.left = "0%";
landscape.style.width = "100%";
landscape.style.height = "100%";
//landscape.style.tabSize = -1;
//landscape.style.background = "url("+randImgURL("space,galaxy", window.innerWidth, window.innerHeight)+")";
body.appendChild(landscape);

//Canvas styling
var canvas = document.createElement("canvas");
canvas.setAttribute("class", "canvas2D");
//canvas.style.boxShadow = "0px 0px 100px 100px #000000ff";
//canvas.style.margin = "auto";
//canvas.style.padding = 0;
//canvas.style.position = "absolute";
//canvas.style.background = "#00000000";
//canvas.style.display = "block";
//canvas.style.top = 0;
//canvas.style.left = 0;
//canvas.style.bottom = 0;
//canvas.style.right = 0;
//Context
var ctx = canvas.getContext("2d");
body.appendChild(canvas);
body.appendChild(fpsMeter.dom);

var coutput = document.createElement("div");
coutput.style.position = "absolute";
coutput.style.margin = "auto";
coutput.style.padding = "0";
coutput.style.backgroundColor = "#11111188";
coutput.style.color = "#ffffcb";
coutput.style.boxShadow = "0px 0px 2px 2px #11111188";
//coutput.style.pointerEvents = "none";
coutput.style.display = "block";
coutput.style.zIndex = 99999;
body.appendChild(coutput);

//Event listeners
document.addEventListener("DOMContentLoaded", pageLoad);
body.setAttribute("onload", onLoad);
//body.addEventListener("onload", onLoad);
body.addEventListener("unload", unLoad);
window.addEventListener("resize", resize);
body.addEventListener("mouseenter", mouseEnter);
body.addEventListener("mouseleave", mouseLeave);
window.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp);
//Disable right click
window.addEventListener('contextmenu', function (event) {event.preventDefault();});

/* * * * * * * * */
/* ~ Functions ~ */
/* * * * * * * * */

//Everything is loaded, never saw it trigger.
function onLoad(event) 
{
  console.log("Everything is loaded now.");
}

//Page load or refresh.
function pageLoad(event)
{
  body.style.display = "block";
  console.log("Page loaded.");
}

//Resize canvas
function resize() {
	var zoom = window.devicePixelRatio;
  var newWidth = window.innerHeight * (aspectRatioX/aspectRatioY);
  var newHeight = window.innerWidth * (aspectRatioY/aspectRatioX);
	var ratio = newHeight/newWidth;
	canvas.height = newHeight;
  canvas.width = newWidth;
  canvas.style.height = newHeight + "px";
  canvas.style.width = newWidth + "px";
  var shadowSize = 1;

  if(canvas.height <= window.innerHeight)
    shadowSize = (window.innerHeight-canvas.height)/2;
  else
    shadowSize = (window.innerWidth-canvas.width)/2;
  canvas.style.boxShadow = "0px 0px " + shadowSize + "px " + shadowSize/4 + "px #ade8f47f";
  //canvas.style.boxShadow = "0px 0px " + (window.innerWidth-canvas.width)/2 + "px " + (window.innerHeight-canvas.height)/2 + "px #f5cb5bff";
  //canvas.style.transform = "translate(0, 25%)";
  /*canvas.style.top = 0;
  canvas.style.left = 0;*/
}
resize();

//When closing
function unLoad() {
  document.removeEventListener("DOMContentLoaded", pageLoad);
  document.removeEventListener("onload", onLoad);
  document.removeEventListener("unload", unLoad);
  window.removeEventListener("resize", resize);
  canvas.removeEventListener("mouseenter", mouseEnter);
  canvas.removeEventListener("mouseleave", mouseLeave);
  document.removeEventListener("mousemove", mouseMove);
  canvas.removeEventListener("mousedown", mouseDown);
  canvas.removeEventListener("mouseup", mouseUp);
  window.removeEventListener('contextmenu', function (event) {event.preventDefault();});
  clearInterval(intervalID);
  console.log("Unloaded. Cya!");
}

//Start update loop
var intervalID = setInterval(update, 1000 / 144);
//Update loop definition
function update() {
  fpsMeter.begin();
  //window.devicePixelRatio; //CHeck this for zoom
  draw();	
  fpsMeter.end();
}

//Draw loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText("(" + mouseX + ";" + mouseY + ")" , mouseX, mouseY);
  drawText("(" + mouseDeltaX + ";" + mouseDeltaY + ")" , mouseX, mouseY-20);
}

var mouseX = 0;
var mouseY = 0;
var mouseDeltaX = 0;
var mouseDeltaY = 0;
//Mouse is moving
function mouseMove(event) {
  mouseX = event.clientX - canvas.offsetLeft;
  mouseY = event.clientY - canvas.offsetTop;
  mouseDeltaX = event.movementX;
  mouseDeltaY = event.movementY;
  //coord.x = event.clientX - canvas.offsetLeft;
  //coord.y = event.clientY - canvas.offsetTop;
  //coutput.innerText = "(" + event.pageX + ";" + event.pageY + ")";
  //coutput.style.left = event.pageX + "px"
  //coutput.style.top = event.pageY + "px"
  //console.log(event.pageX + ";" + event.pageY);
}

//Mouse click pressed
function mouseDown(event) 
{
  body.style.cursor = curPointURL;
  body.style.backgroundImage = "url("+randImgURL("space,galaxy",window.innerWidth,window.innerHeight)+")";
}

//Mouse click released
function mouseUp(event) {
	//https://imgur.com/vllSGoU
  body.style.cursor = curOpenURL;
}

function mouseEnter(event)
{
  console.log("MouseEnter");
}
function mouseLeave(event)
{
  console.log("MouseLeave");
}

function drawText(text, x, y) {
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
  ctx.strokeText(text, x, y);
  ctx.fillStyle = gradient;
  ctx.fillText(text, x, y);
}

function genGradient(x1, y1, x2, y2)
{
  var gradient = ctx.createLinearGradient(
    canvas.width / 2,
    0,
    canvas.width / 2,
    canvas.height
  );
  gradient.addColorStop("0", "cyan");
  gradient.addColorStop("0.5", "#ffffcb");
  gradient.addColorStop("1.0", "red");
  return gradient;
}

function randImg(words, width, height) {
	var fullUrl = randImgURL(words, width, height);
	var imgElement = document.createElement("img");
  imgElement.setAttribute("src",fullUrl);
	return imgElement;
}

function randImgURL(words, width, height) {
	var fullUrl;
	const randomUrl = "https://source.unsplash.com/random/";
	const sizeUrl = String(width) + "x" + String(height);
	const wordsUrl = "/?" + words;
	fullUrl = String(randomUrl) + String(sizeUrl) + String(wordsUrl);
	return fullUrl;
}

/*
//Get the header.
var head = document.getElementsByTagName('head')[0];
//Check if right element.
if (body === HTMLBodyElement){}
if (head === HTMLHeadElement){}
//Link CSS file example.
var linkCSS = document.createElement('link');
linkCSS.rel = 'stylesheet'; 
linkCSS.type = 'text/css';
linkCSS.href = './src/styles.css'; 
head.appendChild(linkCSS);
*/