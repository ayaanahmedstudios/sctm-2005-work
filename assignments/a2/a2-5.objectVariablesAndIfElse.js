var canvas; 
var ctx; 
var w = 1000; 
var h = 750; 
var colour = [35, 40, 45, 50, 55]; //// based on the array we made in m4, but I changed the colors to be like orange yellowish star colours.

var m1 = { //// object with variables for the moon (same one as a1), I changed the variables from a1 to these.
    x: 550, //// in a1 this was w/2, I changed it to 650 to be closer to the star and beside it but not actually in the centre
    y: h/2, //// I kept this one the same as a1 because the up/down centering didn't need changing.
    w: 350, //// in a1 the width was based on the s variable, I made it 350 because it was a nice size that was larger than the star next to it like typical moon + star depictions.
    h: 200, //// this doesn't really change anything for the moon but im keeping it here to just match the object variables we've been using in exercises.
    c: 0, //// same with this, the fillStyle adds the colour in the function so this is just here like that.
    a: 1, //// This just keeps it completely visible
    random: 0 
}

var s1 = { //// object with variables for the big star
    x: 420, //// This positions it within the arc shape of the moon, like how a star is usually drawn on flags of turkey and pakistan and stuff.
    y: h/2, //// just to keep it on the same height level as the moon
    w: 200, //// I made it 200 so it's a bit smaller than the moon, creating a nice proportion
    h: 200, //// kept the height the same as the width to keep the star proportional
    c: 55, //// I set the hue to 55 to make it a bright yellow color
    a: 1, //// fully opaque so it stands out in the foreground
    random: 0 
}

var p1 = { //// object for smaller stars making up the background pattern, named p1 after 'pattern'
    x: 0, //// all of these are mostly similar to the r1 object in the m5 exercise
    y: 0,
    w: 20,
    h: 20, 
    c: 0,
    a: 1,
    random: 0, 
    change: {x: 30, y: 30, w: 0, h: 0, c: 0, a: 0} //// this is basically just from the m5 exercise
}

setUpCanvas(); //// makes the canvas

stars(p1);
p1.x += p1.change.x; //// same as m5
if(p1.x > w){ //// the if/else we made in m5 to have the pattern go onto the next line like a word wrap
    p1.x = 0;
    p1.y += p1.change.y;
}

moon(m1); //// changed the name of crescent to moon, and connected it to object m1 than the old a1 variables
star(s1); //// makes the big star

////// function section //////

function moon(o){ //// the moon shape from my a1
    var x = o.x;
    var y = o.y;
    var s = o.w / 200; //// I used 200 here because that's what my function calculated in a1 with y-100*s to y + 100*s making the numbers between them 200
    ctx.beginPath();
    ctx.moveTo(o.x, o.y-100*s); 
    ctx.bezierCurveTo( //// Citation 1, same as a1 because we didn't use bieziercurve in class yet.
        o.x+150*s, o.y-50*s, 
        o.x+150*s, o.y+50*s, 
        o.x, o.y+100*s);
    ctx.bezierCurveTo(
        o.x+80*s, o.y+50*s, 
        o.x+80*s, o.y-50*s, 
        o.x, o.y-100*s);
    ctx.closePath();
    ctx.fillStyle = "hsla(0, 0%, 50%, "+o.a+")"; //// I made the moon grey
    ctx.fill();
    o.x = x;
    o.y = y;
}

function star(o) { //// the large 5 sided star function, I made it first with coordinates then reduced it to the variables
    var x = o.x;
    var y = o.y;
    o.x = o.x - o.w/2; //// mostly just followed the rect function from m5
    o.y = o.y - o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x + o.w * 0.5, o.y);
    ctx.lineTo(o.x + o.w * 0.6, o.y + o.h * 0.35); 
    ctx.lineTo(o.x + o.w, o.y + o.h * 0.4); 
    ctx.lineTo(o.x + o.w * 0.7, o.y + o.h * 0.65); 
    ctx.lineTo(o.x + o.w * 0.8, o.y + o.h); 
    ctx.lineTo(o.x + o.w * 0.5, o.y + o.h * 0.75); 
    ctx.lineTo(o.x + o.w * 0.2, o.y + o.h); 
    ctx.lineTo(o.x + o.w * 0.3, o.y + o.h * 0.65); 
    ctx.lineTo(o.x, o.y + o.h * 0.4); 
    ctx.lineTo(o.x + o.w * 0.4, o.y + o.h * 0.35); 
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")"; //// made this star yellow, the same color does repeat in the small stars pattern too
    ctx.fill();
    o.x = x;
    o.y = y;
}

function stars(o) { //// the smaller 4 sided star function, sort of like a diamond shape
    var x = o.x; //// same as rect m5
    var y = o.y;
    o.x = o.x - o.w/2;
    o.y = o.y - o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x + o.w/2, o.y); 
    ctx.lineTo(o.x + o.w/2 + 5, o.y + o.h/2 - 5); 
    ctx.lineTo(o.x + o.w, o.y + o.h/2); 
    ctx.lineTo(o.x + o.w/2 + 5, o.y + o.h/2 + 5); 
    ctx.lineTo(o.x + o.w/2, o.y + o.h); 
    ctx.lineTo(o.x + o.w/2 - 5, o.y + o.h/2 + 5); 
    ctx.lineTo(o.x, o.y + o.h/2); 
    ctx.lineTo(o.x + o.w/2 - 5, o.y + o.h/2 - 5); 
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")"; /// The colors change based on what's in the color array in the variables section
    ctx.fill();
    o.x = x;
    o.y = y;
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