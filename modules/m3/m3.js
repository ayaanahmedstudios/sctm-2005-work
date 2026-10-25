
var canvas;
var ctx;
var w = 1000;
var h = 750;

document.getElementById("button").onclick = click

setUpCanvas();

shapeEx(w/2, h/2, 1, 0);

////// function section //////

function shapeEx(x, y, s, random){
    ctx.beginPath();
    ctx.moveTo(x+rand(random), y+rand(random));
    ctx.lineTo(x+50*s+rand(random), y+75*s+rand(random));
    ctx.lineTo(x+70*s+rand(random), y+50*s+rand(random));
    ctx.lineTo(x+100*s+rand(random), y+90*s+rand(random));
    ctx.lineTo(x+130*s+rand(random), y+40*s+rand(random));
    ctx.lineTo(x+90*s+rand(random), y+170*s+rand(random));
    ctx.closePath();
    ctx.stroke();
}

function click(){
    var input1_color = document.getElementById("input1").value;
    var input2_random = document.getElementById("input2").value;

    rect(w/2+Number(input2_random), h/2, 300, 200, input1_color, Number(input2_random));
    console.log("click", w/2+input2_random);
}

function rect(x, y, rw, rh, c, random){
    x = x - rw/2;
    y = y - rh/2;
    ctx.beginPath();
    ctx.moveTo(x+rand(random), y+rand(random));
    ctx.lineTo(x+rw+rand(random), y+rand(random));
    ctx.lineTo(x+rw+rand(random), y+rh+rand(random));
    ctx.lineTo(x+rand(random), y+rh+rand(random));
    //ctx.lineTo(x+rand(random), y+rand(random));
    ctx.closePath();
    
    ctx.strokeStyle = c;
    ctx.stroke();
}


function rand(range){
    var result = Math.random()*range;
    return result
}

function setUpCanvas(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

console.log("module 3");