var canvas;
var ctx;
var w = 1000;
var h = 750;

var colour = [0, 50, 100, 150, 260];


setUpCanvas();

for(var i=0; i<1000; i++){
    rect(0+i*100, h/2, 100, 100, colour[i%colour.length], 1, 0);
    // console.log(i%6);
}



////// function section ///////

function rect(x, y, rw, rh, c, a, random){
    x = x - rw/2;
    y = y - rh/2;
    ctx.beginPath();
    ctx.moveTo(x+rand(random), y+rand(random));
    ctx.lineTo(x+rw+rand(random), y+rand(random));
    ctx.lineTo(x+rw+rand(random), y+rh+rand(random));
    ctx.lineTo(x+rand(random), y+rh+rand(random));
    //ctx.lineTo(x+rand(random), y+rand(random));
    ctx.closePath();
    
    ctx.strokeStyle = "hsla("+c+", 100%, 30%, "+a+")";
    ctx.stroke();
}

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

function rand(range){
    var result = Math.random()*range;
    return result
}

function setUpCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

console.log("module 4");