var canvas; 
var ctx; 
var w = 1000; 
var h = 750; 
var colour = [0, 50, 100, 150, 260]; //// the original array of color values that we made in m4 for 'object arrays for colour'

setUpCanvas(); //// makes the canvas

crescent(w/2, h/2, 1, "black", 0); //// using the same variables from my a1


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