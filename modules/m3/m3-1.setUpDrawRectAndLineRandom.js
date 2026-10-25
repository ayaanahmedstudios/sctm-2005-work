
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 750;
canvas.style.border = "2px solid orange";


ctx.beginPath();
ctx.rect(500, 375, 200, 100);
// ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100*Math.random(), 100*Math.random());
ctx.lineTo(900, 650);
ctx.stroke();

console.log(Math.random());

// console.log(canvas);



console.log("module 3");