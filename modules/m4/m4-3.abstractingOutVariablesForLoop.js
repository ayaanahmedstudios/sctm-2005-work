var canvas;
var ctx;
var w = 1000;
var h = 750;

var colour = [0, 50, 100, 150, 260, 200, 70, 5, 90];
var x = 0;
var changex = 50;
var y = h/2;
var changey = 5;
var rw = 50;
var rh = 100;
var c = 0;
var a = 1;
var random = 0;

setUpCanvas();

console.log(randn(100));

for(var i=0; i<10; i++){
    rect(0+i*100, h/2+i*10, 100-i*5, 100+i*10, colour[randi(colour.length)], 1, i);
    rect(x, y, rw, rh, c, a, random); //absolute value
    x = x + changex;
    y += changey;
    changex += 5;

    rect(rand(w), rand(h), 50, 100, 200, 1, 0);
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

function randi(range){
    var r = Math.floor(Math.random()*range);
    return r
}

function randn(range){
    var r = Math.random()*range-range/2
    return r
}

function setUpCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

console.log("module 4");