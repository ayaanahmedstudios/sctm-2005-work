var canvas; 
var ctx; 
var w = 1000; 
var h = 750; 
var colour = [0, 50, 100, 150, 260]; //// the original array of color values that we made in m4 for 'object arrays for colour'

setUpCanvas(); //// makes the canvas


////// function section //////

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