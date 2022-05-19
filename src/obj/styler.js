function addCSS()
{
   canvasCSS();
   bodyCSS();
}

function canvasCSS(){
   var styleCSS  = document.createElement("style");
   //styleCSS.classList.add("canvas2D");
   styleCSS.innerHTML = ".canvas2D{margin:auto;padding:0;position:absolute;background:#00000000;display:block;top:0;left:0;bottom:0;right:0}" +
      ".imgLoading{margin:auto;padding:0;position:absolute;background:#00000000;display:block;top:0;left:0;bottom:0;right:0}";
   document.getElementsByTagName('head')[0].appendChild(styleCSS);
}
function bodyCSS(){
   var styleCSS  = document.createElement("style");
   //styleCSS.classList.add("body");
   styleCSS.innerHTML = "body {" +
   "background-repeat:no-repeat;" +
   "background:radial-gradient(circle farthest-corner at 25% 25%, #80e2ff 0%, #9f00ff 100%);" +
   "overflow:hidden;display:none;}";
    
   document.getElementsByTagName('head')[0].appendChild(styleCSS);
}

export {addCSS, canvasCSS, bodyCSS};