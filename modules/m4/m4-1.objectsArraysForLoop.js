var canvas;
var ctx;
var w = 1000;
var h = 750;

var colour = ["red", "green", "grey", undefined, true, 1000, rand, {}, [0,5,10]]; /// array literal

colour[2] = "yellow";

colour.push(false);

console.log(colour[8][2]);
colour.pop();

// console.log(colour);

var colour_object = {red: "red", width: 1000, boolean: true, random: rand, name: {first: "steve"}};
colour_object.square = true;
colour_object("circle") = false;

console.log(colour_object, colour_object["width"]);

console["log"]("we can do this")





setUpCanvas();
rect(w/2, h/2, 200, 200, "purple", rand(50));

// console.log(i);
for(var i = 0; i<10; i++){
    // console.log(i);
}
console.log(i);

////// function section ///////

function rect(x, y, rw, rh, c, random){
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

function shapeEx(x, y, s, random){
    ctx.beginPath();
    ctx.moveTo(x+rand(random), y+rand(random));
    ctx.lineTo(x+50*s+rand(random), y+75*s+rand(random));
    ctx.lineTo(x+70*s+rand(random), y+50*s+rand(random));
    ctx.lineTo(x+100*s+rand(random), y+90*s+rand(random));
    ctx.lineTo(x+130*s+rand(random), y+40*s+rand(random));
    ctx.lineTo(x+90*s+rand(random), y+170*s+rand(random));
    ctx.closePath();
    ctx.stroke();
}

function rand(range){
    var result = Math.random()*range;
    return result
}

function setUpCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

console.log("module 4");