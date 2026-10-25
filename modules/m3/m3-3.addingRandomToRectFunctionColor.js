
// console.log(ctx);
var canvas;
var ctx;
var w = 1000;
var h = 750;

// var x = w/2;
// var y = h/2;
// var rw = 200;
// var rh = 100;

setUpCanvas();
rect(w/2, h/2, 300, 200, "purple", 100);

//ctx.rect()

////// function section //////

function rect(x, y, rw, rh, c, random){
    //var x 
    x = x - rw/2;
    y = y - rh/2;
    ctx.beginPath();
    ctx.moveTo(x+rand(random), y+rand(random));
    ctx.lineTo(x+rw+rand(random), y+rand(random));
    ctx.lineTo(x+rw+rand(random), y+rh+rand(random));
    ctx.lineTo(x+rand(random), y+rh+rand(random));
    //ctx.lineTo(x+rand(random), y+rand(random));
    ctx.closePath();
    
    ctx.strokeStyle = c;
    ctx.stroke();
}


function rand(range){
    var result = Math.random()*range;
    return result
}

function setUpCanvas(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

// console.log(canvas);

console.log("module 3");