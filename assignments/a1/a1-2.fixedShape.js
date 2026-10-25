var canvas;
var ctx;
var w = 1000;
var h = 750;

setUpCanvas();

ctx.beginPath();
ctx.moveTo(500, 200); 
ctx.bezierCurveTo(700, 250, 700, 550, 500, 600); 
ctx.bezierCurveTo(550, 550, 550, 250, 500, 200);
ctx.stroke();

////// function section //////

function setUpCanvas(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}