var canvas;
var ctx;
var w = 1000;
var h = 750;
var colour = [40, 45, 50, 55, 60]; // color array for star colors

var player = {
    x: w/2,
    y: h - 40,
    w: 120,
    h: 20,
    c: 200,
    a: 1,
    change: {x: 0, y: 0, w: 0, h: 0, c: 0, a: 0}
}

var allStars = []; //// switching from one star to an array of stars, same allRects pattern from module 7
var interval;
var fallSpeed = 1.5;

setUpCanvas();

document.onkeydown = keydown;

interval = setInterval(function(){ // spawning a new star every 1200 miliseconds, same setInterval from module 6
    allStars.push(createData_star());
}, 1200);

animationLoop();

////////// function section //////////

function animationLoop(){
    clear();

    updateProperties_rect(player);
    if(player.x - player.w/2 < 0){ player.x = player.w/2; player.change.x = 0; }
    if(player.x + player.w/2 > w){ player.x = w - player.w/2; player.change.x = 0; }
    rect(player);

    for(var i=0; i<allStars.length; i++){ /// looping through all the stars each frame
        starRotate(allStars[i]);
        allStars[i].y += allStars[i].speed;
        allStars[i].angle += allStars[i].change.angle;
        allStars[i].c += allStars[i].change.c;

        if(allStars[i].y > h + 50){ // removing stars that go past the bottom
            allStars.splice(i, 1);
        }
    }

    requestAnimationFrame(animationLoop);
}

function keydown(event){ // adds to change.x to change the movement of the player bar based on keyboard input
    if(event.key == "ArrowLeft"){
        event.preventDefault();
        player.change.x += -5; // each left press adds -5 to the velocity, holding it or pressing it multiple times builds up speed
    } else if(event.key == "ArrowRight"){
        event.preventDefault();
        player.change.x += 5; //// each right press adds 5 to the velocity
    }
}

function createData_star(){ // creates the data for each falling star with random properties
    var size = 15 + rand(40);
    return {
        x: rand(w),
        y: -50,
        w: size,
        h: size,
        c: colour[randi(colour.length)],
        a: 1,
        angle: rand(360),
        speed: fallSpeed + rand(1),
        change: {angle: randn(3), c: randn(0.3)}
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

function starRotate(o){ //// draws the star with rotation from module 8
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
