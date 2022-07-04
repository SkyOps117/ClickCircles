// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/mod/Stats.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @author mrdoob / http://mrdoob.com/
 */
var Stats = function Stats() {
  var mode = 0;
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
  container.addEventListener('click', function (event) {
    event.preventDefault();
    showPanel(++mode % container.children.length);
  }, false); //

  function addPanel(panel) {
    container.appendChild(panel.dom);
    return panel;
  }

  function showPanel(id) {
    for (var i = 0; i < container.children.length; i++) {
      container.children[i].style.display = i === id ? 'block' : 'none';
    }

    mode = id;
  } //


  var beginTime = (performance || Date).now(),
      prevTime = beginTime,
      frames = 0;
  var fpsPanel = addPanel(new Stats.Panel('FPS', '#0ff', '#002'));
  var msPanel = addPanel(new Stats.Panel('MS', '#0f0', '#020'));

  if (self.performance && self.performance.memory) {
    var memPanel = addPanel(new Stats.Panel('MB', '#f08', '#201'));
  }

  showPanel(0);
  return {
    REVISION: 16,
    dom: container,
    addPanel: addPanel,
    showPanel: showPanel,
    begin: function begin() {
      beginTime = (performance || Date).now();
    },
    end: function end() {
      frames++;
      var time = (performance || Date).now();
      msPanel.update(time - beginTime, 200);

      if (time >= prevTime + 1000) {
        fpsPanel.update(frames * 1000 / (time - prevTime), 100);
        prevTime = time;
        frames = 0;

        if (memPanel) {
          var memory = performance.memory;
          memPanel.update(memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576);
        }
      }

      return time;
    },
    update: function update() {
      beginTime = this.end();
    },
    // Backwards Compatibility
    domElement: container,
    setMode: showPanel
  };
};

exports.default = Stats;

Stats.Panel = function (name, fg, bg) {
  var min = Infinity,
      max = 0,
      round = Math.round;
  var PR = round(window.devicePixelRatio || 1);
  var WIDTH = 80 * PR,
      HEIGHT = 48 * PR,
      TEXT_X = 3 * PR,
      TEXT_Y = 2 * PR,
      GRAPH_X = 3 * PR,
      GRAPH_Y = 15 * PR,
      GRAPH_WIDTH = 74 * PR,
      GRAPH_HEIGHT = 30 * PR;
  var canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvas.style.cssText = 'width:80px;height:48px';
  var context = canvas.getContext('2d');
  context.font = 'bold ' + 9 * PR + 'px Helvetica,Arial,sans-serif';
  context.textBaseline = 'top';
  context.fillStyle = bg;
  context.fillRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = fg;
  context.fillText(name, TEXT_X, TEXT_Y);
  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
  context.fillStyle = bg;
  context.globalAlpha = 0.9;
  context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
  return {
    dom: canvas,
    update: function update(value, maxValue) {
      min = Math.min(min, value);
      max = Math.max(max, value);
      context.fillStyle = bg;
      context.globalAlpha = 1;
      context.fillRect(0, 0, WIDTH, GRAPH_Y);
      context.fillStyle = fg;
      context.fillText(round(value) + ' ' + name + ' (' + round(min) + '-' + round(max) + ')', TEXT_X, TEXT_Y);
      context.drawImage(canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT);
      context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT);
      context.fillStyle = bg;
      context.globalAlpha = 0.9;
      context.fillRect(GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round((1 - value / maxValue) * GRAPH_HEIGHT));
    }
  };
};
},{}],"src/obj/styler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCSS = addCSS;
exports.bodyCSS = bodyCSS;
exports.canvasCSS = canvasCSS;

function addCSS() {
  canvasCSS();
  bodyCSS();
}

