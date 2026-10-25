
var canvas;
var ctx;

setUpCanvas();

ctx.beginPath();
ctx.rect(500, 375, 200, 100);
// ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100*Math.random(), 100*Math.random());
ctx.lineTo(900, 650);
ctx.stroke();

console.log(rand(3));

function rand(range){
    var result = Math.random()*range;
    return result
}


function setUpCanvas(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = 1000;
    canvas.height = 750;
    canvas.style.border = "2px solid orange";
}

// console.log(canvas);



console.log("module 3");