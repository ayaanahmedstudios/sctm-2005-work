var canvas;
var ctx;
var w = 1000;
var h = 750;
var colour = [40, 45, 50, 55, 60]; // color array for star colors

var player = {
    x: w/2,
    y: h - 40,
    w: 120,
    h: 20,
    c: 200,
    a: 1,
    change: {x: 0, y: 0, w: 0, h: 0, c: 0, a: 0}
}

var allStars = []; //// array that holds all the star objects which are falling towards the player during the game.
var interval; // holds setInterval so that it can then be stopped by clearInterval when the game ends.
var timerInterval; /// holds the setInterval so that clearInterval can stop the countdown timer when the game ends.
var score = 0; //// holds how many points the player has earned
var timer = counter(-1, 30);
var gameOver = false; /// when this variable turns from false to true the animation loop stops drawing stars and shows the game over screen.
var started = false; // defines when the game has started, which prevents the game from doing so when the title screen and instruction page are on screen.
var instructions = false; //// defines when the instructions screen is shown, it turns from false to true when the first mouseclick is made.
var fallSpeed = 1.5; // slowed back down from the previous test, 1.5 feels like a better starting speed

setUpCanvas();

document.getElementById("canvas").onclick = click; //// this is the first interactive part from the player, the mouse clicks which control the different screens and actually starting the game
document.onkeydown = keydown;

animationLoop();

////////// function section //////////

function animationLoop(){
    clear();

    if(!started && !instructions){ //// IF the game hasn't started AND the instructions screen isn't showing yet, show the START SCREEN
        startScreen();
        requestAnimationFrame(animationLoop);
        return;
    }

    if(instructions && !started){ /// IF the instructions screen is showing, show the INSTRUCTIONS SCREEN until the player clicks
        instructionsScreen();
        requestAnimationFrame(animationLoop);
        return;
    }

    ctx.beginPath();
    ctx.font = "40px monospace"; // still using monospace here, will change the font later
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 20, 55);
    ctx.textAlign = "right";
    ctx.fillText("Time: " + timer.getCurrentCount(), w - 20, 55);
    ctx.textAlign = "left";

    if(gameOver){
        ctx.font = "40px monospace";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", 370, h/2);
        ctx.fillText("Final Score: " + score, 310, h/2 + 60);
        requestAnimationFrame(animationLoop);
        return;
    }

    updateProperties_rect(player);
    if(player.x - player.w/2 < 0){ player.x = player.w/2; player.change.x = 0; }
    if(player.x + player.w/2 > w){ player.x = w - player.w/2; player.change.x = 0; }
    rect(player);

    for(var i=0; i<allStars.length; i++){
        starRotate(allStars[i]);
        allStars[i].y += allStars[i].speed;
        allStars[i].angle += allStars[i].change.angle;
        allStars[i].c += allStars[i].change.c;

        if(allStars[i].y > h + 50){
            allStars.splice(i, 1);
        } else if(
            player.x + player.w/2 > allStars[i].x - allStars[i].w/2
            && player.x - player.w/2 < allStars[i].x + allStars[i].w/2
            && player.y + player.h/2 > allStars[i].y - allStars[i].h/2
            && player.y - player.h/2 < allStars[i].y + allStars[i].h/2
        ){
            score++;
            allStars.splice(i, 1);
        }
    }

    requestAnimationFrame(animationLoop);
}

function startScreen(){ // this function draws the title screen, i wanted it because it made it feel more like a game
    ctx.beginPath();
    ctx.font = "60px monospace";
    ctx.fillStyle = "white";
    ctx.fillText("STAR CATCHER", 200, h/2);
    ctx.font = "30px monospace";
    ctx.fillText("Click to Continue", 300, h/2 + 70);
}

