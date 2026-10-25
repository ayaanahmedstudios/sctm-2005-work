var canvas;
var ctx;
var w = 1000;
var h = 750;

setUpCanvas();

crescent(w/2, h/2, 1, "blue", 50);

////// function section //////

function crescent(x, y, s, c, random){
    ctx.strokeStyle = c;
    ctx.lineWidth = 4;
    
    ctx.beginPath();
    /////// Added +rand(random) to all points /////////
    ctx.moveTo(x+rand(random), y-100*s+rand(random));
    ctx.bezierCurveTo(
        x+150*s+rand(random), y-50*s+rand(random), 
        x+150*s+rand(random), y+50*s+rand(random), 
        x+rand(random), y+100*s+rand(random));
    ctx.bezierCurveTo(
        x+80*s+rand(random), y+50*s+rand(random), 
        x+80*s+rand(random), y-50*s+rand(random), 
        x+rand(random), y-100*s+rand(random));
    ctx.closePath();
    ctx.stroke();
}

function rand(range){
    var result = Math.random()*range - range/2;
    return result;
}

function setUpCanvas(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}