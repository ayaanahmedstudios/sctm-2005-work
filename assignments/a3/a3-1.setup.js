var canvas;
var ctx;
var w = 1000;
var h = 750;
var colour = [40, 45, 50, 55, 60]; //// stars' colors

var s1 = { //// object for star
    x: w/2,
    y: h/2,
    w: 60,
    h: 60,
    c: 50,
    a: 0.75,
    random: 0
}

setUpCanvas(); //// makes the canvas

star_draw(s1); //// draws the star

////// function section //////

function star_draw(o){ //// the star shape i made in a2
    var x = o.x - o.w/2;
    var y = o.y - o.h/2;
    ctx.beginPath();
    ctx.moveTo(x + o.w * 0.5, y);
    ctx.lineTo(x + o.w * 0.6, y + o.h * 0.35);
    ctx.lineTo(x + o.w, y + o.h * 0.4);
    ctx.lineTo(x + o.w * 0.7, y + o.h * 0.65);
    ctx.lineTo(x + o.w * 0.8, y + o.h);
    ctx.lineTo(x + o.w * 0.5, y + o.h * 0.75);
    ctx.lineTo(x + o.w * 0.2, y + o.h);
    ctx.lineTo(x + o.w * 0.3, y + o.h * 0.65);
    ctx.lineTo(x, y + o.h * 0.4);
    ctx.lineTo(x + o.w * 0.4, y + o.h * 0.35);
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();
}

function rand(range){
    var result = Math.random()*range; //// the rand function we use in many modules
    return result;
}

function randi(range){
    var r = Math.floor(Math.random()*range); //// the randi function we use in many modules
    return r;
}

function randn(range){
    var r = Math.random()*range-range/2; //// the randn function we use in many modules
    return r;
}

function setUpCanvas(){ /// sets up the canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

console.log("assignment 3"); /// as usual
