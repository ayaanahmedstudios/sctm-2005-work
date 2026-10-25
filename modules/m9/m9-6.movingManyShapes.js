var canvas;
var ctx;
var w = 1000;
var h = 750;

var r1 = {
    x: w/2,
    y: h/2,
    w: 100,
    h: 100,
    c: 200,
    a: 0.75,
    random: 0,
    change: {x: 0, y: 0, w: 0, h: 0, c: 0, a: 0, random: 0},
}

var state = {
    click: true
};

var allRects = []; /// this array needs to be here
createData_rect(1, allRects); /// second argument needs to be an array

console.log(allRects);
document.onkeydown = keydown;
document.getElementById("canvas").onclick = click; /// 'click' becomes yellow when function exists

setUpCanvas();
animationLoop();

//// function section /////

function animationLoop(){
    clear();
    for(var i=0; i<allRects.length; i++){
        rect(allRects[i]);
        updateProperties_rect(allRects[i]);
        bounce(allRects[i]);
    }
    
    requestAnimationFrame(animationLoop);
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
            change: {x: randn(10), y: randn(10), w: 0, h: 0, c: 0, a: 0, random: 0},
        })
    }
}

function keydown(event){

    if(event.key == "ArrowUp"){
        event.preventDefault();
        for(var i=0; i<allRects.length; i++){
            allRects[i].change.y += -1;
        }
        console.log("up");
    }else if(event.key == "ArrowDown"){
        event.preventDefault();
        for(var i=0; i<allRects.length; i++){
            allRects[i].change.y += 1;
        }
        console.log("down");
    }else if(event.key == "ArrowLeft"){
       for(var i=0; i<allRects.length; i++){
            allRects[i].change.x += -1;
        }
        console.log("left");
    }else if(event.key == "ArrowRight"){
       for(var i=0; i<allRects.length; i++){
            allRects[i].change.x += 1;
        }
        console.log("right");
    }
    

    // console.log("key pressed", event);

}
function click(){

    createData_rect(2, allRects); /// changing number gives how many rects generated on click

    // if(state.click){
    //     state.click = false;
    // }else{
    //     state.click = true;
    // }

    console.log("click");
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

console.log("module 9");