function canvasCSS() {
  var styleCSS = document.createElement("style"); //styleCSS.classList.add("canvas2D");

  styleCSS.innerHTML = ".canvas2D{margin:auto;padding:0;position:absolute;background:#00000000;display:block;top:0;left:0;bottom:0;right:0}" + ".imgLoading{margin:auto;padding:0;position:absolute;background:#00000000;display:block;top:0;left:0;bottom:0;right:0}";
  document.getElementsByTagName('head')[0].appendChild(styleCSS);
}

function bodyCSS() {
  var styleCSS = document.createElement("style"); //styleCSS.classList.add("body");

  styleCSS.innerHTML = "body {" + "background-repeat:no-repeat;" + "background:radial-gradient(circle farthest-corner at 25% 25%, #80e2ff 0%, #9f00ff 100%);" + "overflow:hidden;display:none;}";
  document.getElementsByTagName('head')[0].appendChild(styleCSS);
}
},{}],"src/run.js":[function(require,module,exports) {
"use strict";

var _Stats = _interopRequireDefault(require("./mod/Stats.js"));

var Styler = _interopRequireWildcard(require("./obj/styler.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* * * * * * * * * * * * * * * * * * * * * * * * * * */

/*                - Click Circles -                  */

/*  A canvas based game using pure javascript only.  */

/*  The goal is to click animated circles around.    */

/*                                                   */

/*             ~ Author: BunnyHopsIn ~               */

/* * * * * * * * * * * * * * * * * * * * * * * * * * */
//import { imgLinks } from "./obj/links.js";
var fpsMeter = new _Stats.default();
fpsMeter.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

Styler.addCSS(); //Variables settings

var curOpenURL = "url('./assets/D2R-open.png') 5 10, auto";
var curPointURL = "url('./assets/D2R-point.png') 5 10, auto";
var aspectRatioX = 16;
var aspectRatioY = 9; //Body styling

var body = document.getElementsByTagName("body")[0];
body.style.margin = "auto";
body.style.padding = 0; //body.style.overflow = "hidden";
//body.style.background = "#a1a1a1";

body.style.cursor = curOpenURL; //Add script for styling with css

var stylerJS = document.createElement('script');
stylerJS.setAttribute("type", "module");
stylerJS.setAttribute("src", "./src/obj/styler.js");
body.appendChild(stylerJS); //Landscape image styling

var landscape = document.createElement("img");
landscape.setAttribute("src", randImgURL("space,galaxy", window.innerWidth, window.innerHeight));
landscape.setAttribute("alt", "LoadingSVG");
landscape.style.position = "absolute";
landscape.style.display = "block";
landscape.style.zIndex = "-1";
landscape.style.top = "0%";
landscape.style.left = "0%";
landscape.style.width = "100%";
landscape.style.height = "100%"; //landscape.style.tabSize = -1;
//landscape.style.background = "url("+randImgURL("space,galaxy", window.innerWidth, window.innerHeight)+")";

body.appendChild(landscape); //Canvas styling

var canvas = document.createElement("canvas");
canvas.setAttribute("class", "canvas2D"); //canvas.style.boxShadow = "0px 0px 100px 100px #000000ff";
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
coutput.style.boxShadow = "0px 0px 2px 2px #11111188"; //coutput.style.pointerEvents = "none";

coutput.style.display = "block";
coutput.style.zIndex = 99999;
body.appendChild(coutput); //Event listeners

document.addEventListener("DOMContentLoaded", pageLoad);
body.setAttribute("onload", onLoad); //body.addEventListener("onload", onLoad);

body.addEventListener("unload", unLoad);
window.addEventListener("resize", resize);
body.addEventListener("mouseenter", mouseEnter);
body.addEventListener("mouseleave", mouseLeave);
window.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mouseup", mouseUp); //Disable right click

window.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});
/* * * * * * * * */

/* ~ Functions ~ */

/* * * * * * * * */
//Everything is loaded, never saw it trigger.

function onLoad(event) {
  console.log("Everything is loaded now.");
} //Page load or refresh.


function pageLoad(event) {
  body.style.display = "block";
  console.log("Page loaded.");
} //Resize canvas


function resize() {
  var zoom = window.devicePixelRatio;
  var newWidth = window.innerHeight * (aspectRatioX / aspectRatioY);
  var newHeight = window.innerWidth * (aspectRatioY / aspectRatioX);
  var ratio = newHeight / newWidth;
  canvas.height = newHeight;
  canvas.width = newWidth;
  canvas.style.height = newHeight + "px";
  canvas.style.width = newWidth + "px";
  var shadowSize = 1;
  if (canvas.height <= window.innerHeight) shadowSize = (window.innerHeight - canvas.height) / 2;else shadowSize = (window.innerWidth - canvas.width) / 2;
  canvas.style.boxShadow = "0px 0px " + shadowSize + "px " + shadowSize / 4 + "px #ade8f47f"; //canvas.style.boxShadow = "0px 0px " + (window.innerWidth-canvas.width)/2 + "px " + (window.innerHeight-canvas.height)/2 + "px #f5cb5bff";
  //canvas.style.transform = "translate(0, 25%)";

  /*canvas.style.top = 0;
  canvas.style.left = 0;*/
}

resize(); //When closing

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
  window.removeEventListener('contextmenu', function (event) {
    event.preventDefault();
  });
  clearInterval(intervalID);
  console.log("Unloaded. Cya!");
} //Start update loop


var intervalID = setInterval(update, 1000 / 144); //Update loop definition

function update() {
  fpsMeter.begin(); //window.devicePixelRatio; //CHeck this for zoom

  draw();
  fpsMeter.end();
} //Draw loop


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawText("(" + mouseX + ";" + mouseY + ")", mouseX, mouseY);
  drawText("(" + mouseDeltaX + ";" + mouseDeltaY + ")", mouseX, mouseY - 20);
}

