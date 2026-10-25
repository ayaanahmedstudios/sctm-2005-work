var canvas; 
var ctx; 
var w = 1000; 
var h = 750; 
var colour = [35, 40, 45, 50, 55]; //// based on the array we made in m4, but I changed the colors to be like orange yellowish star colours.

setUpCanvas(); //// makes the canvas

crescent(w/2, h/2, 1, "black", 0); //// using the same variables from my a1
star(); //// makes the big star
stars(); //// makes the small stars

////// function section //////

function crescent(x, y, s, c, random){ //// same function from a1
    ctx.strokeStyle = c;
    
    ctx.beginPath();
    ctx.moveTo(x+rand(random), y-100*s+rand(random));
    ctx.bezierCurveTo( ////Citation 1////
        x+150*s+rand(random), y-50*s+rand(random), 
        x+150*s+rand(random), y+50*s+rand(random), 
        x+rand(random), y+100*s+rand(random));
    ctx.bezierCurveTo(
        x+80*s+rand(random), y+50*s+rand(random), 
        x+80*s+rand(random), y-50*s+rand(random), 
        x+rand(random), y-100*s+rand(random));
    ctx.closePath();
    ctx.stroke();
}

function star() { //// the large 5 sided star function
    ctx.beginPath();
    ctx.moveTo(420, 275); 
    ctx.lineTo(440, 345); 
    ctx.lineTo(520, 355); 
    ctx.lineTo(460, 405); 
    ctx.lineTo(480, 475); 
    ctx.lineTo(420, 425); 
    ctx.lineTo(360, 475); 
    ctx.lineTo(380, 405); 
    ctx.lineTo(320, 355); 
    ctx.lineTo(400, 345); 
    ctx.closePath();
    ctx.fillStyle = "hsla(55, 100%, 50%, 1)"; //// made this star yellow
    ctx.fill();
}

function stars() { //// the smaller 4 sided star function, sort of like a diamond shape
    ctx.beginPath();
    ctx.moveTo(10, 0); 
    ctx.lineTo(15, 5); 
    ctx.lineTo(20, 10); 
    ctx.lineTo(15, 15); 
    ctx.lineTo(10, 20); 
    ctx.lineTo(5, 15); 
    ctx.lineTo(0, 10); 
    ctx.lineTo(5, 5); 
    ctx.closePath();
    ctx.fillStyle = "hsla(55, 100%, 50%, 1)"; /// The colors change based on what's in the color array in the variables section
    ctx.fill();
}

function rand(range){ //// This is the rand function from m5 and m4 too i think
    var result = Math.random()*range;
    return result;
}

function randn(range){ //// same as rand, this is the randn function from m5 and m4
    var r = Math.random()*range-range/2;
    return r;
}

function setUpCanvas(){ //// connects the Javascript to the Html canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

console.log("assignment 2");