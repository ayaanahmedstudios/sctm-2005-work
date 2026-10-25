var canvas;
var ctx;
var w = 1000;
var h = 750;
var colour = [40, 45, 50, 55, 60]; // color array for star colors, same one i used in a2 and a3

setUpCanvas();

////////// function section //////////

function setUpCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

function rand(range){
    var result = Math.random()*range; // same rand from the modules
    return result;
}

function randi(range){
    var r = Math.floor(Math.random()*range); // same randi from the modules
    return r;
}

function randn(range){
    var r = Math.random()*range-range/2; // same randn from the modules
    return r;
}

console.log("assignment 4");
