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

export {drawText};