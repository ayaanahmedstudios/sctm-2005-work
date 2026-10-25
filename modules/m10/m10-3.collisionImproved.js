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
var c1 = {
    x: rand(w),
    y: rand(h),
    r: 50,
    c: 0,
    a: 0.75
}

setUpCanvas();
animationLoop();

///// function section /////

function animationLoop(){
    clear();
    rect(blue);
    updateProperties_rect(blue);
    toroid(blue);

    rect(red);
    updateProperties_rect(red);
    toroid(red);
    collision_rect(blue, red);
    // if(red.x+red.w/2 > blue.x-blue.w/2);
    // console.log("blue right: "+String(blue.x+blue.w/2), "red left: "+String(red.x-red.w/2));
    requestAnimationFrame(animationLoop);
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

            differenceX = Math.abs(o1.x-o2.x);
            differenceY = Math.abs(o1.y-o2.y);
            if(differenceX < differenceY){
                o1.change.y *= -1;
                o2.change.y *= -1;
            }else{
                o1.change.x *= -1;
                o2.change.x *= -1;
            }

            // o1.change.x *= -1 // o1.change.x = -o1.change.x
            // o2.change.x *= -1
            // o1.change.y *= -1
            // o2.change.y *= -1

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