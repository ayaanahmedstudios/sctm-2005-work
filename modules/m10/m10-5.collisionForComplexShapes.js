var canvas;
var ctx;
var w = 1000;
var h = 750;
var blue = {
    x: rand(w),
    y: rand(h),
    w: 100,
    h: 100,
    c: 200,
    a: 0.75,
    random: 0,
    change: {x: randn(20), y: randn(20), w: 0, h: 0, c: 0, a: 0, random: 0},
}
var red = {
    x: rand(w),
    y: rand(h),
    w: 100,
    h: 100,
    c: 0,
    a: 0.75,
    random: 0,
    change: {x: randn(20), y: randn(20), w: 0, h: 0, c: 0, a: 0, random: 0},
}
var cblue = {
    x: rand(w),
    y: rand(h),
    r: 50,
    c: 200,
    a: 0.75,
    change: {x: randn(20), y: randn(20), r: 0, h: 0, c: 0, a: 0},
}
var cred = {
    x: rand(w),
    y: rand(h),
    r: 50,
    c: 0,
    a: 0.75,
    change: {x: randn(20), y: randn(20), r: 0, h: 0, c: 0, a: 0},
}
var sq = {
    x: w/2,
    y: h/2,
    r: 30,
    random: 120,
    num: 10,
    c: 260,
    a: 0.75,
    change: {x: randn(10), y: randn(10), random: 0, num: 0, c: 0, a: 0},
}

setUpCanvas();
animationLoop();

///// function section /////

function animationLoop(){
    clear();
    squiggly(sq);
    // circle(sq);


    updateProperties_squiggly(sq);
    toroid(sq);
    circle(cblue);
    updateProperties_circle(cblue);
    toroid(cblue);

    collision_circle(cblue, sq);

    requestAnimationFrame(animationLoop);
}

function updateProperties_squiggly(o){
    o.x += o.change.x;
    o.y += o.change.y;
    o.random += o.change.random;
    o.num += o.change.num;
    o.c += o.change.c;
    o.a += o.change.a;
}


function updateProperties_circle(o){
    o.x += o.change.x;
    o.y += o.change.y;
    o.r += o.change.r;
    o.c += o.change.c;
    o.a += o.change.a;
}

function collision_circle(o1, o2){
    var dx = Math.abs(o1.x-o2.x);
    var dy = Math.abs(o1.y-o2.y);
    var hdif = Math.sqrt(dx*dx+dy*dy)
    
    if(hdif < o1.r+o2.r){
        if(dx < dy){
            o1.change.y *= -1;
            o2.change.y *= -1;
        }else{
            o1.change.x *= -1;
            o2.change.x *= -1;
        }
        console.log("collision");
    }

    /// if the distance between the centres > sum of their radii
}

function collision_rect(o1, o2){
    // detection
    var differenceX;
    var differenceY;
    // console.log(differenceX, differenceY);
    if(
        o1.x+o1.w/2 > o2.x-o2.w/2 /// right o1 > left o2
        && o1.x-o1.w/2 < o2.x+o2.w/2 // left o1 < right o2
        && o1.y+o1.h/2 > o2.y-o2.h/2 //bottom o1 > top o2
        && o1.y-o1.h/2 < o2.y+o2.h/2 //top o1 < bottom o2
    ){ /// response

            // o1.w+=10; /// changes properties when collided (this one changes width)

            differenceX = Math.abs(o1.x-o2.x);
            differenceY = Math.abs(o1.y-o2.y);
            if(differenceX < differenceY){
                o1.change.y *= -1;
                o2.change.y *= -1;
            }else{
                o1.change.x *= -1;
                o2.change.x *= -1;
            }

        console.log("collision...");
    }
}
function collision_rect_stop(o1, o2){
    if(
        o1.x+o1.w/2 > o2.x-o2.w/2 /// right o1 > left o2
        && o1.x-o1.w/2 < o2.x+o2.w/2 // left o1 < right o2
        && o1.y+o1.h/2 > o2.y-o2.h/2 //bottom o1 > top o2
        && o1.y-o1.h/2 < o2.y+o2.h/2 //top o1 < bottom o2
    ){
        stop(o1);
        stop(o2);
        // o1.c = rand(360);
        console.log("collision...");
    }
}
function stop(o1, o2){
    o1.change.x = 0;
    o1.change.y = 0;
    // o2.change.x = 0;
    // o2.change.y = 0;
}

function squiggly(o){
    // o.x = o.x - o.random/2;
    // o.y = o.y - o.random/2;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    for(var i=0; i<o.num; i++){
    ctx.quadraticCurveTo(o.x+randn(o.random), o.y+randn(o.random), o.x+randn(o.random), o.y+randn(o.random));}
    ctx.strokeStyle = "hsla("+o.c+", 100%, 30%, "+o.a+")";
    ctx.stroke();
    // o.x = o.x + o.random/2;
    // o.y = o.y + o.random/2;
}

function circle(o){
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, 2*Math.PI); /// removing 2* makes it a semicircle
    ctx.fillStyle = "hsla("+o.c+", 100%, 30%, "+o.a+")";
    ctx.fill();
}
function createData_rect(num, array){

    for(var i=0; i<num; i++){
        array.push({
            x: w/2,
            y: h/2,
            w: 100,
            h: 100,
            c: 200,
            a: 0.75,
            random: 0,
            change: {x: 0, y: 0, w: 0, h: 0, c: 0, a: 0, random: 0},
        })
    }
}
function updateProperties_rect(o){
    o.x += o.change.x;
    o.y += o.change.y;
    o.w += o.change.w;
    o.h += o.change.h;
    o.c += o.change.c;
    o.a += o.change.a;
    o.random += o.change.random;
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
function rect(o){
    // x, y, w, h, c, a, random
    var x = o.x;
    var y = o.y;
    o.x = o.x - o.w/2;
    o.y = o.y - o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x+randn(o.random), o.y+randn(o.random));
    ctx.lineTo(o.x+o.w+randn(o.random), o.y+randn(o.random));
    ctx.lineTo(o.x+o.w+randn(o.random), o.y+o.h+randn(o.random));
    ctx.lineTo(o.x+randn(o.random), o.y+o.h+randn(o.random));
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


console.log("module 10");