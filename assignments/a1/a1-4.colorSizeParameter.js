var canvas;
var ctx;
var w = 1000;
var h = 750;

setUpCanvas();

crescent(w/2, h/2, 2, "red");

////// function section //////

function crescent(x, y, s, c){
    ctx.strokeStyle = c;
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    ctx.moveTo(x, y-100*s);
    ctx.bezierCurveTo(x+150*s, y-50*s, x+150*s, y+50*s, x, y+100*s);
    ctx.bezierCurveTo(x+80*s, y+50*s, x+80*s, y-50*s, x, y-100*s);
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