var canvas;
var ctx;
var w = 1000;
var h = 750;

setUpCanvas();

////// function section //////

function setUpCanvas(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid grey";
}