var canvas;
var ctx;
var w = 1000;
var h = 750;

setUpCanvas();

crescent(w/2, h/2);

////// function section //////

function crescent(x, y){
    ctx.beginPath();
    ctx.moveTo(x, y-100);
    ctx.bezierCurveTo(x+150, y-50, x+150, y+50, x, y+100);
    ctx.bezierCurveTo(x+80, y+50, x+80, y-50, x, y-100);
    ctx.closePath();
    ctx.stroke();
}

function setUpCanvas(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}