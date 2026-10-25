var canvas;
var ctx;
var w = 1000;
var h = 750;
var colour = [40, 45, 50, 55, 60]; //// stars' colors

var allStars = [];
var interval; //// setInterval variable

var s1 = { ////  object for star
    x: rand(w),
    y: rand(h),
    w: 60,
    h: 60,
    c: 50,
    a: 0.75,
    random: 0,
    change: {x: randn(5), y: randn(5), w: 0, h: 0, c: 0, a: 0, random: 0, angle: 0}
}

setUpCanvas(); //// makes the canvas

interval = setInterval(function(){
    allStars.push(star()); //// push adds the stars to allStars like in m7
    if(allStars.length >= 50){ //// sets the maximum amount of stars to 50 and then stops it
        clearInterval(interval); //// stops the interval
    }
}, 200); //// Runs every 200 miliseconds and adds one new star to the array each time, it's liek the setInterval from module 6

animationLoop(); /// calls the animation loop function

////// function section //////

function animationLoop(){
    clear(); //// clears the canvas

    for(var i=0; i<allStars.length; i++){
        star_draw(allStars[i]);
        updateProperties(allStars[i]); //// applies the update properties function to the stars.
        bounce(allStars[i]); //// the smaller stars bounce instead of 'toroiding' through the sides.
    }

    requestAnimationFrame(animationLoop);
}

function star(){ //// makes the stars with random properties
    var size = 20 + rand(45); //// the stars come in different sizes, in this case between 20 to 65
    return {
        x: rand(w), //// random position
        y: rand(h), //// random position
        w: size,
        h: size,
        c: colour[randi(colour.length)], //// picks a random color from the colour array in the begining of the Js.
        a: 0.75,
        random: 0,
        angle: rand(360), //// sets rotation angle randomly
        change: {x: randn(5), y: randn(5), w: 0, h: 0, c: randn(0.3), a: 0, random: 0, angle: randn(3)}
    }
}

function star_draw(o){ //// the star shape i made in a2, just drawing it flat for now
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

function updateProperties(o){ //// changes the position, size, color, opacity and angle
    o.x += o.change.x;
    o.y += o.change.y;
    o.w += o.change.w;
    o.h += o.change.h;
    o.c += o.change.c;
    o.a += o.change.a;
    o.random += o.change.random;
    o.angle += o.change.angle;
}

function bounce(o){ //// bounce from moduel 7 for smaller stars to bounce off the walls of the canvas
    if(o.x > w || o.x < 0){
        o.change.x *= -1;
    } else if(o.y > h || o.y < 0){
        o.change.y *= -1;
    }
}

function clear(){
    ctx.clearRect(0, 0, w, h);
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