function instructionsScreen(){ // draws the instruction screen, I felt like I needed to include this because the game can be a tad hard to get instantly.
    ctx.beginPath();
    ctx.font = "40px monospace";
    ctx.fillStyle = "white";
    ctx.fillText("How To Play", 330, 100);
    ctx.font = "30px monospace";
    ctx.fillText("/ < > Keys To Move Bar", 230, 200);
    ctx.fillText("/ Opposite Key To Slow Down", 230, 250);
    ctx.fillText("/ Catch Stars For Points", 230, 300);
    ctx.fillText("Click To Play", 350, 500);
}

function click(event){ /// checks the mouse click events
    if(!started && !instructions){
        instructions = true;
    } else if(instructions && !started){ //// second click starts the game for the first time
        started = true;
        interval = setInterval(function(){
            if(!gameOver){
                allStars.push(createData_star());
            }
        }, 1200);
        timerInterval = setInterval(function(){
            if(!gameOver){
                timer.increment();
                if(timer.getCurrentCount() <= 0){
                    gameOver = true;
                    clearInterval(interval);
                    clearInterval(timerInterval);
                }
            }
        }, 1000);
    }
}

function keydown(event){ // adds to change.x to change the movement of the player bar based on keyboard input
    if(event.key == "ArrowLeft"){
        event.preventDefault();
        player.change.x += -5;
    } else if(event.key == "ArrowRight"){
        event.preventDefault();
        player.change.x += 5;
    }
}

function createData_star(){
    var size = 15 + rand(40);
    return {
        x: rand(w),
        y: -50,
        w: size,
        h: size,
        c: colour[randi(colour.length)],
        a: 1,
        angle: rand(360),
        speed: fallSpeed + rand(1),
        change: {angle: randn(3), c: randn(0.3)}
    }
}

function counter(incrementValue, startValue){
    var count = startValue;
    return {
        increment: increment,
        getCurrentCount: getCurrentCount
    }
    function getCurrentCount(){
        return count;
    }
    function increment(){
        count += incrementValue;
    }
}

function updateProperties_rect(o){
    o.x += o.change.x;
    o.y += o.change.y;
    o.w += o.change.w;
    o.h += o.change.h;
    o.c += o.change.c;
    o.a += o.change.a;
}

function rect(o){
    ctx.beginPath();
    ctx.moveTo(o.x - o.w/2, o.y - o.h/2);
    ctx.lineTo(o.x + o.w/2, o.y - o.h/2);
    ctx.lineTo(o.x + o.w/2, o.y + o.h/2);
    ctx.lineTo(o.x - o.w/2, o.y + o.h/2);
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 60%, "+o.a+")";
    ctx.fill();
}

function starRotate(o){
    var oneDegree = 2*Math.PI/360;
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.rotate(o.angle*oneDegree);
    var x = 0 - o.w/2;
    var y = 0 - o.h/2;
    ctx.beginPath();
    ctx.moveTo(x + o.w * 0.5, y);
    ctx.lineTo(x + o.w * 0.6, y + o.h * 0.35);
    ctx.lineTo(x + o.w, y + o.h * 0.4);
    ctx.lineTo(x + o.w * 0.7, y + o.h * 0.65);
    ctx.lineTo(x + o.w * 0.8, y + o.h);
    ctx.lineTo(x + o.w * 0.5, y + o.h * 0.75);
    ctx.lineTo(x + o.w * 0.2, y + o.h);
    ctx.lineTo(x + o.w * 0.3, y + o.h * 0.65);
    ctx.lineTo(x, y + o.h * 0.4);
    ctx.lineTo(x + o.w * 0.4, y + o.h * 0.35);
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();
    ctx.restore();
}

function clear(){
    ctx.clearRect(0, 0, w, h);
}

function setUpCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid orange";
}

function rand(range){
    var result = Math.random()*range;
    return result;
}

function randi(range){
    var r = Math.floor(Math.random()*range);
    return r;
}

function randn(range){
    var r = Math.random()*range-range/2;
    return r;
}

console.log("assignment 4");
