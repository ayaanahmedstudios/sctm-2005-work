var canvas;
var ctx;
var w = 1000;
var h = 750;

document.getElementById("button").onclick = click;

setUpCanvas();

////// function section //////

function crescent(x, y, s, c, random){
    ctx.strokeStyle = c;
    ctx.lineWidth = 4;
    
    ctx.beginPath();
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

function click(){
    var input1_color = document.getElementById("input1").value;
    var input2_random = document.getElementById("input2").value;
    var input3_size = document.getElementById("input3").value;

    ctx.clearRect(0, 0, w, h);
    crescent(w/2, h/2, Number(input3_size), input1_color, Number(input2_random));
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