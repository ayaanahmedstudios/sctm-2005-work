var canvas;
var ctx;
var w = 1000;
var h = 750;
var r1 = {
    x: 0,
    y: 0,
    w: 10,
    h: 10,
    c: 260,
    a: 0.75,
    random: 0,
    change: {x: 30, y: 11, w: 0, h: 0, c: 0, a: 0}
}

var numberPerLine = 50;

setUpCanvas();
for(var i=0; i<140; i++){
    horizontalLineOfShapes(r1, numberPerLine);
    r1.x = 0;
    r1.y += r1.change.y;
    numberPerLine++;

    if(r1.y > h){
        console.log("off the bottom", i);
        break
    }
}


function horizontalLineOfShapes(o, num){
    for(var i=0; i<num; i++){
        rect(o);
        o.x += w/num+1
    }
}


function rect(o){
    // x, y, w, h, c, a, random
    var x = o.x;
    var y = o.y;
    o.x = o.x - o.w/2;
    o.y = o.y - o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x+rand(o.random), o.y+rand(o.random));
    ctx.lineTo(o.x+o.w+rand(o.random), o.y+rand(o.random));
    ctx.lineTo(o.x+o.w+rand(o.random), o.y+o.h+rand(o.random));
    ctx.lineTo(o.x+rand(o.random), o.y+o.h+rand(o.random));
    //ctx.lineTo(x+rand(random), y+rand(random));
    ctx.closePath();
    
        // ctx.strokeStyle = "hsla("+o.c+", 100%, 30%, "+o.a+")";
        // ctx.stroke();

        ctx.fillStyle = "hsla("+o.c+", 100%, 30%, "+o.a+")";
        ctx.fill();
    

    o.x = x;
    o.y = y;
}
function rect_prev(x, y, rw, rh, c, a, random){
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


console.log("module 5");