var mouseX = 0;
var mouseY = 0;
var mouseDeltaX = 0;
var mouseDeltaY = 0; //Mouse is moving

function mouseMove(event) {
  mouseX = event.clientX - canvas.offsetLeft;
  mouseY = event.clientY - canvas.offsetTop;
  mouseDeltaX = event.movementX;
  mouseDeltaY = event.movementY; //coord.x = event.clientX - canvas.offsetLeft;
  //coord.y = event.clientY - canvas.offsetTop;
  //coutput.innerText = "(" + event.pageX + ";" + event.pageY + ")";
  //coutput.style.left = event.pageX + "px"
  //coutput.style.top = event.pageY + "px"
  //console.log(event.pageX + ";" + event.pageY);
} //Mouse click pressed


function mouseDown(event) {
  body.style.cursor = curPointURL;
  body.style.backgroundImage = "url(" + randImgURL("space,galaxy", window.innerWidth, window.innerHeight) + ")";
} //Mouse click released


function mouseUp(event) {
  //https://imgur.com/vllSGoU
  body.style.cursor = curOpenURL;
}

function mouseEnter(event) {
  console.log("MouseEnter");
}

function mouseLeave(event) {
  console.log("MouseLeave");
}

function drawText(text, x, y) {
  var gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
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

function genGradient(x1, y1, x2, y2) {
  var gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
  gradient.addColorStop("0", "cyan");
  gradient.addColorStop("0.5", "#ffffcb");
  gradient.addColorStop("1.0", "red");
  return gradient;
}

function randImg(words, width, height) {
  var fullUrl = randImgURL(words, width, height);
  var imgElement = document.createElement("img");
  imgElement.setAttribute("src", fullUrl);
  return imgElement;
}

function randImgURL(words, width, height) {
  var fullUrl;
  var randomUrl = "https://source.unsplash.com/random/";
  var sizeUrl = String(width) + "x" + String(height);
  var wordsUrl = "/?" + words;
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
},{"./mod/Stats.js":"src/mod/Stats.js","./obj/styler.js":"src/obj/styler.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46277" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/run.js"], null)
//# sourceMappingURL=/run.35acff9f.js.map