console.log("start of code", performance.now());

var canvas;
var ctx;
var w = 1000;
var h = 750;

var r1 = {
    x: 25,
    y: 25,
    w: 50,
    h: 50,
    c: 260,
    a: 0.5,
    random: 0,
    change: {x: 56, y: 56}
}
var interval;
var positions = [];

setUpCanvas();

for(var i=0; i<1000; i++){
    // rect(r1)
    var pos = {x: r1.x, y: r1.y};
    positions.push(pos);
    r1.x += r1.change.x;
    if(r1.x > w){
        r1.x = 25;
        r1.y += r1.change.x;
    }else if(r1.y > h+r1.h){
        console.log("off the screen for loop");
        break
        //clearInterval(interval);
    }
}
console.log(positions);
// r1.x = 25;
// r1.y = 25;
// r1.random = 25;

interval = setInterval(function(){

    var randomInteger = randi(positions.length);
    // console.log(randomInteger);
    var randomElement = positions[randomInteger];

    var index = positions.indexOf(randomElement);
    positions.splice(index, 1);
    // console.log(index);

    // console.log(randomElement);
    r1.x = randomElement.x;
    r1.y = randomElement.y;

    rect(r1);
    if(positions.length == 0){
        console.log("empty array");
        clearInterval(interval);
    }
}, 20);

function clear(){
    ctx.clearRect(0, 0, w, h);
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