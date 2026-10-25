var canvas;
var ctx;
var w = 1000;
var h = 750;
var colour = [40, 45, 50, 55, 60]; // color array for star colors

var s1 = {
    x: w/2,
    y: 0,
    w: 60,
    h: 60,
    c: 50,
    a: 1,
    angle: 0,
    speed: 2,
    change: {angle: randn(3)}
}

var player = {
    x: w/2,
    y: h - 40,
    w: 120,
    h: 20,
    c: 200,
    a: 1,
    change: {x: 0, y: 0, w: 0, h: 0, c: 0, a: 0}
}

setUpCanvas();

document.onkeydown = keydown; // adding the keyboard input from module 9

animationLoop();

////////// function section //////////

function animationLoop(){
    clear();
    starRotate(s1);
    s1.y += s1.speed;
    s1.angle += s1.change.angle;
    updateProperties_rect(player);
    rect(player);
    requestAnimationFrame(animationLoop);
}

function keydown(event){ // this moves the player bar directly when a key is pressed, same onkeydown from module 9
    if(event.key == "ArrowLeft"){
        event.preventDefault();
        player.x += -10; // i just moved the x directly here but it feels a bit clunky, will fix later
    } else if(event.key == "ArrowRight"){
        event.preventDefault();
        player.x += 10;
    }
}

function updateProperties_rect(o){ // updates the properties of the rectangle
    o.x += o.change.x;
    o.y += o.change.y;
    o.w += o.change.w;
    o.h += o.change.h;
    o.c += o.change.c;
    o.a += o.change.a;
}

function rect(o){ // draws the player bar
    ctx.beginPath();
    ctx.moveTo(o.x - o.w/2, o.y - o.h/2);
    ctx.lineTo(o.x + o.w/2, o.y - o.h/2);
    ctx.lineTo(o.x + o.w/2, o.y + o.h/2);
    ctx.lineTo(o.x - o.w/2, o.y + o.h/2);
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 60%, "+o.a+")";
    ctx.fill();
}

function starRotate(o){ //// draws the star with rotation
    var oneDegree = 2*Math.PI/360;
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.rotate(o.angle*oneDegree);
    var x = 0 - o.w/2;
    var y = 0 - o.h/2;
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
    ctx.restore();
}

function clear(){
    ctx.clearRect(0, 0, w, h);
}

function setUpCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

function rand(range){
    var result = Math.random()*range;
    return result;
}

function randi(range){
    var r = Math.floor(Math.random()*range);
    return r;
}

function randn(range){
    var r = Math.random()*range-range/2;
    return r;
}

console.log("assignment 4");
