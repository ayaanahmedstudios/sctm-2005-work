var canvas;
var ctx;
var w = 1000;
var h = 750;

var r1 = {
    x: w/2,
    y: h/2,
    w: 100,
    h: 100,
    c: 260,
    a: 0.75,
    random: 0,
    distance: 5,
    angle: 10,
}

// var oneDegree = 2*Math.PI/360; /// or Math.PI/180
// console.log(180*oneDegree);


setUpCanvas();
rect_rotate(r1);
// rect(r1);
// animationLoop();


///// function section //////

function animationLoop(){
    clear();
    rect(r1);
    forward(r1);
    r1.angle++;

    requestAnimationFrame(animationLoop);
}

function forward(o){
    var oneDegree = 2*Math.PI/360; /// or Math.PI/180
    var cx = o.distance * Math.cos(o.angle*oneDegree);
    var cy = o.distance * Math.sin(o.angle*oneDegree);

    o.x += cx;
    o.y += cy;
}

function toroid(o){
    if(o.x > w){
        o.x = 0;
    }else if(o.x < 0){
        o.x = w;
    }else if(o.y > h){
        o.y = 0;
    }else if(o.y < 0){
        o.y = h;
    }
}
function bounce(o){
    if(o.x > w || o.x < 0){
        o.change.x *= -1
    }else if(o.y > h || o.y < 0){
        o.change.y *= -1;
    }
}
function clear(){
    ctx.clearRect(0, 0, w, h);
}

function rect_rotate(o){
    var oneDegree = 2*Math.PI/360;
    var x = 0;
    var y = 0;
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.rotate(o.angle*oneDegree); /// rotate canvas

    x = x - o.w/2; /// keeps rotation point to centre of shape instead of corner
    y = y - o.h/2;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x+o.w, y);
    ctx.lineTo(x+o.w, y+o.h);
    ctx.lineTo(x, y+o.h);
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 30%, "+o.a+")";
    ctx.fill();
    ctx.restore(); /// restoring shape after rotation

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

console.log("module 8");